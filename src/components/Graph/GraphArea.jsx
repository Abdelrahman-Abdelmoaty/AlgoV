export default function GraphArea({ children }) {
  return (
    <>
      <svg viewBox="0 0 500 800" height="800px" className="border-2 border-[rgb(5,131,83)] flex-1">
        {children}
      </svg>
    </>
  );
}
