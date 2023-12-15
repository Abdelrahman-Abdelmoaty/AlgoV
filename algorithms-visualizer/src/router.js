import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home";
import BFS from "./components/Graph/BFS";
import DFS from "./components/Graph/DFS";

const router = createBrowserRouter([
  {
    path: "",
    element: <Home />,
  },
  {
    path: "/graph/bfs",
    element: <BFS />,
  },
  {
    path: "/graph/dfs",
    element: <DFS />,
  },
]);

export default function MyRouter() {
  return <RouterProvider router={router} />;
}
