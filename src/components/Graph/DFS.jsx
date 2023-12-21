// import "rsuite/dist/styles/rsuite-default.css";
import { useState, useEffect } from "react";
import GraphAlgorithm from "./GraphAlgorithm";

export default function DFS() {
  const [directed, setDirected] = useState(false);
  const [nodes, setNodes] = useState([]);
  const [adjMat, setAdjMat] = useState([]);
  const [start, setStart] = useState(null);
  const [stack, setStack] = useState([]);
  const [lastVertex, setLastVertex] = useState(null);

  // const [neighborIdx, setNeighborIdx] = useState(null);
  // const [nodeIdx, setNodeIdx] = useState([]);
  const [visited, setVisited] = useState(new Set());

  const defaultBorderColor = "black";
  const neighborBorderColor = "#08ff00";
  const currentBorderColor = "red";
  const visitedColor = "rgb(44, 202, 227)";

  useEffect(() => {
    if (stack.length > 0 && stack[0] === start) dfs();
  }, [stack]);

  const visit = (idx, nodes) => {
    visited.add(idx);
    nodes[idx].color = visitedColor;
  };

  const initDfs = () => {
    setVisited(new Set());
    setStack([start]);
  };

  const dfs = () => {
    console.log(stack.length);
    const newNodes = [...nodes];
    if (lastVertex !== null) {
      newNodes[lastVertex].borderColor = defaultBorderColor;
      for (let i = 0; i < nodes.length; i++) {
        if (adjMat[lastVertex][i] === 1) {
          newNodes[i].borderColor = defaultBorderColor;
        }
      }
    }
    if (stack.length > 0) {
      const newStack = [...stack];
      const currentVertex = newStack.pop();
      setLastVertex(currentVertex);

      if (!visited.has(currentVertex)) {
        visit(currentVertex, newNodes);
        newNodes[currentVertex].borderColor = currentBorderColor;

        for (let i = 0; i < nodes.length; i++) {
          if (adjMat[currentVertex][i] === 1 && !visited.has(i)) {
            newNodes[i].borderColor = neighborBorderColor;
            newStack.push(i);
          }
        }
      }
      setStack(newStack);
    } else {
    }
    setNodes(newNodes);
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
        keys={[
          {
            backgroundColor: visitedColor,
            label: "Visited",
          },
          {
            borderColor: currentBorderColor,
            label: "Current Vertex",
          },
          {
            borderColor: neighborBorderColor,
            label: "Neighbors",
          },
        ]}
      />
    </div>
  );
}
