import { AuthContext } from "../context/AuthContext";
import { Outlet, Navigate } from "react-router-dom";
import { useContext } from "react";

export default function GuestRoute() {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("ProtectedRoute must be used within AuthContextProvider");
  }

  const { userToken } = authContext;

  return userToken ? <Navigate to="/" replace /> : <Outlet />;
}
