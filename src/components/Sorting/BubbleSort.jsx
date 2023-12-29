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
  const [list, setList] = useState([
    { id: uuid(), value: 1, color: "black", backgroundColor: "white", borderColor: "black" },
    { id: uuid(), value: 2, color: "black", backgroundColor: "white", borderColor: "black" },
    { id: uuid(), value: 3, color: "black", backgroundColor: "white", borderColor: "black" },
    { id: uuid(), value: 6, color: "black", backgroundColor: "white", borderColor: "black" },
    { id: uuid(), value: 5, color: "black", backgroundColor: "white", borderColor: "black" },
    { id: uuid(), value: 4, color: "black", backgroundColor: "white", borderColor: "black" },
    { id: uuid(), value: 9, color: "black", backgroundColor: "white", borderColor: "black" },
    { id: uuid(), value: 10, color: "black", backgroundColor: "white", borderColor: "black" },
    { id: uuid(), value: 3, color: "black", backgroundColor: "white", borderColor: "black" },
  ]);
  const [swap, setSwap] = useState([]);
  const [areas, setAreas] = useState([]);
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
      for (let j = 0; j < list.length - i - 1; j++) {
        if (copy[j] > copy[j + 1]) {
          makeFullSwap(j, j + 1, time, true);
          [copy[j], copy[j + 1]] = [copy[j + 1], copy[j]];
          time += 5000;
        } else {
          makeFullSwap(j, j + 1, time, false);
          time += 1000;
        }
      }
    }
    console.log(list);
    console.log(copy);
  };
  return (
    <div className="flex flex-col items-center">
      <h2 className="algorithm-title">Bubble Sort</h2>
      <List list={list} setList={setList} setSwapList={setSwap} swapList={swap} areas={areas} setAreas={setAreas} />
      <motion.button onClick={handleSort} whileHover={{ scale: 1.1 }} className="bg-[rgb(5,131,83)] text-white px-5 py-4 text-2xl font-semibold rounded-xl">
        Sort
      </motion.button>
    </div>
  );
}
