import FileDetails from "@/components/FileDetails";
import ProtectedRoute from "@/components/ProtectedRoute";
import Layout from "@/Layout";
import AccessLogs from "@/pages/AccessLogs";
import CollectionDetails from "@/pages/CollectionDetails";
import Collections from "@/pages/Collections";
import FileCreate from "@/pages/FileCreate";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import NotFound from "@/pages/NotFound";
import Notifications from "@/pages/Notifications";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import ReceivedFiles from "@/pages/ReceivedFiles";
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
        path: "/collections/:collectionId/files",
        element: (
          <ProtectedRoute>
            <FileCreate />
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
        path: "share",
        element: (
          <ProtectedRoute>
            <ReceivedFiles />
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
