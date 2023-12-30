import { Link, useLocation, useRoutes } from "react-router-dom";
import { motion } from "framer-motion";
export default function Navbar() {
  const location = useLocation();
  return (
    <header>
      <Link href="/">
        <h1 className="title">
          Algo<span className="text-[#ffd701]">V</span>
        </h1>
      </Link>
      <nav>
        <ul>
          <li>
            <Link className={`${location.pathname === "/" && "active"}`} to="/">
              Home
            </Link>
          </li>
          <li>
            <button
              className={`${
                location.pathname.includes("/graph/") && "active"
              } graph`}
            >
              Graph
            </button>
            <ul className="graph-list">
              <li>
                <Link
                  className={`${
                    location.pathname === "/graph/BFS" && "active"
                  }`}
                  to="/graph/BFS"
                >
                  BFS
                </Link>
              </li>
              <li>
                <Link
                  className={`${
                    location.pathname === "/graph/DFS" && "active"
                  }`}
                  to="/graph/DFS"
                >
                  DFS
                </Link>
              </li>
            </ul>
          </li>
          <li>
            <button
              className={`${
                location.pathname.includes("/sorting/") && "active"
              } sorting`}
            >
              Sorting
            </button>
            <ul className="sorting-list">
              <li>
                <Link
                  className={`${
                    location.pathname === "/sorting/bubble-sort" && "active"
                  }`}
                  to="/sorting/bubble-sort"
                >
                  Bubble Sort
                </Link>
              </li>
              <li>
                <Link
                  className={`${
                    location.pathname === "/sorting/insertion-sort" && "active"
                  }`}
                  to="/sorting/insertion-sort"
                >
                  Insertion Sort
                </Link>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </header>
  );
}
