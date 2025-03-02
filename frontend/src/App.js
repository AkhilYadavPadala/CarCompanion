import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignIn from './Components/signin/sign';
import SignUp from './Components/Signup/Signup';
import LandingPage from './Components/Landingpage/LandingPage';
import ChatBot from './Components/chatbot/chatbot';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/chatbot" element={<ChatBot/>} />
      </Routes>
    </Router>
  );
};

export default App;
