import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthService } from "../services/authService";

const PrivateRoute: React.FC = () => {
  return AuthService.isAuthenticated() ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
