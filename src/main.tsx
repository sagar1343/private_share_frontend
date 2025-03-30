import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import AuthProvider from "./context/AuthContext.tsx";
import { ThemeProvider } from "./context/ThemeContext.tsx";
import "./global.css";
import router from "./routes.tsx";
import { Provider } from "react-redux";
import Store from "./app/store.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={Store}>
      <AuthProvider>
        <ThemeProvider defaultTheme="dark" storageKey="private_share_theme">
          <RouterProvider router={router} />
        </ThemeProvider>
      </AuthProvider>
    </Provider>
  </StrictMode>
);
