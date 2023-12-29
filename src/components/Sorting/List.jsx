import { useEffect, useState } from "react";
import "../../styles/list.css";
import uuid from "react-uuid";
/*
    Sample List Item: {
        id: string,
        value: number,
        color?: string,
        backgroundColor?: string,
        borderColor?: string,
    }

    ? areas must be sorted with no interference
    Sample Area Item: {
        color: string
        i: number
        j: number
    }

    Sample swapList Item: {
        i: number,
        j: number
    }
*/
export default function List({ list, setList, swapList, setSwapList, areas }) {
  const [state, setState] = useState(0);
  // const [swapping, setSwapping] = useState(null);
  const [swapAgain, setSwapAgain] = useState(0);
  const [swapping, setSwapping] = useState(false);
  const [added, setAdded] = useState(false);
  const [lastI, setLastI] = useState(0);

  const swap = (i, len) => {
    setTimeout(() => {
      setList((prev) => {
        const newList = [...prev];
        newList[swapList[i].i] = {
          ...newList[swapList[i].i],
          bottom: "60px",
          left: 0,
        };
        newList[swapList[i].j] = {
          ...newList[swapList[i].j],
          bottom: "-60px",
          left: 0,
        };
        return newList;
      });
      swap1(i, len);
    }, 1000);
  };

  const swap1 = (i, len) => {
    setTimeout(function () {
      setList((prev) => {
        let num = swapList[i].j - swapList[i].i;
        const newList = [...prev];
        newList[swapList[i].i] = {
          ...newList[swapList[i].i],
          left: `${55 * num}px`,
        };
        newList[swapList[i].j] = {
          ...newList[swapList[i].j],
          left: `-${55 * num}px`,
        };

        return newList;
      });
      swap2(i, len);
    }, 1000);
  };

  const swap2 = (i, len) => {
    setTimeout(() => {
      setList((prev) => {
        const newList = [...prev];
        newList[swapList[i].i] = { ...newList[swapList[i].i], bottom: 0 };
        newList[swapList[i].j] = { ...newList[swapList[i].j], bottom: 0 };
        return newList;
      });
      swap3(i, len);
    }, 1000);
  };

  const swap3 = (i, len) => {
    setTimeout(() => {
      setList((prev) => {
        const newList = [...prev];
        const iv = {
          ...newList[swapList[i].i],
          id: uuid(),
          left: 0,
          bottom: 0,
        };
        newList[swapList[i].i] = {
          ...newList[swapList[i].j],
          id: uuid(),
          left: 0,
          bottom: 0,
        };
        newList[swapList[i].j] = iv;
        return newList;
      });
      if (i + 1 < len) swap(i + 1, len);
      else {
        setSwapping(false);
        setLastI(len);
      }
    }, 1000);
  };

  useEffect(() => {
    if (swapList.length) {
      if (!swapping) {
        setSwapping(true);
        swap(lastI, swapList.length);
      } else {
        setAdded(true);
      }
    }
  }, [swapList]);

  useEffect(() => {
    if (!swapping) {
      if (added) {
        setSwapping(true);
        setAdded(false);
        swap(lastI, swapList.length);
      } else if (lastI === swapList.length) {
        setSwapList([]);
        setLastI(0);
      }
    }
  }, [swapping]);

  let itemI = 0;
  let areaI = 0;
  let res = [];
  while (itemI < list.length) {
    if (areas && areas[areaI].i === itemI) {
      res.push(
        <div key={areaI} style={{ border: `2px solid ${areas[areaI].color}` }}>
          {Array(areas[areaI].j - areas[areaI].i)
            .fill(1)
            .map((x, i) => {
              const item = list[areas[areaI].i + i];
              return (
                <li key={item.id} style={item}>
                  {item.value}
                </li>
              );
            })}{" "}
        </div>
      );
      itemI = areas[areaI].j;
      areaI++;
    } else {
      // console.log("here", itemI, areaI);
      res.push(
        <li key={list[itemI].id} style={list[itemI]}>
          {list[itemI].value}
        </li>
      );
      itemI++;
    }
  }

  return (
    <div className="list-component">
      <ul className="list">{res.map((i) => i)}</ul>
    </div>
  );
}
