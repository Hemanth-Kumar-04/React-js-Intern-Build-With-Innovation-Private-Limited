import React from 'react';
import { Navigate, Route } from 'react-router-dom';

const PrivateRoute = ({ element, isAuthenticated, ...props }) => {
  if (!isAuthenticated) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" />;
  }

  // Render the component if authenticated
  return <Route element={element} {...props} />;
};

export default PrivateRoute;
