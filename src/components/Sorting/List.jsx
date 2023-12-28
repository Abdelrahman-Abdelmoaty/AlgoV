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
  const [swapping, setSwapping] = useState(null);
  const [swapAgain, setSwapAgain] = useState(0);
  const [test, setTest] = useState(false);

  const delay = (time) => new Promise((resolve) => setTimeout(resolve, time));

  const swap = (items) =>
    new Promise(async (resolve, error) => {
      const newList = [...list];
      newList[items.i] = { ...newList[items.i], bottom: "60px", left: 0 };
      newList[items.j] = {
        ...newList[items.j],
        bottom: "-60px",
        left: 0,
      };
      setList(newList);
      await delay(1000);
      let num = items.j - items.i;
      newList[items.i] = {
        ...newList[items.i],
        left: `${55 * num}px`,
      };
      newList[items.j] = {
        ...newList[items.j],
        left: `-${55 * num}px`,
      };
      setList(newList);

      await delay(1000);
      newList[items.i] = { ...newList[items.i], bottom: 0 };
      newList[items.j] = { ...newList[items.j], bottom: 0 };
      setList(newList);

      await delay(1000);
      const iv = { ...newList[items.i], id: uuid(), left: 0, bottom: 0 };
      newList[items.i] = {
        ...newList[items.j],
        id: uuid(),
        left: 0,
        bottom: 0,
      };
      newList[items.j] = iv;
      setList(newList);
      resolve();
    });

  useEffect(() => {
    swapList.forEach(async (s) => {
      /* setSwapping(s);
      const newList = [...list];
      newList[s.i] = { ...newList[s.i], bottom: "60px", left: 0 };
      newList[s.j] = {
        ...newList[s.j],
        bottom: "-60px",
        left: 0,
      }; */
      //setList(newList);
      //setState(1);
      await swap(s);
      console.log(s.i, s.j);
    });
    if (swapList.length) setSwapList([]);
  }, [swapList]);

  // useEffect(() => {
  //   if (swapping && swapAgain) {
  //     console.log(swapping)
  //     const newList = [...list];
  //     newList[swapping.i] = { ...newList[swapping.i], bottom: "60px", left: 0 };
  //     newList[swapping.j] = {
  //       ...newList[swapping.j],
  //       bottom: "-60px",
  //       left: 0,
  //     };
  //     setList(newList);
  //     setState(1);
  //   }
  // }, [swapping]);

  useEffect(() => {
    console.log("s use effect");

    switch (state) {
      case 1:
        setTimeout(() => {
          let num = swapping.j - swapping.i;
          const newList = [...list];
          newList[swapping.i] = {
            ...newList[swapping.i],
            left: `${55 * num}px`,
          };
          newList[swapping.j] = {
            ...newList[swapping.j],
            left: `-${55 * num}px`,
          };
          setList(newList);
          setState(2);
        }, 1000);
        break;
      case 2:
        setTimeout(() => {
          const newList = [...list];
          newList[swapping.i] = { ...newList[swapping.i], bottom: 0 };
          newList[swapping.j] = { ...newList[swapping.j], bottom: 0 };
          setList(newList);
          setState(3);
        }, 1000);
        break;
      case 3:
        setTimeout(() => {
          const newList = [...list];
          const iv = { ...newList[swapping.i], id: uuid(), left: 0, bottom: 0 };
          newList[swapping.i] = {
            ...newList[swapping.j],
            id: uuid(),
            left: 0,
            bottom: 0,
          };
          newList[swapping.j] = iv;
          setList(newList);
        }, 1000);
        break;
    }
  }, [state]);

  // useEffect(() => {
  //   console.log('3 use effect')

  //   if (swapList.length > 0) {
  //     setSwapping(swapList[0]);
  //     setTimeout(() => {
  //       setSwapAgain(p => p + 1);
  //       setTest(!test);
  //     }, 2000);
  //   }
  // }, [swapAgain]);

  // useEffect(() => {
  //   console.log('4 use effect')

  //   // console.log("from here", swapAgain, " list: ", swapList);
  //   if (swapList.length === 0) setSwapAgain(0);
  //   else if (swapList.length > 0 && swapAgain === 0) setSwapAgain(1);
  // }, [swapList, swapAgain]);

  // useEffect(() => {
  //   console.log('5 use effect')

  //   setSwapList(swapList.slice(1, swapList.length));
  // }, [test]);
  // console.log(list);

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
  // console.log(res);

  return (
    <div className="list-component">
      <ul className="list">{res.map((i) => i)}</ul>
    </div>
  );
}
