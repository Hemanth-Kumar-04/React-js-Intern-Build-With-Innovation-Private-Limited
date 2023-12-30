// PrivateRoute.js
import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import Home from './Home'; // Import your Home component

const PrivateRoute = ({ authToken }) => {
  // Add your authentication logic here

  return authToken ? (
    // Return the Home component if authenticated
    <Route element={<Home authToken={authToken} />} />
  ) : (
    // Redirect to login if not authenticated, preserving the initial route
    <Navigate to="/login" state={{ from: '/home' }} />
  );
};

export default PrivateRoute;
