import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './LoginForm.css';

const LoginForm = ({ setAuthToken }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const response = await fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      if (!response.ok) {
        // Handle authentication failure, set error message
        setError("Invalid credentials. Please try again.");
        return;
      }

      const data = await response.json();
      // Assuming the authentication server returns a token
      const authToken = data.token;

      // Store the authentication token in your app's state
      setAuthToken(authToken);
      // Navigate to home screen after successful login
      navigate("/home");
    } catch (error) {
      console.error("Error during login:", error);
      // Handle other errors as needed
    }
  };

  return (
    <div className="login-box">
      <div className="login-content">
        <div className="userName">
          {error && <p>{error}</p>}
          <label className="label">Username:</label>
          <input
           className="input"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <label className="label">Password:</label>
        <input
          className="input"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin} className="button">
          Login
        </button>
      </div>
    </div>
  );
};

export default LoginForm;
