import api from "@/services/api";
import { CredentialResponse } from "@react-oauth/google";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createContext, ReactNode, useContext } from "react";
import { toast } from "sonner";

interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  profile_pic: string;
}

interface IAuthContext {
  isPending: boolean;
  isLoading: boolean;
  isAuthenticated: boolean;
  authenticatedUser?: User;
  login: (credentialResponse: CredentialResponse) => void;
  logout: () => void;
}

const authContext = createContext<IAuthContext | null>(null);

export default function AuthProvider({ children }: { children: ReactNode }) {
  const queryClient = useQueryClient();

  const {
    data: authenticatedUser,
    isLoading,
    isPending,
  } = useQuery({
    queryKey: ["authUser"],
    queryFn: fetchUser,
    enabled: !!localStorage.getItem("tokens"),
    retry: false,
  });

  const { mutate: login } = useMutation({
    mutationKey: ["login"],
    mutationFn: async (credentialResponse: CredentialResponse) => {
      const response = await api.post("/auth/google-login/", {
        token: credentialResponse.credential,
      });
      localStorage.setItem("tokens", JSON.stringify(response.data));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      toast.success("Logged in!");
    },
    onError: () => toast.error("Login failed"),
  });

  function logout() {
    localStorage.removeItem("tokens");
    queryClient.setQueryData(["authUser"], null);
    toast.success("Logout Successful");
  }

  async function fetchUser() {
    const response = await api.get<User>("/auth/me");
    return response.data;
  }

  return (
    <authContext.Provider
      value={{
        isPending,
        isLoading,
        isAuthenticated: !!authenticatedUser,
        authenticatedUser,
        login,
        logout,
      }}
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
