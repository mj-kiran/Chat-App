import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

// ============================== PROTECTION ==============================

// Redirects to login page when trying to access child routes without logging in first
const Protection = ({ children }) => {
  // Correct the selector function by returning the value
  const token = useSelector((state) => state?.auth?.token);
  React.useEffect(() => {
    if (token) {
      localStorage.setItem("tokenData", JSON.stringify(token));
    }
  }, [token]);

  if (token) {
    return children;
  } else {
    return <Navigate to="/login" replace />;
  }
};

export default Protection;
