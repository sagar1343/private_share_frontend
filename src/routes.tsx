import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import Collections from "./pages/Collections";
import Home from "./pages/Home";

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
        element: <Collections />,
      },
    ],
  },
]);

export default router;
