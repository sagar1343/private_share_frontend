import store from "@/app/store.ts";
import AuthProvider from "@/context/AuthContext.tsx";
import { ThemeProvider } from "@/context/ThemeContext.tsx";
import "@/global.css";
import router from "@/routes.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { Toaster } from "sonner";

const client = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={client}>
      <Provider store={store}>
        <AuthProvider>
          <ThemeProvider defaultTheme="dark" storageKey="private_share_theme">
            <RouterProvider router={router} />
          </ThemeProvider>
        </AuthProvider>
      </Provider>
      <Toaster richColors />
    </QueryClientProvider>
  </StrictMode>
);
