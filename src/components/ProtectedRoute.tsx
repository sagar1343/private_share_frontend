import { useAuthContext } from "@/context/AuthContext";
import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const { loading, isAuthenticated } = useAuthContext();
  if (loading) return <Loader />;
  if (!isAuthenticated) navigate("/login");
  return <>{children}</>;
}
