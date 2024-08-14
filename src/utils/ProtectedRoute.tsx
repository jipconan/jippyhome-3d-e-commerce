import React from "react";
import { Navigate } from "react-router-dom";
import { ProtectedRouteProps } from "../types/propsTypes";

// ProtectedRoute component that handles user authentication
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  isUserLoggedIn,
  redirectTo,
  children,
}) => {
  // If the user is not logged in, redirect to the specified URL
  if (!isUserLoggedIn) {
    return <Navigate to={redirectTo} />;
  }

  // If the user is logged in, render the children components
  return <>{children}</>;
};

export default ProtectedRoute;
