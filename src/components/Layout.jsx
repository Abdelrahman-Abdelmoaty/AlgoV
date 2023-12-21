import "../styles/page.css";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

export default function Layout() {
  return (
    <div className="page">
      <Navbar />
      <Outlet />
    </div>
  );
}
