import FileDetails from "@/components/FileDetails";
import ProtectedRoute from "@/components/ProtectedRoute";
import Layout from "@/Layout";
import AccessLogs from "@/pages/AccessLogs";
import CollectionDetails from "@/pages/CollectionDetails";
import Collections from "@/pages/Collections";
import Dashboard from "@/pages/Dashboard";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import NotFound from "@/pages/NotFound";
import Notifications from "@/pages/Notifications";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import Settings from "@/pages/Settings";
import SharedFiles from "@/pages/SharedFiles";
import Starred from "@/pages/Starred";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/settings",
        element: <Settings />,
      },
      {
        path: "dashboard",
        children: [
          {
            index: true,
            path: "overview",
            element: (
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            ),
          },
          {
            path: "collections",
            element: (
              <ProtectedRoute>
                <Collections />
              </ProtectedRoute>
            ),
          },
          {
            path: "collections/:id",
            element: (
              <ProtectedRoute>
                <CollectionDetails />
              </ProtectedRoute>
            ),
          },
          {
            path: "collections/:collectionId/files/:id",
            element: (
              <ProtectedRoute>
                <FileDetails />
              </ProtectedRoute>
            ),
          },
          {
            path: "collections/:collectionId/files/:id/logs",
            element: (
              <ProtectedRoute>
                <AccessLogs />
              </ProtectedRoute>
            ),
          },
          {
            path: "shared-files",
            element: (
              <ProtectedRoute>
                <SharedFiles />
              </ProtectedRoute>
            ),
          },
          {
            path: "notifications",
            element: (
              <ProtectedRoute>
                <Notifications />
              </ProtectedRoute>
            ),
          },
          {
            path: "starred",
            element: (
              <ProtectedRoute>
                <Starred />
              </ProtectedRoute>
            ),
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/privacy-policy",
    element: <PrivacyPolicy />,
  },

  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
