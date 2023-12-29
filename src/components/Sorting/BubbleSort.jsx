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
    {
      id: uuid(),
      value: 1,
      color: "black",
      backgroundColor: "white",
      borderColor: "black",
    },
    {
      id: uuid(),
      value: 2,
      color: "black",
      backgroundColor: "white",
      borderColor: "black",
    },
    {
      id: uuid(),
      value: 3,
      color: "black",
      backgroundColor: "white",
      borderColor: "black",
    },
    {
      id: uuid(),
      value: 6,
      color: "black",
      backgroundColor: "white",
      borderColor: "black",
    },
    {
      id: uuid(),
      value: 5,
      color: "black",
      backgroundColor: "white",
      borderColor: "black",
    },
    {
      id: uuid(),
      value: 4,
      color: "black",
      backgroundColor: "white",
      borderColor: "black",
    },
    {
      id: uuid(),
      value: 9,
      color: "black",
      backgroundColor: "white",
      borderColor: "black",
    },
    {
      id: uuid(),
      value: 10,
      color: "black",
      backgroundColor: "white",
      borderColor: "black",
    },
    {
      id: uuid(),
      value: 3,
      color: "black",
      backgroundColor: "white",
      borderColor: "black",
    },
  ]);
  const [swap, setSwap] = useState([]);
  const removeColor = (i) => {
    setList((list) => {
      return list.map((item, idx) => {
        if (idx == i) {
          return { ...item, color: "black", backgroundColor: "white" };
        } else return item;
      });
    });
  };
  const changeColor = (i, speed) => {
    setTimeout(() => {
      setList((list) => {
        return list.map((item, idx) => {
          if (idx == i) {
            return { ...item, color: "white", backgroundColor: "blue" };
          } else return item;
        });
      });
      console.log(`add color ${i}`);
      setTimeout(() => {
        console.log(`remove color ${i}`);
        removeColor(i);
      }, 1000);
    }, speed * 2000);
  };

  const handleSort = () => {
    const swaps = [];
    for (let i = 0; i < list.length; i++) {
      for (let j = 0; j < list.length - 1; j++) {
        changeColor(j, j);
        changeColor(j + 1, j);
        if (list[j].value > list[j + 1].value) {
          swaps.push({ i: j, j: j + 1 });
        }
      }
    }
    for (let i = 0; i < swaps.length; i++) {}
    console.log(swaps);
    // setSwap(swaps);
  };
  return (
    <div>
      <h2 className="algorithm-title">Bubble Sort</h2>
      <List
        list={list}
        setList={setList}
        setSwapList={setSwap}
        swapList={swap}
      />
      <button
        onClick={() =>
          setList([
            { id: "1", value: 1 },
            { id: "2", value: 2 },
            { id: "3", value: 3 },
            { id: "4", value: 1 },
            { id: "5", value: 2 },
            { id: "6", value: 3 },
            { id: "7", value: 1 },
            { id: "8", value: 2 },
            { id: "9", value: 3 },
          ])
        }
      >
        create
      </button>
      <button onClick={() => setSwap([{ i: 1, j: 5 }])}>swap</button>
      <motion.button
        onClick={handleSort}
        whileHover={{ scale: 1.1 }}
        className="bg-[rgb(5,131,83)] text-white px-5 py-4 text-2xl font-semibold rounded-xl"
      >
        Sort
      </motion.button>
    </div>
  );
}
