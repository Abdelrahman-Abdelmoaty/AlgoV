import Node from "./Node";
import Edge from "./Edge";
import GraphArea from "./GraphArea";
import { useState } from "react";
import { motion } from "framer-motion";
export default function Graph({ nodes, setNodes, edges, setEdges }) {
  const [input, setInput] = useState("");
  const [activeEdge, setActiveEdge] = useState({ src: null, dest: null });
  const [directed, setDirected] = useState(false);
  const [weighted, setWeighted] = useState(false);
  const [error, setError] = useState(false);
  const handleAddNode = (e) => {
    e.preventDefault();
    if (!input) {
      setError(true);
    } else {
      const id = nodes.length + 1;
      setNodes([...nodes, { id: id, value: input, color: "white", x: ((50 * id) % 500) + 50, y: ((100 * id) % 300) + 50 }]);
      setInput("");
    }
  };
  /*
    BFS
  
  */
  return (
    <div className="py-20">
      <div>
        <div className="w-fit mx-auto flex flex-col mb-5">
          <div className="flex items-center gap-5 justify-center">
            <div>
              <form onSubmit={handleAddNode}>
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
              </form>
            </div>
            <motion.button onClick={handleAddNode} className="font-semibold text-xl text-white bg-black rounded-lg px-3 py-2 capitalize" whileHover={{ scale: 1.1 }}>
              add
            </motion.button>
            <motion.div
              onClick={() => {
                setDirected((prev) => !prev);
              }}
              className={`rounded-lg px-3 py-2 capitalize text-xl font-semibold ${directed ? "bg-red-500" : "bg-black"} text-white cursor-pointer`}
              whileHover={{ scale: 1.1 }}
            >
              Directed
            </motion.div>
            <motion.div
              onClick={() => {
                setWeighted((prev) => !prev);
              }}
              className={`rounded-lg px-3 py-2 capitalize text-xl font-semibold ${weighted ? "bg-red-500" : "bg-black"} text-white cursor-pointer`}
              whileHover={{ scale: 1.1 }}
            >
              weighted
            </motion.div>
          </div>
          {error && <p className="block text-red-500 mt-1 font-semibold">Please enter a number!</p>}
        </div>
      </div>
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
    </div>
  );
}
