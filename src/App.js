import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import LoginForm from './components/LoginForm';

const App = () => {
  const [authToken, setAuthToken] = useState(null);

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={<LoginForm setAuthToken={setAuthToken} />}
        />
        <Route
          path="/home"
          element={<Home authToken={authToken} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
