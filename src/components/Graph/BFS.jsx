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
  const visitedColor = "rgb(44, 202, 227)";

  useEffect(() => {
    if (!queue.isEmpty()) bfs();
  }, [queue]);

  const visit = (idx, nodes) => {
    visited.add(idx);
    nodes[idx].color = visitedColor;
  };

  const initBfs = () => {
    let newQueue = new Queue();
    newQueue.enqueue(start);
    setQueue(newQueue);
    setVisited(new Set());
  };

  const bfs = () => {
    const newNodes = [...nodes];
    const currentVertex = queue.peek();

    if (lastVertex !== null) {
      newNodes[lastVertex].borderColor = defaultBorderColor;
      for (let i = 0; i < nodes.length; i++) {
        if (adjMat[lastVertex][i] === 1 && !visited.has(i)) {
          newNodes[i].borderColor = defaultBorderColor;
        }
      }
    }
    if (!queue.isEmpty()) {
      visit(currentVertex, newNodes);

      for (let i = 0; i < nodes.length; i++) {
        if (adjMat[currentVertex][i] === 1 && !visited.has(i)) {
          newNodes[i].borderColor = neighborBorderColor;
          queue.enqueue(i);
        }
      }

      if (lastVertex !== null) {
        newNodes[lastVertex].borderColor = defaultBorderColor;
      }

      newNodes[currentVertex].borderColor = currentBorderColor;
      setLastVertex(currentVertex);

      queue.dequeue();
      setNodes(newNodes);
    }
  };

  return (
    <div className="dfs-component">
      <h2 className="algorithm-title">Breadth First Search Visualization</h2>
      <GraphAlgorithm
        back={() => {}}
        start={() => {
          initBfs();
        }}
        next={() => {
          bfs();
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

/*
import { Queue } from "../../lib/utils";
import GraphAlgorithm from "./GraphAlgorithm";
import React, { useState } from "react";

export default function BFS() {
  const [directed, setDirected] = useState(false);
  const [nodes, setNodes] = useState([]);
  const [adjMat, setAdjMat] = useState([]);
  const [start, setStart] = useState(null);
  const [queue, setQueue] = useState(new Queue());
  const [visited, setVisited] = useState(new Set());
  const [levelColors, setLevelColors] = useState({ 0: "grey" });

  const visit = (idx, level) => {
    const newNodes = [...nodes];
    const color = levelColors[level];
    newNodes[idx] = { ...newNodes[idx], color };
    setNodes(newNodes);
  };

  const initBfs = () => {
    let newQueue = new Queue();
    newQueue.enqueue({ node: start, level: 0 });
    setQueue(newQueue);
    setVisited(new Set());
    bfs();
  };

  const bfs = () => {
    if (!queue.isEmpty()) {
      const { node, level } = queue.peek();
      const newQueue = queue.copy();
      if (!visited.has(node)) {
        visit(node, level);
        setVisited(new Set(visited).add(node));
      }

      for (let i = 0; i < nodes.length; i++) {
        if (adjMat[node][i] === 1 && !visited.has(i)) {
          newQueue.enqueue({ node: i, level: level + 1 });
        }
      }

      newQueue.dequeue();
      setQueue(newQueue);

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
    for (let i = 0; i < 6; i++) color += letters[Math.floor(Math.random() * 16)];
    return color;
  };

  return (
    <div className="dfs-component">
      <h2>Breadth First Search Visualization</h2>
      <GraphAlgorithm
        back={() => {}}
        start={() => {
          initBfs();
        }}
        next={() => {
          bfs();
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
*/

/*
import { Queue } from "../../lib/utils";
import Graph from "./Graph";
import { useState } from "react";
import GraphAlgorithm from "./GraphAlgorithm";

export default function BFS() {
  const [nodes, setNodes] = useState([]);
  const [adjMat, setAdjMat] = useState([]);
  const [start, setStart] = useState(null);
  const [queue, setQueue] = useState(new Queue());
  const [visited, setVisited] = useState(new Set());

  const visit = (idx) => {
    visited.add(idx);
    const newNodes = [...nodes];
    newNodes[idx] = { ...newNodes[idx], color: "grey" };
    setNodes(newNodes);
  };

  const initBfs = () => {
    let newQueue = new Queue();
    newQueue.enqueue(start);
    setQueue(newQueue);
    setVisited(new Set());
    bfs();
  };

  const bfs = () => {
    if (!queue.isEmpty()) {
      const currentVertex = queue.peek();
      const newQueue = queue.copy();
      visit(currentVertex);
      for (let i = 0; i < nodes.length; i++) {
        if (adjMat[currentVertex][i] === 1 && !visited.has(i)) {
          newQueue.enqueue(i);
        }
      }
      newQueue.dequeue();
      setQueue(newQueue);
    }
  };


  return (
    <div class="dfs-component">
      <h2>Breadth First Search Visualization</h2>
      <GraphAlgorithm
        back={() => {}}
        start={() => {
          initBfs();
        }}
        next={() => {
          bfs();
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
*/

/*
import { Queue } from "../../lib/utils";
import Graph from "./Graph";
import { useState } from "react";
export default function BFS() {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const handleClick = ()=>{
      const adjMat = Array.from({ length: nodes.length + 1 }, () => Array(nodes.length + 1).fill(0));
      const visited = Array(nodes.length + 1).fill(0);
      for (let i = 0; i < edges.length; i++) {
        adjMat[edges[i].src][edges[i].dest] = 1;
        adjMat[edges[i].dest][edges[i].src] = 1;
      }
      let src = 1;
      visited[src] = 1;
      let q = new Queue();
      q.enqueue(src);
      while (!q.isEmpty) {
        const u = q.peek();
        q.dequeue();
        setNodes((prev) => {
          return prev.map((node) => {
            if (node.id == u) {
              return { ...node, color: "red" };
            } else {
              return node;
            }
          });
        });
        for (let i = 1; i <= nodes.length; i++) {
          if (adjMat[u][i] == 1 && !visited[i]) {
            visited[i] = 1;
            q.enqueue(i);
          }
        }
      }
    }
  return (
    <div>
      <button
        className="text-3xl"
        onClick={handleClick}>
        bfs
      </button>
      <Graph nodes={nodes} setNodes={setNodes} edges={edges} setEdges={setEdges} />
    </div>
  );
}
*/
