import React from "react";
import { Navigate, useLocation } from "react-router-dom";

function PrivateRoute({ children }) {
  const isAuthenticated = localStorage.getItem("token");

  if (isAuthenticated) {
    return children;
  }

  return <Navigate to="/login" />;
}

export default PrivateRoute;
