import { Link, useLocation, useRoutes } from "react-router-dom";
import { motion } from "framer-motion";
export default function Navbar() {
  const location = useLocation();
  return (
    <header>
      <h1 className="title">AlgoV</h1>
      <nav>
        <ul>
          <li>
            <Link className={`${location.pathname === "/" && "active"}`} to="/">
              Home
            </Link>
          </li>
          <li>
            <Link className={`${location.pathname === "/graph/BFS" && "active"}`} to="/graph/BFS">
              BFS
            </Link>
          </li>
          <li>
            <Link className={`${location.pathname === "/graph/DFS" && "active"}`} to="/graph/DFS">
              DFS
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
