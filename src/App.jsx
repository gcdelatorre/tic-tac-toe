import { useState, useEffect } from "react";

export default function App() {
  const [boxes, setBoxes] = useState(() => generateBoxes());
  const [playerOneMove, setPlayerOneMove] = useState(true)
  const [playerTwoMove, setPlayerTwoMove] = useState(false)
  const [gameOver, setGameOver] = useState(false)


  function generateBoxes() {
    return Array.from({ length: 9 }, (_, i) => ({
      text: null,
      active: false,
      id: i + 1
    }));
  }

  useEffect(() => {
    if (gameOver) {
      setBoxes(generateBoxes())
      setPlayerOneMove(true)
      setPlayerTwoMove(false)
      setGameOver(false)
    }
  }, [gameOver])


  function toggleBox (id) {

    playerOneMove ? setPlayerOneMove(false) : setPlayerOneMove(true)
    playerTwoMove ? setPlayerTwoMove(false) : setPlayerTwoMove(true)

    setBoxes(prev => 
      prev.map(box =>
        box.id === id
          ? {...box, text: playerOneMove ? "X" : "O", active: !box.active}
          : box
      )
    )
  }

  console.log(boxes)

  const boxElements = boxes.map((box, index) => 
    <button className="box" 
            key={index}
            onClick={() => toggleBox(box.id)}
            disabled={box.active === true}>
          {box.text}
    </button>
  )

  return (
    <div>
      <p>Welcome to the Tic Tac Toe game!</p>

      <div className="container">
        {boxElements}
      </div>




    </div>
  );
}