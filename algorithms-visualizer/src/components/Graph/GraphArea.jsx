export default function GraphArea({ children }) {
  return (
    <>
      <svg viewBox="0 0 500 500" height={500} width="100vw" className="border-2 border-black">
        {children}
      </svg>
    </>
  );
}
