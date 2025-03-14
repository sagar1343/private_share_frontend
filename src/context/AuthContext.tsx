import api from "@/services/api";
import { CredentialResponse } from "@react-oauth/google";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  profile_pic: string;
}

interface IAuthContext {
  authenticatedUser: User | null;
  isAuthenticated: boolean;
  login: (credentialResponse: CredentialResponse) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<IAuthContext | null>(null);

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setAuthenticated] = useState<boolean>(false);
  const [authenticatedUser, setAuthenticatedUser] = useState<User | null>(null);

  const login = async (credentialResponse: CredentialResponse) => {
    try {
      const response = await api.post("/auth/google-login/", {
        token: credentialResponse.credential,
      });

      localStorage.setItem("tokens", JSON.stringify(response.data));

      fetchUser();
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const fetchUser = async () => {
    try {
      const userResponse = await api.get("/auth/me");
      setAuthenticatedUser(userResponse.data);
      setAuthenticated(true);
    } catch (error) {
      console.error("Failed to fetch user:", error);
      logout();
    }
  };

  const logout = () => {
    localStorage.removeItem("tokens");
    setAuthenticated(false);
    setAuthenticatedUser(null);
  };

  useEffect(() => {
    const token = localStorage.getItem("tokens");
    if (token) {
      fetchUser();
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ authenticatedUser, isAuthenticated, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("Auth context not defined");
  }
  return authContext;
};
