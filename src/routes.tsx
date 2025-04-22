import { createBrowserRouter } from "react-router-dom";
import FileDetails from "./components/FileDetails";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./Layout";
import CollectionDetails from "./pages/CollectionDetails";
import Collections from "./pages/Collections";
import FileCreate from "./pages/FileCreate";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ReceivedFiles from "./pages/ReceivedFiles";
import AccessLogs from "./pages/AccessLogs";

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
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

export default router;
