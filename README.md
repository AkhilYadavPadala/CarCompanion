# Project Setup Guide

## Prerequisites
- Node.js and npm installed
- Python installed
- Virtual environment module for Python
- Groq API Key
- Mongodb,Express,React installed

## Steps to Run the Project Locally

### 1. Setup and Start Frontend
```sh
cd frontend
npm i
npm start
```

### 2. Setup and Start Backend
Open a new terminal:
```sh
cd backend
npm i
cd src
node server.js
```

### 3. Setup Python Backend
Open another terminal:
```sh
cd backend
python -m venv myvenv
myvenv\Scripts\activate
pip install -r requirements.txt
cd src
cd app
python app.py
```

### 4. Groq API Key
Ensure you place your own **Groq API Key** in the necessary configuration files before running the project.


### 1. Landing Page
![Landing Page](screenshots/landingpage.png)

### 2. Sign-in Page
![Sign-in Page](screenshots/signin.png)

### 3. Chatbot Page
![Chatbot Page](screenshots/chatbot.png)