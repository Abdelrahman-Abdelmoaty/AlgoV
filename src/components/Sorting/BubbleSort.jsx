import { useState } from "react";
import List from "./List";
import uuid from "react-uuid";
import { motion } from "framer-motion";

// id: string,
// value: number,
// color?: string,
// backgroundColor?: string,
// borderColor?: string,
export default function BubbleSort() {
  const [list, setList] = useState([]);
  const [swap, setSwap] = useState([]);
  const [areas, setAreas] = useState([]);
  const [showControls, setShowControls] = useState(true);
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

  const changeColor = (i) => {
    setList((list) => {
      return list.map((item, idx) => {
        if (idx === i) {
          return {
            ...item,
            color: "white",
            backgroundColor: "rgb(5, 131, 83)",
          };
        } else return item;
      });
    });
  };

  const removeColor = (i) => {
    setList((list) => {
      return list.map((item, idx) => {
        if (idx === i) {
          return { ...item, color: "black", backgroundColor: "white" };
        } else return item;
      });
    });
  };
  const makeFullSwap = (i, j, time, swapFlag) => {
    setTimeout(() => {
      changeColor(i);
      changeColor(j);
      swapFlag && setSwap((prev) => [...prev, { i, j }]);
      setTimeout(
        () => {
          removeColor(i);
          removeColor(j);
        },
        swapFlag ? 4500 : 1500
      );
    }, time);
  };
  const handleSort = () => {
    let time = 0;
    setShowControls(false);
    const copy = list.map((e) => e.value);
    for (let i = 0; i < list.length; i++) {
      let swapped = false;
      for (let j = 0; j < list.length - i - 1; j++) {
        if (copy[j] > copy[j + 1]) {
          makeFullSwap(j, j + 1, time, true);
          [copy[j], copy[j + 1]] = [copy[j + 1], copy[j]];
          swapped = true;
          time += 5000;
        } else {
          makeFullSwap(j, j + 1, time, false);
          time += 2000;
        }
      }
      if (swapped === false) break;
    }
    setTimeout(() => {
      setShowControls(true);
    }, time);
  };

  const handleGenerateRandomList = () => {
    setList(generateRandomList());
    setSwap([]);
    setAreas([]);
  };
  const handleStop = () => {
    window.location.reload();
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="algorithm-title">Bubble Sort</h2>
      <List list={list} setList={setList} setSwapList={setSwap} swapList={swap} areas={areas} setAreas={setAreas} showControls={showControls} />
      <div className="flex gap-5 mt-[55px]">
        {showControls && (
          <>
            <motion.button onClick={handleSort} whileHover={{ scale: 1.1 }} className=" font-semibold shadow-md text-xl text-white bg-[rgb(5,131,83)] rounded-lg px-3 py-3 capitalize w-32">
              Sort
            </motion.button>
            <motion.button onClick={handleGenerateRandomList} whileHover={{ scale: 1.1 }} className=" font-semibold shadow-md text-xl text-white bg-[rgb(5,131,83)] rounded-lg px-3 py-3 capitalize w-40">
              Generate
            </motion.button>
          </>
        )}
        {!showControls && (
          <motion.button onClick={handleStop} whileHover={{ scale: 1.1 }} className=" font-semibold shadow-md text-xl text-white bg-red-500 rounded-lg px-3 py-3 capitalize w-32">
            Reset
          </motion.button>
        )}
      </div>
    </div>
  );
}
