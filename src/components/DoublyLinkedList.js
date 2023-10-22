import { useEffect, useState } from "react"

class DoublyLinkedListNode {
  constructor(data, next, prev) {
    this.data = data
    this.next = next
    this.prev = prev
  }
}

function DoublyLinkedList() {
  const [tail, setTail] = useState(null)
  const [head, setHead] = useState(null)
  const [render, setRender] = useState(false)

  const data = [1, 2, 3, 4]

  let currentHead = head
  let currentTail = tail

  useEffect(() => { initialiseDoublyLinkedList() }, [])

  const initialiseDoublyLinkedList = () => {
    if (data.length === 0) return
    for (let i = 0; i < data.length; i++) {
      if (currentHead === null && currentTail === null) {
        insertIntoEmptyList(data[i])
      }
      else {
        const newNode = new DoublyLinkedListNode(data[i], null, currentTail)
        currentTail.next = newNode
        currentTail = newNode
      }
    }
    setHead(currentHead)
    setTail(currentTail)
  }

  const insertIntoEmptyList = (data) => {
    const newNode = new DoublyLinkedListNode(data, null, null)
    currentHead = newNode
    currentTail = newNode
  }

  const insertAtBeginning = (data) => {
    if (currentHead === null && currentTail === null) {
      insertIntoEmptyList(data)
    } else {
      const newNode = new DoublyLinkedListNode(data, currentHead, null)
      currentHead.prev = newNode
      currentHead = newNode
    }
    setHead(currentHead)
    setTail(currentTail)
  }

  const insertAtEnd = (data) => {
    if (currentHead === null && currentTail === null) {
      insertIntoEmptyList(data)
    } else {
      const newNode = new DoublyLinkedListNode(data, null, currentTail)
      currentTail.next = newNode
      currentTail = newNode
    }
    setHead(currentHead)
    setTail(currentTail)
  }

  const insertBefore = (data, position) => {
    if (head === null && tail === null) {
      insertIntoEmptyList(data)
    } else {
      let currentNode = currentHead
      let currentPos = 0
      while (currentNode !== null && currentPos < position) {
        currentNode = currentNode.next
        currentPos++
      }
      if (currentPos === position) {
        if (currentNode.prev === null) {
          insertAtBeginning(data)
        } else if (currentNode.prev !== null && currentNode.next !== null) {
          const newNode = new DoublyLinkedListNode(data, currentNode, currentNode.prev)
          currentNode.prev.next = newNode
          currentNode.prev = newNode
        } else {
          insertIntoEmptyList(data)
        }
      }
    }
    setHead(currentHead)
    setTail(currentTail)
  }

  const deleteAt = (position) => {
    if (currentHead === null && currentTail === null) return
    let currentNode = currentHead
    let currentPos = 0
    while (currentNode !== null && currentPos < position) {
      currentNode = currentNode.next
      currentPos++
    }
    if (position === currentPos) {
      if (currentNode.next === null && currentNode.prev === null) {
        currentHead = null
        currentTail = null
      } else if (currentNode.prev === null) {
        currentNode.next.prev = null
        currentHead = currentNode.next
      } else if (currentNode.next === null) {
        currentNode.prev.next = null
        currentTail = currentNode.prev
      } else {
        currentNode.next.prev = currentNode.prev
        currentNode.prev.next = currentNode.next
      }
    }
    setHead(currentHead)
    setTail(currentTail)
  }

  const reverse = () => {
    let currentNode = currentHead
    while (currentNode !== null) {
      const temp = currentNode.next
      currentNode.next = currentNode.prev
      currentNode.prev = temp
      if (currentNode.next === null) {
        currentTail = currentNode
      } else if (currentNode.prev === null) {
        currentHead = currentNode
      }
      currentNode = temp
    }
    setHead(currentHead)
    setTail(currentTail)
  }

  const makeUnique = () => {
    if (currentHead === null && currentTail === null) return
    const data = new Set()
    let currentNode = currentHead
    while (currentNode !== null) {
      if (data.has(currentNode.data)) {
        if (currentNode.next === null) {
          // delete last element
          currentNode.prev.next = null
          currentTail = currentNode.prev
          currentNode = null
        } else if (currentNode.prev === null) {
          // delete first element
          currentNode.next.prev = null
          currentHead = currentNode.next
          currentNode = currentHead
        } else {
          currentNode.prev.next = currentNode.next
          currentNode.next.prev = currentNode.prev
          currentNode = currentNode.next
          setRender(!render)
        }
      } else {
        data.add(currentNode.data)
        currentNode = currentNode.next
      }
    }
    setHead(currentHead)
    setTail(currentTail)
  }

  const print = () => {
    let currentNode = currentHead
    while (currentNode !== null) {
      console.log(currentNode.data)
      currentNode = currentNode.next
    }
  }

  const renderList = () => {
    let currentNode = currentHead
    const elements = []
    let currentPos = 0
    while (currentNode !== null) {
      const element = <li className="flex flex-col border-2 border-black rounded-md p-4 m-1" key={currentPos}>
        <p>Data: {currentNode.data}</p>
        <p>Next: {currentNode.next ? currentNode.next.data : "null"}</p>
        <p>Prev: {currentNode.prev ? currentNode.prev.data : "null"}</p>
      </li>
      elements.push(element)
      currentNode = currentNode.next
      currentPos++
    }
    return <ul className="flex flex-row flex-wrap flex-shrink">{elements}</ul>
  }

  return (
    <div className="p-4 flex flex-col justify-center items-center">
      <h2 className="p-6">Doubly Linked List</h2>
      <div className="flex flex-row w-[70vw]">
        <div className="flex flex-wrap w-[70%]">
          {renderList()}
        </div>
        <div className="flex flex-col w-[30%]">
          <h3 className="m-2">Functions</h3>
          <button onClick={() => insertAtBeginning(100)}>Insert at Beginning</button>
          <button onClick={() => insertAtEnd(2)}>Insert at End</button>
          <button onClick={() => insertBefore(100, 0)}>Insert Before</button>
          <button onClick={() => deleteAt(0)}>Delete At</button>
          <button onClick={reverse}>Reverse</button>
          <button onClick={makeUnique}>Make Unique</button>
          <button onClick={print}>Print</button>
        </div>
      </div>
    </div>
  )
}

export default DoublyLinkedList;