import { useAuthContext } from "@/context/AuthContext";
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import Loader from "./Loader";

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const { loading, isAuthenticated } = useAuthContext();
  if (loading) return <Loader />;
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
}
