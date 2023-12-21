export default function GraphArea({ children }) {
  return (
    <>
      <svg viewBox="0 0 500 600" height="600px" he className="border-2 border-black flex-1">
        {children}
      </svg>
    </>
  );
}
