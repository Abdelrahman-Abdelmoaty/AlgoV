import { useState } from "react";
import List from "./List";
import uuid from "react-uuid";
import Controls from "../Graph/Controls";
import { motion } from "framer-motion";
import "../../styles/graph-algorithm.css";

export default function SortingAlgorithm() {
  const [list, setList] = useState([]);
  const [showControls, setShowControls] = useState(true);

  const [swap, setSwap] = useState([]);
  const [areas, setAreas] = useState([]);
  const [controls, setControls] = useState(true);
  const generateRandomList = () => {
    const randomValue = () => Math.floor(Math.random() * 10) + 1;

    return Array.from({ length: 9 }, (_, index) => ({
      id: uuid(),
      value: randomValue(),
      color: "black",
      backgroundColor: "white",
      borderColor: "black",
    }));
  };

  const changeColor = (i, color) => {
    setList((list) => {
      return list.map((item, idx) => {
        if (idx === i) {
          return {
            ...item,
            backgroundColor: color === "black" ? "white" : color,
          };
        } else return item;
      });
    });
  };

  const resetColors = (start, end) => {
    for (let i = start; i <= end; i++) {
      changeColor(i, "black");
    }
  };

  const makeFullSwap = (i, j, time, swapFlag, callback) => {
    setTimeout(() => {
      changeColor(i, "rgb(252 165 165)");
      changeColor(j, "rgb(239 68 68)");
      swapFlag && setSwap((prev) => [...prev, { i, j }]);
      setTimeout(
        () => {
          changeColor(i, "black");
          changeColor(j, "black");
          callback();
        },
        swapFlag ? 4500 : 500
      );
    }, time);
  };
  function swap2(array, index1, index2) {
    const temp = array[index1];
    array[index1] = array[index2];
    array[index2] = temp;
  }
  const handleInsertionSort = async () => {
    setControls(false);
    const copy = [...list];
    const n = copy.length;
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    changeColor(0, "rgb(239 68 68)");
    await delay(1000);
    changeColor(0, "rgb(5,131,83)");
    await delay(2000);
    for (let i = 1; i < n; i++) {
      let key = copy[i].value;
      let j = i - 1;

      changeColor(i, "rgb(239 68 68)");
      while (j >= 0 && copy[j].value > key) {
        resetColors(0, n - 1);
        await new Promise((resolve) =>
          makeFullSwap(j, j + 1, 0, true, () => {
            resolve();
          })
        );
        swap2(copy, j, j + 1);
        j = j - 1;
      }
      await delay(1000);
      for (let k = i; k >= 0; k--) changeColor(k, "rgb(5,131,83)");
      // resetColors(0, n - 1);

      await delay(2000);
    }
    setControls(true);
  };
  const handleStop = () => {
    window.location.reload();
  };
  const keys = [
    {
      backgroundColor: "rgb(252 165 165)",
      label: "swapping till its position",
    },
    {
      backgroundColor: "rgb(239 68 68)",
      label: "current item to insert",
    },
    {
      backgroundColor: "rgb(5,131,83)",
      label: "sorted subarray till now",
    },
  ];

  const handleGenerateRandomList = () => {
    setList(generateRandomList());
    setSwap([]);
    setAreas([]);
  };
  return (
    <div>
      <div className="flex flex-col items-center">
        <h2 className="algorithm-title">Insertion Sort</h2>
        <div className="flex w-full gap-10">
          {list.length > 0 && (
            <div className="keys pl-10">
              {keys?.map((key) => (
                <div className="key">
                  <div className="sample" style={key}></div>
                  <span>{key.label}</span>
                </div>
              ))}
            </div>
          )}
          <div className="flex-grow">
            <List
              list={list}
              setList={setList}
              setSwapList={setSwap}
              swapList={swap}
              areas={areas}
              setAreas={setAreas}
              showControls={controls}
            />
          </div>
        </div>
        {controls && (
          <div className="flex gap-5">
            <motion.button
              onClick={handleInsertionSort}
              whileHover={{ scale: 1.1 }}
              className=" font-semibold shadow-md text-xl text-white bg-[rgb(5,131,83)] rounded-lg px-3 py-3 capitalize w-32"
            >
              Sort
            </motion.button>
            <motion.button
              onClick={handleGenerateRandomList}
              whileHover={{ scale: 1.1 }}
              className=" font-semibold shadow-md text-xl text-white bg-[rgb(5,131,83)] rounded-lg px-3 py-3 capitalize w-40"
            >
              Generate
            </motion.button>
          </div>
        )}
        {!controls && (
          <motion.button
            onClick={handleStop}
            whileHover={{ scale: 1.1 }}
            className=" font-semibold shadow-md text-xl text-white bg-red-500 rounded-lg px-3 py-3 capitalize w-32"
          >
            Reset
          </motion.button>
        )}
      </div>
    </div>
  );
}
