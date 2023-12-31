import { useRef } from "react";
export default function GraphArea({ children }) {
  const windowWidth = useRef(window.innerWidth);
  return (
    <>
      <svg viewBox={`0 0 ${0.5 * windowWidth.current} 600`} height="600px" width="50vw" className="border-2 border-[rgb(5,131,83)] flex-1">
        {children}
      </svg>
    </>
  );
}
