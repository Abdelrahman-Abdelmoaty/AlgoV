import { useState } from "react";
import List from "./List";
import uuid from "react-uuid";
import Controls from "../Graph/Controls";

export default function InsertionSort() {
  const [test1, setTest1] = useState("");
  const [test2, setTest2] = useState("");
  const [areas, setAreas] = useState([
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
  ]);
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
  const [swap, setSwap] = useState([
    { i: 1, j: 2 },
    { i: 3, j: 4 },
    { i: 1, j: 3 },
  ]);

  return (
    <div>
      <List
        list={list}
        setList={setList}
        setSwapList={setSwap}
        swapList={swap}
        areas={areas}
        setAreas={setAreas}
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
            { id: "10", value: 1 },
            { id: "20", value: 2 },
            { id: "30", value: 3 },
            { id: "40", value: 1 },
            { id: "50", value: 2 },
            { id: "60", value: 3 },
            { id: "70", value: 1 },
            { id: "80", value: 2 },
            { id: "90", value: 3 },
            { id: "12", value: 1 },
            { id: "22", value: 2 },
            { id: "32", value: 3 },
            { id: "42", value: 1 },
            { id: "52", value: 2 },
            { id: "62", value: 3 },
            { id: "72", value: 1 },
            { id: "82", value: 2 },
            { id: "92", value: 3 },
            { id: "120", value: 1 },
            { id: "220", value: 2 },
            { id: "320", value: 3 },
            { id: "420", value: 1 },
            { id: "520", value: 2 },
            { id: "620", value: 3 },
            { id: "720", value: 1 },
            { id: "820", value: 2 },
            { id: "920", value: 3 },
          ])
        }
      >
        create
      </button>
      <input value={test1} onChange={(e) => setTest1(e.target.value)} />
      <input value={test2} onChange={(e) => setTest2(e.target.value)} />

      <button onClick={() => setSwap([...swap, { i: +test1, j: +test2 }])}>
        swap
      </button>
      <button onClick={() => setSwap([...swap, { i: 0, j: 2 }])}>swap2</button>
    </div>
  );
}
