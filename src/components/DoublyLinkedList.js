import { useEffect, useState } from "react"

function DoublyLinkedList() {
  const [nodes, setNodes] = useState([])

  const data = [1, 2]

  useEffect(() => { initialiseDoublyLinkedList() }, [])

  const initialiseDoublyLinkedList = () => {
    if (data.length === 0) return
    const nodes = []
    const initialNode = {
      data: data[0],
      next: null,
      prev: null
    }
    let currentNode = initialNode
    nodes.push(initialNode)
    for (let i = 1; i < data.length; i++) {
      const newNode = {
        data: data[i],
        next: null,
        prev: currentNode
      }
      currentNode.next = newNode
      currentNode = currentNode.next
      nodes.push(newNode)
    }
    setNodes(nodes)
  }
  const printList = () => {
    let head = nodes[0]
    let currentNode = head
    let currentPos = 0
    while (currentNode !== null) {
      console.log("element", currentPos, currentNode.next, currentNode.prev)
      currentNode = currentNode.next
      currentPos++
    }
  }

  const insertAtBeginning = () => {
    if (nodes.length === 0) {
      const data = 140
      const newNode = {
        data: data,
        next: null,
        prev: null
      }
      setNodes([newNode])
      return
    }
    const data = 140
    const head = nodes[0]
    const newNode = {
      data: data,
      next: head,
      prev: null
    }
    head.prev = newNode
    setNodes([newNode, ...nodes])
  }

  const insertAtEnd = () => {
    if (nodes.length === 0) {
      const data = 80
      const newNode = {
        data: data,
        next: null,
        prev: null
      }
      setNodes([newNode])
      return
    }
    const data = 80
    const tail = nodes[nodes.length - 1]
    const newNode = {
      data: data,
      next: null,
      prev: tail
    }
    tail.next = newNode
    setNodes([...nodes, newNode])
  }

  const insertBefore = () => {
    if (nodes.length === 0) return
    const position = 1
    const data = 100
    const head = nodes[0]
    let currentNode = head
    let currentPos = 0
    while (currentNode !== null && currentPos < position) {
      currentNode = currentNode.next
      currentPos++
    }
    if (currentNode != null && currentPos === position) {
      const newNode = {
        data: data,
        next: currentNode,
        prev: currentNode.prev
      }
      currentNode.prev.next = newNode
      currentNode.prev = newNode

      setNodes([...nodes.slice(0, position), newNode, ...nodes.slice(position)])
    }
  }

  const deleteAt = () => {
    if (nodes.length === 0) return
    const position = 0
    const head = nodes[0]
    let currentNode = head
    let currentPos = 0
    while (currentNode !== null && currentPos < position) {
      currentNode = currentNode.next
      currentPos++
    }
    if (position === currentPos) {
      if (currentNode.next === null && currentNode.prev === null) {
        setNodes([])
      } else if (currentNode.prev === null) {
        currentNode.next.prev = null
      } else if (currentNode.next === null) {
        currentNode.prev.next = null
      } else {
        currentNode.next.prev = currentNode.prev
        currentNode.prev.next = currentNode.next
      }
    }
    setNodes([...nodes.slice(0, position), ...nodes.slice(position + 1)])
  }

  const reverse = () => {
    console.log("reverse")
  }

  const makeUnique = () => {
    console.log("unique")
  }

  return (
    <div className="p-4 flex flex-col justify-center items-center">
      <h2 className="p-6">Doubly Linked List</h2>
      <div className="flex flex-row">
        <div className="flex flex-wrap justify-center items-center max-w-[70%]">
          {nodes.map((node, index) => <DoublyLinkedListNode key={index} node={node} index={index} />)}
        </div>
        <div className="flex flex-col max-w-[30%]">
          <h3 className="m-2">Functions</h3>
          <button onClick={insertAtBeginning}>Insert at Beginning</button>
          <button onClick={insertAtEnd}>Insert at End</button>
          <button onClick={insertBefore}>Insert Before</button>
          <button onClick={deleteAt}>Delete At</button>
          <button onClick={reverse}>Reverse</button>
          <button onClick={makeUnique}>Make Unique</button>
          <button onClick={printList}>Print List</button>
        </div>
      </div>
    </div>
  )
}

function DoublyLinkedListNode({ node, index }) {
  return (
    <div>
      <div className="flex flex-col p-6 m-2 justify-center items-center border-2 border-black rounded-sm">
        <p>Next: {node.next ? index + 1 : "null"}</p>
        <p className="font-bold text-2xl">Data: {node.data}</p>
        <p>Prev: {node.prev ? index - 1 : "null"}</p>
        <p>Index: {index}</p>
      </div>
    </div>
  )
}

export default DoublyLinkedList;