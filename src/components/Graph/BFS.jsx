import { Queue } from "../../lib/utils";
import { useState, useEffect } from "react";
import GraphAlgorithm from "./GraphAlgorithm";

export default function BFS() {
  const [nodes, setNodes] = useState([]);
  const [adjMat, setAdjMat] = useState([]);
  const [start, setStart] = useState(null);
  const [queue, setQueue] = useState(new Queue());
  const [lastVertex, setLastVertex] = useState(null);
  const [visited, setVisited] = useState(new Set());

  const defaultBorderColor = "black";
  const neighborBorderColor = "#08ff00";
  const currentBorderColor = "red";
  const initialColor = [0, 150, 170];
  const gradientStep = 35;

  useEffect(() => {
    if (!queue.isEmpty()) bfs();
  }, [queue]);

  const calculateGradientColor = (levelWithinSameLevel) => {
    const newColor = initialColor.map((value) => Math.min(255, value + (levelWithinSameLevel % 7) * gradientStep));
    return `rgb(${newColor.join(",")})`;
  };

  const visit = (idx, nodes, level) => {
    visited.add(idx);
    nodes[idx].color = calculateGradientColor(level);
  };

  const initBfs = () => {
    let newQueue = new Queue();
    newQueue.enqueue({ vertex: start, level: 0 });
    setQueue(newQueue);
    setVisited(new Set());
  };

  const bfs = () => {
    const newNodes = [...nodes];
    if (!queue.isEmpty()) {
      const { vertex: currentVertex, level } = queue.peek();
      if (!visited.has(currentVertex)) {
        visit(currentVertex, newNodes, level);
      }
      if (lastVertex !== null) {
        newNodes[lastVertex].borderColor = defaultBorderColor;
        for (let i = 0; i < nodes.length; i++) {
          if (adjMat[lastVertex][i] === 1 && !visited.has(i)) {
            newNodes[i].borderColor = defaultBorderColor;
          }
        }
      }
      for (let i = 0; i < nodes.length; i++) {
        if (adjMat[currentVertex][i] === 1 && !visited.has(i)) {
          if (!visited.has(i)) {
            newNodes[i].borderColor = neighborBorderColor;
          }
          queue.enqueue({ vertex: i, level: level + 1 });
        }
      }
      if (lastVertex !== null)
        newNodes[lastVertex].borderColor = defaultBorderColor;
      newNodes[currentVertex].borderColor = currentBorderColor;
      setLastVertex(currentVertex);
      queue.dequeue();
      setNodes(newNodes);
    }
  };
  return (
    <div className="dfs-component">
      <h2>Breadth First Search Visualization</h2>
      <GraphAlgorithm
        back={() => { }}
        start={() => {
          initBfs();
        }}
        next={() => {
          if (!queue.isEmpty())
            bfs();
        }}
        setAdjMat={setAdjMat}
        setStartIdx={setStart}
        startIdx={start}
        nodes={nodes}
        setNodes={setNodes}
        keys={[
          {
            backgroundColor: calculateGradientColor(0),
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
