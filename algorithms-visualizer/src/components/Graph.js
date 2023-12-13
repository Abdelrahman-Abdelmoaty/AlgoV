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
    const printMat = () => {
        if (nodes.length == 0){
            console.log('no nodes');
            return;
        }
        console.log(adjMat.length, adjMat[0].length)
        adjMat.forEach(row => {
            let str = '';
            row.forEach(val => str += val + ' ')
            console.log(str);
        })
    }
    const removeNode = (node) => {
        const idx = nodes.findIndex(n => n.id === node)
        const newMat = [...adjMat]
        newMat.splice(idx, 1)
        newMat.forEach(row => row.splice(idx, 1))
        setAdjMat(newMat)
        setNodes(nodes.filter(n => n.id !== node))
    };
    const createEdge = (node1, node2) => {
        const idx1 = nodes.findIndex(n => n.id === node1)
        const idx2 = nodes.findIndex(n => n.id === node2)
        const newAdjMat = [...adjMat]
        newAdjMat[idx1][idx2] = 1;
        newAdjMat[idx2][idx1] = 1;
    }
    const removeEdge = (node1, node2)=>{
        const idx1 = nodes.findIndex(n => n.id === node1)
        const idx2 = nodes.findIndex(n => n.id === node2)
        const newAdjMat = [...adjMat]
        newAdjMat[idx1][idx2] = 0;
        newAdjMat[idx2][idx1] = 0;
    }
    
    return <div>
        <input value={newNode} onChange={(e) => setNewNode(e.target.value)} /> 
        <hr />
        <button onClick={() => addNode(+newNode)}>Add Node</button>
        <hr />
        <button onClick={printMat}>Print</button>
        <hr />
        <button onClick={() => removeNode(+newNode)}>Remove node</button>
    </div>
}