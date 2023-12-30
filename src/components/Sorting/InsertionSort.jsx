import { useState } from "react";
import List from "./List";
import uuid from "react-uuid";
import Controls from "../Graph/Controls";
import { motion } from "framer-motion";
import "../../styles/graph-algorithm.css";

export default function SortingAlgorithm() {
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
  const handleInsertionSort = async () => {
    const copy = [...list];
    const n = copy.length;
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    changeColor(0, "green");
    await delay(1000);
    changeColor(0, "blue");
    await delay(1000);
    for (let i = 1; i < n; i++) {
      let key = copy[i].value;
      let j = i - 1;

      changeColor(i, "green");

      while (j >= 0 && copy[j].value > key) {
        resetColors(0, n - 1);
        await new Promise((resolve) =>
          makeFullSwap(j, j + 1, 1000, true, () => {
            resolve();
          })
        );
        j = j - 1;
      }
      await delay(1000);
      for (let k = i; k >= 0; k--) changeColor(k, "blue");
      // resetColors(0, n - 1);

      await delay(1000);
    }
  };

  const keys = [
    {
      backgroundColor: "grey",
      label: "swapping till its position",
    },
    {
      backgroundColor: "green",
      label: "current item to insert",
    },
    {
      backgroundColor: "blue",
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
        <h2 className="algorithm-title">Insertion Sort</h2>
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
      </div>
    </div>
  );
}
