import api from "@/services/api";
import { CredentialResponse } from "@react-oauth/google";
import { AxiosError } from "axios";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { toast } from "sonner";

interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  profile_pic: string;
}

interface IAuthContext {
  loading: boolean;
  authenticatedUser: User | null;
  isAuthenticated: boolean;
  login: (credentialResponse: CredentialResponse) => Promise<void>;
  logout: () => void;
}

const authContext = createContext<IAuthContext | null>(null);

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setAuthenticated] = useState<boolean>(false);
  const [authenticatedUser, setAuthenticatedUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  const login = async (credentialResponse: CredentialResponse) => {
    try {
      const response = await api.post("/auth/google-login/", {
        token: credentialResponse.credential,
      });

      localStorage.setItem("tokens", JSON.stringify(response.data));

      await fetchUser();
      toast.success("Login Successfull");
    } catch (error: any) {
      if (error instanceof AxiosError) {
        toast.error(
          `Login failed: ${error.response?.data?.message ?? "Server Error"}`
        );
      }
    }
  };

  const fetchUser = async () => {
    try {
      setLoading(true);
      const userResponse = await api.get("/auth/me");
      setAuthenticatedUser(userResponse.data);
      setAuthenticated(true);
    } catch (error) {
      console.error("Failed to fetch user:", error);
      logout();
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("tokens");
    setAuthenticated(false);
    setAuthenticatedUser(null);
    toast.success("Logout Successfull");
  };

  useEffect(() => {
    const token = localStorage.getItem("tokens");
    if (token) {
      fetchUser();
    }
  }, []);

  return (
    <authContext.Provider
      value={{ loading, authenticatedUser, isAuthenticated, login, logout }}
    >
      {children}
    </authContext.Provider>
  );
}

export const useAuthContext = () => {
  const context = useContext(authContext);
  if (!context) {
    throw new Error("Auth context not defined");
  }
  return context;
};
