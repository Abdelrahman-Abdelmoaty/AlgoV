import Node from "./Node";
import Edge from "./Edge";
import GraphArea from "./GraphArea";
import { useState } from "react";
import { motion } from "framer-motion";
export default function Graph({ nodes, setNodes, edges, setEdges }) {
  const [input, setInput] = useState("");
  const [activeEdge, setActiveEdge] = useState({ src: null, dest: null });
  const [weighted, setWeighted] = useState(false);
  const [directed, setDirected] = useState(false);
  const [error, setError] = useState(false);

  const handleAddNode = (e) => {
    e.preventDefault();
    if (!input) {
      setError(true);
    } else {
      const id = nodes.length + 1;
      setNodes([
        ...nodes,
        {
          id: id,
          value: input,
          color: "white",
          borderColor: "black",
          x: ((id * 50) % 400) + 50,
          y: ((id * 100) % 500) + 50,
        },
      ]);
      setInput("");
    }
  };

  const handleRandomize = () => {
    setNodes([]);
    setEdges([]);

    for (let i = 1; i <= 10; i++) {
      let newX = ((50 * i) % 400) + 50;
      let newY = ((100 * i) % 500) + 50;

      setNodes((prevNodes) => [
        ...prevNodes,
        {
          id: i,
          value: i.toString(),
          color: "white",
          borderColor: "black",
          x: newX,
          y: newY,
        },
      ]);
    }

    for (let i = 1; i <= 10; i++) {
      const srcNodeId = i;
      const destNodeId = Math.floor(Math.random() * 10) + 1;

      if (srcNodeId !== destNodeId) {
        setEdges((prevEdges) => [
          ...prevEdges,
          {
            src: srcNodeId,
            dest: destNodeId,
          },
        ]);
      }
    }
  };

  return (
    <div className="flex flex-1 justify-between items-center">
      <GraphArea>
        {edges.map((edge, idx) => {
          const src = nodes.find((node) => node.id === edge.src);
          const dest = nodes.find((node) => node.id === edge.dest);
          return (
            <Edge
              key={idx}
              edge={{
                src: { x: src.x, y: src.y },
                dest: { x: dest.x, y: dest.y },
              }}
              directed={directed}
              weighted={weighted}
            />
          );
        })}
        {nodes.map((node, idx) => {
          return <Node key={idx} node={node} setNodes={setNodes} setEdges={setEdges} activeEdge={activeEdge} setActiveEdge={setActiveEdge} />;
        })}
      </GraphArea>
      <div className="flex flex-col items-center gap-5 justify-center w-[430px] text-center ml-5">
        <div className="w-full">
          <form onSubmit={handleAddNode} className="flex items-center justify-between gap-5">
            <motion.input
              type="text"
              onChange={(e) => {
                setInput(e.target.value);
                setError(false);
              }}
              value={input}
              className="border-b-2 border-black outline-none text-center font-semibold text-xl flex-1"
              whileFocus={{ scale: 1.1 }}
            />
            <motion.button onClick={handleAddNode} className="flex-1 font-semibold shadow-md text-xl text-white bg-[rgb(5,131,83)] rounded-lg px-3 py-3 capitalize" whileHover={{ scale: 1.1 }}>
              add
            </motion.button>
          </form>
          {error && <p className="text-start block text-red-500 mt-1 font-semibold">Please enter a number!</p>}
        </div>
        <motion.div
          onClick={() => {
            setDirected((prev) => !prev);
          }}
          className={`w-full rounded-lg py-3 capitalize text-xl font-semibold shadow-md ${directed ? "bg-red-500" : "bg-[rgb(5,131,83)]"} text-white cursor-pointer`}
          whileHover={{ scale: 1.1 }}
        >
          Directed
        </motion.div>
        <motion.div
          onClick={() => {
            setWeighted((prev) => !prev);
          }}
          className={`w-full rounded-lg py-3 capitalize text-xl font-semibold shadow-md ${weighted ? "bg-red-500" : "bg-[rgb(5,131,83)]"} text-white cursor-pointer`}
          whileHover={{ scale: 1.1 }}
        >
          weighted
        </motion.div>
        <motion.button
          onClick={handleRandomize}
          whileHover={{ scale: 1.1 }}
          className="w-full rounded-lg py-3 capitalize text-xl font-semibold shadow-md bg-[rgb(5,131,83)] text-white"
        >
          Randomize
        </motion.button>
      </div>
    </div>
  );
}
