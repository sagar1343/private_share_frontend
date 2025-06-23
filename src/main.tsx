import Toast from "@/components/Toast";
import AuthProvider from "@/context/AuthContext.tsx";
import { ThemeProvider } from "@/context/ThemeContext.tsx";
import "@/global.css";
import router from "@/routes.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";

const client = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 5 * 60,
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={client}>
      <AuthProvider>
        <ThemeProvider defaultTheme="dark" storageKey="private_share_theme">
          <RouterProvider router={router} />
        </ThemeProvider>
      </AuthProvider>
      <Toast />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </StrictMode>
);
