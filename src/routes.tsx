import { createBrowserRouter } from "react-router-dom";
import FileDetails from "./components/FileDetails";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./Layout";
import CollectionDetails from "./pages/CollectionDetails";
import Collections from "./pages/Collections";
import Home from "./pages/Home";
import Login from "./pages/Login";

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
        path: "collections/:collectionId/files/:id",
        element: (
          <ProtectedRoute>
            <FileDetails />
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
