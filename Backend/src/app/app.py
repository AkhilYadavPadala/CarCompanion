from flask import Flask, request, jsonify
from flask_cors import CORS
from langchain_chroma import Chroma
from langchain_community.embeddings import GPT4AllEmbeddings
from langchain.retrievers.multi_vector import MultiVectorRetriever
from langchain.schema.output_parser import StrOutputParser
from base64 import b64decode
import pickle
from langchain.storage import InMemoryStore
from langchain_openai import ChatOpenAI
from langchain.schema import HumanMessage
from langchain.schema.runnable import RunnablePassthrough, RunnableLambda

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Enable Cross-Origin Resource Sharing for the frontend

# Path to persist directory and docstore
persist_directory = "C:/Users/Akhil/OneDrive/Desktop/CarCompanion/Backend/src/app"

# Initialize vectorstore and docstore
vectorstore = Chroma(
    collection_name="multi_modal_rag",
    embedding_function=GPT4AllEmbeddings(),
    persist_directory=persist_directory
)

with open("docstore.pkl", "rb") as f:
    docstore_data = pickle.load(f)

# Initialize InMemoryStore
store = InMemoryStore()
store.mset(docstore_data.items())

# Setup retriever
retriever = MultiVectorRetriever(
    vectorstore=vectorstore,
    docstore=store,
    id_key="doc_id",
)

# Helper function to split text and images
def split_image_text_types(docs):
    b64 = []
    text = []
    for doc in docs:
        try:
            b64decode(doc)
            b64.append(doc)
        except Exception as e:
            text.append(doc)
    return {
        "images": b64,
        "texts": text
    }

# Helper function to create a prompt
def prompt_func(dict):
    # Format the text content
    format_texts = "\n".join(dict["context"]["texts"])

    # Create the prompt based on the available context
    message_content = [
        {"type": "text", "text": f"""You are an expert in answring the questions about the car manuals,Answer the question based only on the following context, which can include text, tables, and possibly an image:
Question: {dict["question"]}

Text and tables:
{format_texts}
"""}
    ]

    # Add the image if it's available
    if dict["context"]["images"]:
        image_data = dict["context"]["images"][0]  # Assuming you only use the first image
        message_content.append(
            {"type": "image_url", "image_url": {"url": f"data:image/jpeg;base64,{image_data}"}}
        )

    # Return the formatted HumanMessage
    return [HumanMessage(content=message_content)]



# Initialize the model
model = ChatOpenAI(
    base_url="https://api.groq.com/openai/v1",
    api_key="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",
    model="llama-3.2-90b-vision-preview",
)

# RAG chain setup
chain = (
    {"context": retriever | RunnableLambda(split_image_text_types), "question": RunnablePassthrough()}
    | RunnableLambda(prompt_func)
    | model
    | StrOutputParser()
)

@app.route('/ask', methods=['POST'])
def ask_question():
    data = request.json
    question = data.get("question")
    print("Received question:", data.get("question"))
    
    if not question:
        return "No question provided", 400, {"Content-Type": "text/markdown"}
    
    try:
        # Retrieve the relevant context
        retrieved_context = retriever.get_relevant_documents(question)
        print(f"Retrieved context size: {len(retrieved_context)}")
        
        # Query the RAG pipeline
        answer = chain.invoke(question)
        
        # Format the answer in Markdown
        markdown_response = f"\n\n{answer}\n\n"
        
        # Return as Markdown with the appropriate content type
        return markdown_response, 200, {"Content-Type": "text/markdown"}
    except Exception as e:
        error_message = f"# Error\n\nAn error occurred: `{str(e)}`\n"
        return error_message, 500, {"Content-Type": "text/markdown"}


if __name__ == "__main__":
    app.run(debug=True)
