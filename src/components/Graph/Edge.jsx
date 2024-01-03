import { motion } from "framer-motion";

export default function Edge({ edge, directed, weighted }) {
  const offset = 21;
  const angle = Math.atan2(edge.dest.y - edge.src.y, edge.dest.x - edge.src.x) * (180 / Math.PI);
  const arrowX = edge.dest.x - offset * Math.cos(angle * (Math.PI / 180));
  const arrowY = edge.dest.y - offset * Math.sin(angle * (Math.PI / 180));

  const midX = (edge.src.x + edge.dest.x) / 2;
  const midY = (edge.src.y + edge.dest.y) / 2;

  return (
    <motion.g>
      <motion.line initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} 
      transition={{ duration: 0.5 }} x1={edge.src.x} y1={edge.src.y} x2={edge.dest.x} y2={edge.dest.y} 
      stroke="black" strokeWidth={4} />
      {directed && (
        <motion.path
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ transition: 0, delay: 0.5 }}
          stroke="black"
          fill="black"
          d="M -15 7.5 L 0 0 L -15 -7.5 Z"
          transform={`translate(${arrowX} ${arrowY}) rotate(${angle})`}
        ></motion.path>
      )}
      {weighted && (
        <motion.text x={midX - 15} y={midY - 15} textAnchor="middle" 
        alignmentBaseline="middle" fontSize="16" fontWeight="bold" fill="black">
          {50}
        </motion.text>
      )}
    </motion.g>
  );
}
