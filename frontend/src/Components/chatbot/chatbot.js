import React, { useState } from 'react';
import { marked } from 'marked'; // Install with `npm install marked`

const ChatBot = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (input.trim() !== '') {
            const newMessage = { text: input, type: 'user' };
            setMessages([...messages, newMessage]);
            setInput('');

            try {
                const response = await fetch('http://127.0.0.1:5000/ask', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'text/markdown', // Indicate we expect Markdown
                    },
                    body: JSON.stringify({ question: input }),
                });

                const markdownData = await response.text(); // Get Markdown as plain text
                const botMessage = { text: markdownData, type: 'bot', isMarkdown: true };
                setMessages([...messages, newMessage, botMessage]);
            } catch (error) {
                const botMessage = { text: 'Error connecting to the server.', type: 'bot' };
                setMessages([...messages, newMessage, botMessage]);
            }
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.chatbox}>
            <div style={styles.messages}>
    {messages.map((msg, index) => (
        <div
            key={index}
            style={msg.type === 'user' ? styles.userMessage : styles.botMessage}
        >
            {msg.isMarkdown ? (
                <div dangerouslySetInnerHTML={{ __html: marked(msg.text) }} />
            ) : (
                msg.text
            )}
        </div>
    ))}
</div>

                <form onSubmit={handleSubmit} style={styles.form}>
                    <button type="button" style={styles.attachButton}>
                        <img src="https://img.icons8.com/ios/50/ffffff/attach.png" alt="attach" style={styles.attachIcon} />
                    </button>
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Type your message..."
                        style={styles.input}
                    />
                    <button type="submit" style={styles.sendButton}>
                        Send
                    </button>
                </form>
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        width: '100vw',
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: '#000',
    },
    chatbox: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        width: '100%',
        padding: '10px',
        boxSizing: 'border-box',
        justifyContent: 'center',
        alignItems: 'center',
    },
    messages: {
        flex: 1,
        overflowY: 'auto',
        width: '100%',
        padding: '10px',
        borderRadius: '8px',
        border: '1px solid #555',
        backgroundColor: '',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    userMessage: {
        backgroundColor: '#e63946',
        color: '#fff',
        padding: '8px',
        borderRadius: '6px',
        marginBottom: '8px',
        maxWidth: '70%',
        textAlign: 'center',
        wordBreak: 'break-word',
    },
    botMessage: {
        backgroundColor: '',
        color: '#fff',
        padding: '8px',
        borderRadius: '6px',
        marginBottom: '8px',
        maxWidth: '70%',
        textAlign: '',
        wordBreak: 'break-word',
    },
    form: {
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        borderTop: '1px solid #555',
        padding: '10px',
        boxSizing: 'border-box',
    },
    input: {
        flex: 1,
        padding: '8px',
        border: '1px solid #555',
        borderRadius: '4px',
        backgroundColor: '#333',
        color: '#fff',
        marginRight: '10px',
        fontSize: '14px',
        height: '40px',
    },
    attachButton: {
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        marginRight: '10px',
    },
    attachIcon: {
        width: '24px',
        height: '24px',
    },
    sendButton: {
        padding: '8px 15px',
        border: 'none',
        borderRadius: '4px',
        background: 'linear-gradient(135deg, #e63946 0%, #d62839 100%)',
        color: '#fff',
        fontSize: '14px',
        cursor: 'pointer',
        transition: 'background 0.3s ease, transform 0.2s ease',
        height: '40px',
    },
};

export default ChatBot;
