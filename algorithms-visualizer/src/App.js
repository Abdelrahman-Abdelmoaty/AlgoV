import "./App.css";
import { Route, Routes, Link } from "react-router-dom";

const MockUp = () => {
  return <div className="text-4xl text-slate-300">Mock Up</div>;
};
function App() {
  return (
    <div className="App">
      <a href="/">
        <h1 className="font-bold text-5xl text-center my-12">App</h1>
      </a>
      <Link to="/graph/bfs">BFS</Link>
      <Routes>
        <Route path="/graph/bfs" element={<MockUp />} />
      </Routes>
    </div>
  );
}

export default App;
