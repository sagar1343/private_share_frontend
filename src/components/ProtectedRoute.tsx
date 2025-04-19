import Loader from "@/components/Loader";
import { useAuthContext } from "@/context/AuthContext";
import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router";

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const { isPending, isLoading, isAuthenticated, authenticatedUser } =
    useAuthContext();

  useEffect(() => {
    if (isPending && !isLoading && !isAuthenticated) navigate("/login");
  }, [authenticatedUser, isLoading]);

  return <>{isLoading ? <Loader /> : children}</>;
}
