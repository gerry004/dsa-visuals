import { useEffect, useState, useRef } from "react"

class DoublyLinkedListNode {
  constructor(data, next, prev) {
    this.data = data
    this.next = next
    this.prev = prev
  }
}

function DoublyLinkedList() {
  const insertAtBeginningRef = useRef(null)
  const insertAtEndRef = useRef(null)
  const insertBeforeDataRef = useRef(null)
  const insertBeforePositionRef = useRef(null)
  const deleteAtRef = useRef(null)

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

  const insertAtBeginning = () => {
    const data = parseInt(insertAtBeginningRef.current.value)
    if (isNaN(data)) return
    if (currentHead === null && currentTail === null) {
      insertIntoEmptyList(data)
    } else {
      const newNode = new DoublyLinkedListNode(data, currentHead, null)
      currentHead.prev = newNode
      currentHead = newNode
    }
    setHead(currentHead)
    setTail(currentTail)
    insertAtBeginningRef.current.value = ""
  }

  const insertAtEnd = () => {
    const data = parseInt(insertAtEndRef.current.value)
    if (isNaN(data)) return
    if (currentHead === null && currentTail === null) {
      insertIntoEmptyList(data)
    } else {
      const newNode = new DoublyLinkedListNode(data, null, currentTail)
      currentTail.next = newNode
      currentTail = newNode
    }
    setHead(currentHead)
    setTail(currentTail)
    insertAtEndRef.current.value = ""
  }

  const insertBefore = () => {
    const data = parseInt(insertBeforeDataRef.current.value)
    const position = parseInt(insertBeforePositionRef.current.value)
    if (isNaN(data) || isNaN(position)) return
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
    setRender(!render)
    insertBeforeDataRef.current.value = ""
    insertBeforePositionRef.current.value = ""
  }

  const deleteAt = () => {
    const position = parseInt(deleteAtRef.current.value)
    if (isNaN(position)) return
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
    setRender(!render)
    deleteAtRef.current.value = ""
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
        }
      } else {
        data.add(currentNode.data)
        currentNode = currentNode.next
      }
    }
    setHead(currentHead)
    setTail(currentTail)
    setRender(!render)
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
    return <ul className="grid grid-cols-6">{elements}</ul>
  }

  return (
    <div className="p-4 flex flex-col justify-center items-center">
      <div className="flex flex-row lg:w-[70vw]">
        <div className="flex flex-col w-[70%]">
          <h3 className="m-2">Doubly Linked List</h3>
          {renderList()}
        </div>
        <div className="flex flex-col flex-wrap max-w-[30%]">
          <h3 className="m-2">Functions</h3>
          <div className="flex my-2">
            <input
              className="w-[50%] border-2 border-primary rounded-l-md p-2"
              ref={insertAtBeginningRef}
              placeholder="data"
              type="number"
            />
            <button className="flex-1 p-2 bg-primary text-white rounded-r-md" onClick={insertAtBeginning}>Insert at Start</button>
          </div>
          <div className="flex">
            <input
              className="w-[50%] border-2 border-primary rounded-l-md p-2"
              ref={insertAtEndRef}
              placeholder="data"
              type="number"
            />
            <button className="flex-1 p-2 bg-primary text-white rounded-r-md" onClick={insertAtEnd}>Insert at End</button>
          </div>
          <div className="flex my-2">
            <input
              className=" w-[25%] border-2 border-primary rounded-l-md p-2"
              ref={insertBeforeDataRef}
              placeholder="data"
              type="number"
            />
            <input
              className="w-[25%] border-y-2 border-primary p-2"
              ref={insertBeforePositionRef}
              placeholder="position"
              type="number"
            />
            <button className="flex-1 p-2 bg-primary text-white rounded-r-md" onClick={insertBefore}>Insert Before</button>
          </div>
          <div className="flex my-2">
            <input
              className="w-[50%] border-2 rounded-l-md border-primary p-2"
              ref={deleteAtRef}
              placeholder="position"
              type="number"
            />
            <button className="flex-1 p-2 bg-primary text-white rounded-r-md" onClick={deleteAt}>Delete At</button>
          </div>
          <div className="flex items-center mb-2">
            <button className="flex-1 p-2 bg-primary text-white rounded-md" onClick={reverse}>Reverse</button>
          </div>
          <div className="flex items-center mb-2">
            <button className="flex-1 p-2 bg-primary text-white rounded-md" onClick={makeUnique}>Make Unique</button>
          </div>
          <div className="flex items-center mb-2">
            <button className="flex-1 p-2 bg-primary text-white rounded-md" onClick={print}>Print</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DoublyLinkedList;