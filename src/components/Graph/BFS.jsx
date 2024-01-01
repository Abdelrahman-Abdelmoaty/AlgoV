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
  const [levelColors, setLevelColors] = useState({ 0: "rgb(44, 202, 227)" });

  const defaultBorderColor = "black";
  const neighborBorderColor = "#08ff00";
  const currentBorderColor = "red";

  useEffect(() => {
    if (!queue.isEmpty()) bfs();
  }, [queue]);

  const visit = (idx, level) => {
    const newNodes = [...nodes];
    const color = levelColors[level];
    newNodes[idx].color = color;
    setNodes(newNodes);
  };

  const initBfs = () => {
    if (start !== null && start >= 0 && start < nodes.length) {
      let newQueue = new Queue();
      newQueue.enqueue({ vertex: start, level: 0 });
      setQueue(newQueue);
      setVisited(new Set());
      bfs();
      return false;
    } else return true;
  };

  const bfs = () => {
    const newNodes = [...nodes];
    if (!queue.isEmpty()) {
      const { vertex: currentVertex, level } = queue.peek();
      if (!visited.has(currentVertex)) {
        visit(currentVertex, level);
        setVisited(new Set(visited).add(currentVertex));
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

      if (!levelColors.hasOwnProperty(level + 1)) {
        setLevelColors((prev) => ({
          ...prev,
          [level + 1]: getRandomColor(),
        }));
      }
    }
  };

  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++)
      color += letters[Math.floor(Math.random() * 16)];
    return color;
  };
  const keys = [
    {
      borderColor: currentBorderColor,
      label: "Current node",
    },
    {
      borderColor: neighborBorderColor,
      label: "Neighbors",
    },
    ...Object.keys(levelColors)
      .filter((level) => nodes.some((node) => node.color === levelColors[level]))
      .map((level, index) => ({
        backgroundColor: levelColors[level],
        label: `Level ${index}`,
      })),
  ];
  return (
    <div className="dfs-component">
      <h2 className="algorithm-title">Breadth First Search Visualization</h2>
      <GraphAlgorithm
        back={() => {}}
        start={initBfs}
        next={() => {
          if (!queue.isEmpty()) bfs();
        }}
        setAdjMat={setAdjMat}
        setStartIdx={setStart}
        startIdx={start}
        nodes={nodes}
        setNodes={setNodes}
        keys={keys}
      />
    </div>
  );
}
