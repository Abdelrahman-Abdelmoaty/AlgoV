// import "rsuite/dist/styles/rsuite-default.css";
import Graph from "./Graph";
import { useEffect, useState } from "react";
import Controls from "./Controls";

export default function DFS() {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [adjMat, setAdjMat] = useState([]);

  // const [neighborIdx, setNeighborIdx] = useState(null);
  // const [nodeIdx, setNodeIdx] = useState([]);
  const [visited, setVisited] = useState(new Set());
  const [start, setStart] = useState(null);
  const [stack, setStack] = useState([]);

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

  // Creating the Adjacency Matrix
  useEffect(() => {
    const newAdjMat = [];
    nodes.forEach((node) => {
      const row = [];
      for (let j = 0; j < nodes.length; j++) row.push(0);
      newAdjMat.push(row);
    });

    edges.forEach((edge) => {
      const idx1 = nodes.findIndex((n) => n.id === edge.src);
      const idx2 = nodes.findIndex((n) => n.id === edge.dest);

      // TODO: check if not directed
      newAdjMat[idx1][idx2] = 1;
      newAdjMat[idx2][idx1] = 1;
    });

    setAdjMat(newAdjMat);
  }, [edges, nodes]);

  return (
    <div class="dfs-component">
      <h2>Depth First Search Visualization</h2>
      <main>
        <Controls
          start={() => {
            initDfs();
          }}
          startV={nodes[start]?.value}
          setStart={(val) => setStart(nodes.findIndex((n) => n.value === val))}
          next={() => {
            dfs();
          }}
          back={() => {}}
        />
        <Graph
          nodes={nodes}
          setNodes={setNodes}
          edges={edges}
          setEdges={setEdges}
        />
      </main>
    </div>
  );
}
