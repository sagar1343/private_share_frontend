import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import AuthProvider from "./context/AuthContext.tsx";
import { ThemeProvider } from "./context/ThemeContext.tsx";
import "./global.css";
import router from "./routes.tsx";
import CollectionsProvider from "./context/CollectionsContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <CollectionsProvider>
        <ThemeProvider defaultTheme="dark" storageKey="private_share_theme">
          <RouterProvider router={router} />
        </ThemeProvider>
      </CollectionsProvider>
    </AuthProvider>
  </StrictMode>
);
