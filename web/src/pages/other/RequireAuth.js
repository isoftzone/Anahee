import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const RequireAuth = ({ children }) => {
  const location = useLocation();
  console.log("this is location", location);
  const customer = JSON.parse(localStorage.getItem("customerinfo"));
  if (!customer) {
    // Store the intended page to localStorage
    localStorage.setItem("redirectAfterLogin", location.pathname);
    // return <Navigate to="/login-register" replace />;
  }
//   if (!customer) {
//     // Not logged in, redirect to login with current location
//     return <Navigate to="/login-register" state={{ from: location }} replace />;
//   }

  return children;
};

export default RequireAuth;
