import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { Toaster } from "sonner";
import store from "./app/store.ts";
import AuthProvider from "./context/AuthContext.tsx";
import { ThemeProvider } from "./context/ThemeContext.tsx";
import "./global.css";
import router from "./routes.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <AuthProvider>
        <ThemeProvider defaultTheme="dark" storageKey="private_share_theme">
          <RouterProvider router={router} />
        </ThemeProvider>
      </AuthProvider>
    </Provider>
    <Toaster richColors />
  </StrictMode>
);
