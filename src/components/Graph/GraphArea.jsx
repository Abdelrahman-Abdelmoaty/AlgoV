import { useRef } from "react";
export default function GraphArea({ children }) {
  const windowSize = useRef([window.innerWidth, window.innerHeight]);
  return (
    <>
      <svg viewBox={`0 0 ${0.5 * windowSize.current[0]}  ${0.7 * windowSize.current[1]}`} width="50vw" height="70vh" className="border-2 border-[rgb(5,131,83)] flex-1">
        {children}
      </svg>
    </>
  );
}
