import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home";
import BFS from "./components/Graph/BFS";
import DFS from "./components/Graph/DFS";
import Layout from "./components/Layout";

const router = createBrowserRouter([
  {
    path: "",
    element: (
      <Layout>
        <Home />
      </Layout>
    ),
  },
  {
    path: "/graph/bfs",
    element: (
      <Layout>
        <BFS />
      </Layout>
    ),
  },
  {
    path: "/graph/dfs",
    element: (
      <Layout>
        <DFS />
      </Layout>
    ),
  },
]);

export default function MyRouter() {
  return <RouterProvider router={router} />;
}
