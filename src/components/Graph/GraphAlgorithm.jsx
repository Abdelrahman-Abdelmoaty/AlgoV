import "../../styles/graph-algorithm.css";
import { useEffect, useState } from "react";
import Controls from "./Controls";
import Graph from "./Graph";

export default function GraphAlgorithm({ start, back, next, setAdjMat, startIdx, setStartIdx, nodes, setNodes, keys, end }) {
  const [edges, setEdges] = useState([]);
  const [directed, setDirected] = useState(false);

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

      newAdjMat[idx1][idx2] = 1;
      if (!directed) newAdjMat[idx2][idx1] = 1;
    });

    setAdjMat(newAdjMat);
  }, [edges, nodes]);

  return (
    <div className="graph-algorithm-component">
      <main className="flex justify-between items-center">
        <aside className="relative">
          <Controls start={start} startV={nodes[startIdx]?.value} setStart={(val) => setStartIdx(nodes.findIndex((n) => n.value === val))} next={next} back={back} />
          <p className="absolute font-medium pr-2">To start an edge double click on a source node and click on the destination node!</p>
          <div className="keys">
            {keys?.map((key) => (
              <div className="key" key={key.label}>
                <div className="sample" style={key}></div>
                <span>{key.label}</span>
              </div>
            ))}
          </div>
        </aside>
        <Graph nodes={nodes} setNodes={setNodes} edges={edges} setEdges={setEdges} directed={directed} setDirected={setDirected} />
      </main>
    </div>
  );
}
