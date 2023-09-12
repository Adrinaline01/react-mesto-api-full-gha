import React from 'react';
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ loggedIn, children  }) => {
  return (
    !loggedIn ? <Navigate to="/sign-in" replace /> : children
)}

export default ProtectedRoute;
