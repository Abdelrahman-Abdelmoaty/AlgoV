import "../styles/navbar.css";
import { Link, useLocation, useRoutes } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
export default function Navbar() {
  const [showNav, setShowNav] = useState(false);
  const location = useLocation();
  return (
    <header className="navbar-component">
      <Link href="/">
        <h1 className="title">
          Algo
          <span className="text-[#ffd701]">V</span>
        </h1>
      </Link>
      <div className="burger" onClick={() => setShowNav((prev) => !prev)}>
        <div> </div>
        <div> </div>
        <div> </div>
      </div>
      <nav
        className={"main-nav " + (showNav ? "show" : "")}
        onClick={() => setShowNav(false)}
      >
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
            <ul className="graph-list sub-menu">
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
            <ul className="sorting-list sub-menu">
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
                    location.pathname === "/sorting/selection" && "active"
                  }`}
                  to="/sorting/selection-sort"
                >
                  Selection Sort
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
