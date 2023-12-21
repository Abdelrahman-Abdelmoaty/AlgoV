import "../../styles/graph-algorithm.css";
import { useEffect, useState } from "react";
import Controls from "./Controls";
import Graph from "./Graph";

export default function GraphAlgorithm({
  start,
  back,
  next,
  setAdjMat,
  startIdx,
  setStartIdx,
  nodes,
  setNodes,
  keys,
}) {
  const [edges, setEdges] = useState([]);

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
    <div className="graph-algorithm-component">
      <main className="flex justify-between items-center">
        <Controls
          start={start}
          startV={nodes[startIdx]?.value}
          setStart={(val) =>
            setStartIdx(nodes.findIndex((n) => n.value === val))
          }
          next={next}
          back={back}
        />
        <Graph
          nodes={nodes}
          setNodes={setNodes}
          edges={edges}
          setEdges={setEdges}
        />
      </main>
      <div className="keys">
        {keys?.map((key) => (
          <div className="key">
            <div className="sample" style={key}></div>
            <span>{key.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
