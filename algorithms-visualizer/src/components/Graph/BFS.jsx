import { Queue } from "../../lib/utils";
import Graph from "./Graph";
import { useState } from "react";
export default function BFS() {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);

  return (
    <div>
      <Graph nodes={nodes} setNodes={setNodes} edges={edges} setEdges={setEdges} />
      <button
        className="text-3xl"
        onClick={() => {
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
        }}
      >
        bfs
      </button>
    </div>
  );
}
