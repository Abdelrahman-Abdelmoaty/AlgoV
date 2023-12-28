import { useState } from "react";
import List from "./List";
import uuid from "react-uuid";

export default function InsertionSort() {
  const [test1, setTest1] = useState("")
  const [test2, setTest2] = useState("")
  const [list, setList] = useState([
    { id: uuid(), value: 1 },
    { id: uuid(), value: 2 },
    { id: uuid(), value: 3 },
    { id: uuid(), value: 1 },
    { id: uuid(), value: 2 },
    { id: uuid(), value: 3 },
    { id: uuid(), value: 1 },
    { id: uuid(), value: 2 },
    { id: uuid(), value: 3 },
  ]);
  const [swap, setSwap] = useState([{i: 1, j: 2}, {i:3, j:4}, {i:1, j: 3}]);

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
      <input value={test1} onChange={(e) => setTest1(e.target.value)} />
      <input value={test2} onChange={(e) => setTest2(e.target.value)} />

      <button onClick={() => setSwap([...swap, { i: +test1, j: +test2 }])}>swap</button>
      <button onClick={() => setSwap([...swap, { i: 0, j: 2 }])}>swap2</button>
    </div>
  );
}
