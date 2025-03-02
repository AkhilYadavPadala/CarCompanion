import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [gmail, setGmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const res = await axios.post('http://localhost:9000/signup', { Gmail: gmail, password });
      if (res.data.message) {
        // alert(res.data.message);
        navigate('/signin');
      } else {
        alert(res.data.error);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={styles.container}>
      <form style={styles.form} onSubmit={handleSignUp}>
        <h2 style={styles.heading}>Sign Up</h2>
        <input
          type="email"
          placeholder="Gmail"
          value={gmail}
          onChange={(e) => setGmail(e.target.value)}
          style={styles.input}
          required
        />
        <input
          type="password"
          placeholder="Create Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          style={styles.input}
          required
        />
        <button type="submit" style={styles.button}>
          Sign Up
        </button>
        <p style={styles.text}>
          Already have an account? <Link to="/signin" style={styles.link}>Sign In</Link>
        </p>
      </form>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#000',
  },
  form: {
    backgroundColor: '#333',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)',
    width: '300px',
    textAlign: 'center',
  },
  heading: {
    color: '#fff',
  },
  input: {
    width: '100%',
    padding: '10px',
    margin: '10px 0',
    border: '1px solid #555',
    borderRadius: '4px',
    backgroundColor: '#444',
    color: '#fff',
  },
  button: {
    width: '100%',
    padding: '10px',
    border: 'none',
    borderRadius: '4px',
    background: 'linear-gradient(135deg, #e63946 0%, #d62839 100%)',
    color: '#fff',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease, background 0.3s ease',
  },
  text: {
    color: '#fff',
    marginTop: '10px',
  },
  link: {
    color: '#007bff',
    textDecoration: 'none',
  },
};

export default SignUp;
