import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home";
import BFS from "./components/Graph/BFS";
import DFS from "./components/Graph/DFS";
import Layout from "./components/Layout";
import InsertionSort from "./components/Sorting/InsertionSort";

const router = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      {
        path: "graph",
        children: [
          { path: "bfs", element: <BFS /> },
          {
            path: "dfs",
            element: <DFS />,
          },
        ],
      },
      {
        path: "sorting",
        children: [{ path: "insertion", element: <InsertionSort /> }],
      },
    ],
  },
]);

export default function MyRouter() {
  return <RouterProvider router={router} />;
}
