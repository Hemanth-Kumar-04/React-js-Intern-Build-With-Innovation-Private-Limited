// LoginForm.js
import React, { useState } from 'react';
import axios from 'axios';

const LoginForm = ({ setAuthToken }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        'https://dummyjson.com/auth',
        { username, password },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const authToken = response.data.token;
      setAuthToken(authToken);
    } catch (error) {
      console.error('Login failed', error);
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <div>
        <label>Username:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default LoginForm;
