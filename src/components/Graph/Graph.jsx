import Node from "./Node";
import Edge from "./Edge";
import GraphArea from "./GraphArea";
import { useState } from "react";
import { motion } from "framer-motion";
//, directed, setDirected
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
      setNodes([...nodes, { id: id, value: input, color: "white", borderColor: "black", x: ((50 * id) % 500) + 50, y: ((100 * id) % 300) + 50 }]);
      setInput("");
    }
  };
  /*
    BFS
  
  */
  return (
    <div className="py-20 flex flex-1 justify-between items-center">
      <GraphArea>
        {edges.map((edge, idx) => {
          const src = nodes.find((node) => node.id === edge.src);
          const dest = nodes.find((node) => node.id === edge.dest);
          return <Edge key={idx} edge={{ src: { x: src.x, y: src.y }, dest: { x: dest.x, y: dest.y } }} directed={directed} weighted={weighted} />;
        })}
        {nodes.map((node, idx) => {
          return <Node key={idx} node={node} setNodes={setNodes} setEdges={setEdges} activeEdge={activeEdge} setActiveEdge={setActiveEdge} />;
        })}
      </GraphArea>
      <div className="flex flex-col items-center gap-5 justify-center w-44 text-center mx-5">
        <div className="w-full">
          <form onSubmit={handleAddNode} className="flex items-center justify-between">
            <motion.input
              type="text"
              onChange={(e) => {
                setInput(e.target.value);
                setError(false);
              }}
              value={input}
              className="border-b-2 border-black outline-none text-center font-semibold text-xl max-w-[100px]"
              whileFocus={{ scale: 1.1 }}
            />
            <motion.button onClick={handleAddNode} className="font-semibold text-xl text-white bg-black rounded-lg px-3 py-2 capitalize" whileHover={{ scale: 1.1 }}>
              add
            </motion.button>
          </form>
        </div>
        {error && <p className="block text-red-500 mt-1 font-semibold">Please enter a number!</p>}
        <motion.div
          onClick={() => {
            setDirected((prev) => !prev);
          }}
          className={`w-full rounded-lg py-2 capitalize text-xl font-semibold ${directed ? "bg-red-500" : "bg-black"} text-white cursor-pointer`}
          whileHover={{ scale: 1.1 }}
        >
          Directed
        </motion.div>
        <motion.div
          onClick={() => {
            setWeighted((prev) => !prev);
          }}
          className={`w-full rounded-lg py-2 capitalize text-xl font-semibold ${weighted ? "bg-red-500" : "bg-black"} text-white cursor-pointer`}
          whileHover={{ scale: 1.1 }}
        >
          weighted
        </motion.div>
        <motion.button
          onClick={() => {
            const randomNodes = [];
            for (let i = 0; i < 10; i++) {
              const randNum = Math.floor(Math.random() * 10) + 1;
              const newId = randomNodes.length + 1;
              randomNodes.push({ id: newId, value: randNum, color: "white", borderColor: "black", x: ((50 * newId) % 500) + 50, y: ((100 * newId) % 300) + 50 });
            }
            setEdges([
              { src: 1, dest: 2 },
              { src: 2, dest: 3 },
              { src: 2, dest: 4 },
              { src: 4, dest: 5 },
              { src: 4, dest: 6 },
              { src: 9, dest: 10 },
              { src: 7, dest: 8 },
              { src: 10, dest: 1 },
            ]);
            setNodes(randomNodes);
          }}
          whileHover={{ scale: 1.1 }}
          className="w-full rounded-lg py-2 capitalize text-xl font-semibold bg-black text-white"
        >
          Randomize
        </motion.button>
      </div>
    </div>
  );
}
