import { useState } from "react";
import List from "./List";

export default function InsertionSort() {
  const [list, setList] = useState([
    { id: "1", value: 1 },
    { id: "2", value: 2 },
    { id: "3", value: 3 },
    { id: "4", value: 1 },
    { id: "5", value: 2 },
    { id: "6", value: 3 },
    { id: "7", value: 1 },
    { id: "8", value: 2 },
    { id: "9", value: 3 },
  ]);
  const [swap, setSwap] = useState([]);

  return (
    <div>
      <List
        list={list}
        setList={setList}
        setSwapList={setSwap}
        swapList={swap}
        areas={[
          {
            i: 1,
            j: 2,
            color: "red",
          },
          {
            i: 3,
            j: 9,
            color: "blue",
          },
        ]}
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
      <button onClick={() => setSwap([...swap, { i: 0, j: 2 }])}>swap2</button>
    </div>
  );
}
