// import "rsuite/dist/styles/rsuite-default.css";
import { useState } from "react";
import GraphAlgorithm from "./GraphAlgorithm";

export default function DFS() {
  const [nodes, setNodes] = useState([]);
  const [adjMat, setAdjMat] = useState([]);
  const [start, setStart] = useState(null);
  const [stack, setStack] = useState([]);

  // const [neighborIdx, setNeighborIdx] = useState(null);
  // const [nodeIdx, setNodeIdx] = useState([]);
  const [visited, setVisited] = useState(new Set());

  const visit = (idx) => {
    visited.add(idx);
    const newNodes = [...nodes];
    newNodes[idx] = { ...newNodes[idx], color: "grey" };
    setNodes(newNodes);
  };

  const initDfs = () => {
    setStack([start]);
    setVisited(new Set());
    dfs();
  };

  const dfs = () => {
    if (stack.length > 0) {
      const newStack = [...stack];
      const currentVertex = newStack.pop();

      if (!visited.has(currentVertex)) {
        visit(currentVertex);

        for (let i = 0; i < nodes.length; i++) {
          if (adjMat[currentVertex][i] === 1 && !visited.has(i)) {
            newStack.push(i);
          }
        }
      }
      setStack(newStack);
    } else {
    }
  };

  return (
    <div class="dfs-component">
      <h2>Depth First Search Visualization</h2>
      <GraphAlgorithm
        back={() => {}}
        start={() => {
          initDfs();
        }}
        next={() => {
          dfs();
        }}
        setAdjMat={setAdjMat}
        setStartIdx={setStart}
        startIdx={start}
        nodes={nodes}
        setNodes={setNodes}
      />
    </div>
  );
}
