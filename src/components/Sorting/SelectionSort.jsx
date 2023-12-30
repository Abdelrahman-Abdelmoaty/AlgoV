import { useState } from "react";
import List from "./List";
import uuid from "react-uuid";
import { motion } from "framer-motion";
import "../../styles/graph-algorithm.css";

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

export default function SelectionSort() {
  const [list, setList] = useState([]);
  const [swap, setSwap] = useState([]);
  const [areas, setAreas] = useState([]);

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

  const makeFullSwap = (i, j, time, swapFlag, callback) => {
    setTimeout(() => {
      changeColor(i, "grey");
      changeColor(j, "green");
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

  const handleSelectionSort = async () => {
    const copy = [...list];
    const n = copy.length;
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    for (let i = 0; i < n - 1; i++) {
      let minIndex = i;
      changeColor(i, "blue");
      await delay(1000);
      changeColor(i, "green");
      for (let j = i + 1; j < n; j++) {
        changeColor(j, "blue");
        await delay(1000);
        if (copy[j].value < copy[minIndex].value) {
          if (minIndex == i) changeColor(minIndex, "grey");
          else changeColor(minIndex, "black");
          minIndex = j;
          changeColor(minIndex, "green");
        } else {
          changeColor(j, "black");
        }
      }
      if (minIndex !== i) {
        await new Promise((resolve) =>
          makeFullSwap(i, minIndex, 1000, true, () => {
            [copy[i], copy[minIndex]] = [copy[minIndex], copy[i]];
            resolve();
          })
        );
      } else changeColor(i, "black");
    }
    changeColor(n - 1, "black");
  };

  const handleGenerateRandomList = () => {
    setList(generateRandomList());
    setSwap([]);
    setAreas([]);
  };

  const keys = [
    {
      backgroundColor: "grey",
      label: "current index",
    },
    {
      backgroundColor: "green",
      label: "smallest item",
    },
    {
      backgroundColor: "blue",
      label: "finding smallest",
    },
  ];

  return (
    <div>
      {list.length && (
        <div className="keys absolute left-0 top-1/2 transform -translate-y-1/2 pl-20">
          {keys?.map((key) => (
            <div className="key">
              <div className="sample" style={key}></div>
              <span>{key.label}</span>
            </div>
          ))}
        </div>
      )}
      <div className="flex flex-col items-center">
        <h2 className="algorithm-title">Selection Sort</h2>
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
            onClick={handleSelectionSort}
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
    </div>
  );
}
