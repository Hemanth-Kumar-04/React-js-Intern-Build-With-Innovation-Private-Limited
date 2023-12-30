import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

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
    <div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <label>Username:</label>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <label>Password:</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default LoginForm;
