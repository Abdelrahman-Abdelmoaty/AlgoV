import Graph from "./Graph";
import { useState } from "react";
export default function DFS() {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  return (
    <div>
      <Graph nodes={nodes} setNodes={setNodes} edges={edges} setEdges={setEdges} />
    </div>
  );
}
