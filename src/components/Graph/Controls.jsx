import "../../styles/dfs.css";
import { useEffect, useState } from "react";
import { ReactComponent as LeftArrow } from "../../assets/svg/left-arrow.svg";
import { ReactComponent as RightArrow } from "../../assets/svg/right-arrow.svg";
import { motion } from "framer-motion";

export default function Controls({ start, startV, setStart, next, back, end }) {
  const [auto, setAuto] = useState(false);
  const [speed, setSpeed] = useState(5);
  const [error, setError] = useState(false);
  const [finished, setFinished] = useState(false);
  const [value, setValue] = useState('')
  useEffect(() => {
    if (auto && speed < 11 && !end && startV)
      setTimeout(() => {
        if (auto) {
          next();
          setFinished(!finished);
        }
      }, 500 * (11 - speed));
  }, [finished, auto]);

  return (
    <div>
      <h2 className="algorithm-title">Start traversing</h2>
      <div className="controls">
        <div className="start">
          {setStart !== undefined ? (
            <>
              <span>Start Vertex:</span>
              <input
                className="start-vertex"
                value={value}
                onChange={(e) => {
                  setValue(e.target.value);
                  setStart(e.target.value);
                  setError(false);
                }}
                placeholder="Start Vertex"
              />
            </>
          ) : (
            <></>
          )}
          <button
            onClick={() => {
              const exist = start();
              setError(exist);
              startV= value;
            }}
          >
            start
          </button>
        </div>
        {error && (
          <div className="flex items-center">
                      <p className="text-start block text-red-500 mt-1 font-semibold">
            Node doesn't exist
          </p>
          <motion.button onClick={(e) => {
                  setStart('');
                  setValue('');
                  setError(false);
                }} whileHover={{ scale: 1.1 }} className="bg-red-500 px-2 py-1 mx-auto rounded-md text-white">
          clear
        </motion.button>
          </div>
        )}
        <div className="type">
          <button
            className={auto ? "active" : ""}
            onClick={() => setAuto(true)}
          >
            Auto
          </button>
          <button
            className={!auto ? "active" : ""}
            onClick={() => setAuto(false)}
          >
            Manual
          </button>
        </div>
        {auto ? (
          <div className="auto">
            <span>speed:</span>
            <input
              type="range"
              min="0"
              max="10"
              value={speed}
              step="1"
              onChange={(e) => setSpeed(e.target.value)}
            />
          </div>
        ) : (
          <div className="manual">
            <button onClick={back}>
              <LeftArrow />
            </button>
            <button
              onClick={() => {
                if (!end) next();
              }}
            >
              <RightArrow />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
