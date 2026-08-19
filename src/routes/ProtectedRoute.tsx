import { AuthContext } from "../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";

export default function ProtectedRoute() {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("ProtectedRoute must be used within AuthContextProvider");
  }

  const { userToken } = authContext;

  return userToken ? <Outlet /> : <Navigate to="/login" replace />;
}
