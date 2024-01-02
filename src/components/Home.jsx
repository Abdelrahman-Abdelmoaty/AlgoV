import "../styles/home.css";
import graphImg from "../assets/data-flow.png";
import sortingImg from "../assets/backlog.png";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div
      className="home-page flex flex-col items-center py-[50px] gap-[50px]"
      style={{ fontFamily: "Inknut Antiqua" }}
    >
      <h2 className="slogan text-[rgb(5,131,83)] text-[64px]">
        ALGORITHMS IN ACTION
      </h2>
      <div className="w-full algorithms flex justify-evenly">
        <Link to="/graph/bfs" className="flex flex-col items-center gap-5">
          <img src={graphImg} alt="graph" className="algorithm w-[120px]" />
          <span>Graph Algorithms</span>
        </Link>
        <Link
          to="/sorting/bubble-sort"
          className="flex flex-col items-center gap-5"
        >
          <img src={sortingImg} alt="graph" className="algorithm w-[120px]" />
          <span>Sorting Algorithms</span>
        </Link>
      </div>
      <p className="statement border-2 border-[rgb(5,131,83)] p-[20px] text-[rgb(5,131,83)] text-[32px] w-[1000px] text-center">
        Experience algorithms in action with vibrant visualizations for easy
        learning
      </p>
    </div>
  );
}
