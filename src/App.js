import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home';
import LoginForm from './components/LoginForm';

const App = () => {
  const [authToken, setAuthToken] = useState(null);

  const isAuthenticated = !!authToken;

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={<LoginForm setAuthToken={setAuthToken} />}
        />
        <Route
          path="/home"
          element={isAuthenticated ? <Home authToken={authToken} /> : <Navigate to="/login" />}
        />      
        <Route path="/*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};
    
export default App;
