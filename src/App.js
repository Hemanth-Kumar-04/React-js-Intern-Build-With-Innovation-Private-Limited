// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import LoginForm from './components/LoginForm';
import PrivateRoute from './components/PrivateRoute';

const App = () => {
  const [authToken, setAuthToken] = useState(null);

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={<LoginForm setAuthToken={setAuthToken} />}
        />
        {/* Use PrivateRoute within a Route inside Routes */}
        <Route
          path="/home"
          element={<PrivateRoute authToken={authToken} />}
        />
        {/* Other routes */}
        <Route path="/" element={<Home authToken={authToken} />} />
      </Routes>
    </Router>
  );
};

export default App;
