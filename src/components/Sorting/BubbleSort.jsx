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
          return { ...item, color: "white", backgroundColor: "blue" };
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
      console.log(`Change color ${i} and ${j}`);
      setTimeout(
        () => {
          removeColor(i);
          removeColor(j);
        },
        swapFlag ? 4500 : 500
      );
    }, time);
  };
  const handleSort = () => {
    let time = 1000;
    const copy = list.map((e) => e.value);
    console.log(list);
    console.log(copy);
    for (let i = 0; i < list.length; i++) {
      let swapped = false;
      for (let j = 0; j < list.length - i - 1; j++) {
        if (copy[j] > copy[j + 1]) {
          makeFullSwap(j, j + 1, time, true);
          [copy[j], copy[j + 1]] = [copy[j + 1], copy[j]];
          time += 5000;
          swapped = true;
        } else {
          makeFullSwap(j, j + 1, time, false);
          time += 1000;
        }
      }
      if (swapped === false) break;
    }
    console.log(list);
    console.log(copy);
  };

  const handleGenerateRandomList = () => {
    setList(generateRandomList());
    setSwap([]);
    setAreas([]);
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="algorithm-title">Bubble Sort</h2>
      <List
        list={list}
        setList={setList}
        setSwapList={setSwap}
        swapList={swap}
        areas={areas}
        setAreas={setAreas}
      />
      <div className="flex gap-5">
        <motion.button
          onClick={handleSort}
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
    </div>
  );
}
