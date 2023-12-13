import { useState } from "react";
/*
    Node:
    {
        id: int,

    }


*/
export default function () {
    const [nodes, setNodes] = useState([]);
    const [adjMat, setAdjMat] = useState([]);
    const [newNode, setNewNode] = useState('');

    const addNode = (id) => {
        const lastRow = []
        for (let i = 0; i < nodes.length; i++) lastRow.push(0);
        const newAdjMat = [...adjMat, lastRow];
        for (let i = 0; i < newAdjMat.length; i++) {
            newAdjMat[i].push(0);
        }
        setAdjMat(newAdjMat)
        setNodes([...nodes, { id }])
    }
    // for undirected graph
    const createEdge = (node1, node2) => {
        const newAdjMat = [...adjMat]
        newAdjMat[node1][node2] = 1;
        newAdjMat[node2][node1] = 1;
    }
    const printMat = () => {
        console.log(adjMat.length, adjMat[0].length)
        adjMat.forEach(row => {
            let str = '';
            row.forEach(val => str += val + ' ')
            console.log(str);
        })
    }
    return <div>
        <input value={newNode} onChange={(e) => setNewNode(e.target.value)} />
        <button onClick={() => addNode(+newNode)}>Add Node</button>
        <button onClick={printMat}>Print</button>
    </div>
}