import React, { useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
const Node = ({ node, setNodes, setEdges, activeEdge, setActiveEdge }) => {
  const [circle, setCircle] = useState({ cx: node.x, cy: node.y, radius: 19 });
  const strokeWidth = 2;
  const svgGroupElemRef = useRef(null);

  const startDrag = useCallback(
    (event) => {
      event.preventDefault();

      const svgRect = svgGroupElemRef.current.getBoundingClientRect();

      const initialMouseX = event.clientX;
      const initialMouseY = event.clientY;

      const initialCircleX = circle.cx;
      const initialCircleY = circle.cy;

      const dragOffsetX = initialMouseX - initialCircleX - svgRect.left;
      const dragOffsetY = initialMouseY - initialCircleY - svgRect.top;

      const mousemove = (event) => {
        event.preventDefault();

        const newCircleX = event.clientX - svgRect.left - dragOffsetX;
        const newCircleY = event.clientY - svgRect.top - dragOffsetY;

        setCircle((prevCircle) => ({
          ...prevCircle,
          cx: newCircleX,
          cy: newCircleY,
        }));
        setNodes((prev) => {
          return prev.map((n) => {
            if (n.id === node.id) {
              return { ...node, x: newCircleX, y: newCircleY };
            } else return n;
          });
        });
      };

      const mouseup = () => {
        document.removeEventListener("mouseup", mouseup);
        document.removeEventListener("mousemove", mousemove);
      };

      document.addEventListener("mousemove", mousemove);
      document.addEventListener("mouseup", mouseup);
    },
    [circle]
  );
  const [isDoubleClicked, setIsDoubleClicked] = useState(false);
  return (
    <motion.g
      initial={{ x: 20 }}
      animate={{ x: 0 }}
      ref={svgGroupElemRef}
      onMouseDown={startDrag}
      cursor="pointer"
      onDoubleClick={(e) => {
        if (activeEdge.src === null) {
          setActiveEdge({ src: node.id, dest: null });
        }
        // setIsDoubleClicked(true);
      }}
      onClick={() => {
        if (activeEdge.src && activeEdge.src !== node.id && activeEdge.dest === null) {
          setActiveEdge({ src: null, dest: null });
          setEdges((prev) => [...prev, { src: activeEdge.src, dest: node.id }]);
          setIsDoubleClicked(false);
        }
      }}
    >
      <circle cx={circle.cx} cy={circle.cy} r={circle.radius} style={{ fill: `${node.color}`, stroke: "black", strokeWidth }} className="flex items-center justify-center" />
      <text x={circle.cx} y={circle.cy} textAnchor="middle" alignmentBaseline="middle" fontSize="14" fontWeight="bold">
        {node.value}
      </text>
    </motion.g>
  );
};

export default Node;
