import { useState, useEffect } from "react";

export default function App() {
  const [boxes, setBoxes] = useState(() => generateBoxes());
  const [playerMoves, setPlayerMoves] = useState({
    playerOne: [],
    playerTwo: []
  });
  const [playerOneMove, setPlayerOneMove] = useState(true)
  const [playerTwoMove, setPlayerTwoMove] = useState(false)
  const [gameOver, setGameOver] = useState(false)
  const [playerWon, setPlayerWon] = useState(false)
  const [message, setMessage] = useState("")

  function generateBoxes() {
    return Array.from({ length: 9 }, (_, i) => ({
      text: null,
      active: false,
      id: i + 1
    }));
  }

  const winningCombos = [
    [1, 2, 3], // top row
    [4, 5, 6], // middle row
    [7, 8, 9], // bottom row
    [1, 4, 7], // left column
    [2, 5, 8], // middle column
    [3, 6, 9], // right column
    [1, 5, 9], // diagonal top-left → bottom-right
    [3, 5, 7]  // diagonal top-right → bottom-left
  ];

  useEffect(() => {

      const playerOneWon = winningCombos.some(combo =>
        combo.every(num => playerMoves.playerOne.includes(num))
      );
      const playerTwoWon = winningCombos.some(combo =>
        combo.every(num => playerMoves.playerTwo.includes(num))
      );

      playerOneWon ? setMessage("Player One Wins") : setMessage ("Player Two Wins")

      if (playerOneWon || playerTwoWon) {
        setPlayerWon(true)
      }

    }, [playerMoves]) 

  useEffect(() => {
    if (gameOver) {
      setBoxes(generateBoxes())
      setPlayerOneMove(true)
      setPlayerTwoMove(false)
      setGameOver(false)
      setPlayerMoves({
        playerOne: [],
        playerTwo: []
      })
    }
      setPlayerWon(false)
      setMessage("")
  }, [gameOver])


  function toggleBox (id) {

    playerOneMove ? setPlayerOneMove(false) : setPlayerOneMove(true)
    playerTwoMove ? setPlayerTwoMove(false) : setPlayerTwoMove(true)

    setPlayerMoves(prev => ({
      ...prev,
      playerOne: playerOneMove ? [...prev.playerOne, id] : prev.playerOne,
      playerTwo: !playerOneMove ? [...prev.playerTwo, id] : prev.playerTwo
    }));

    setBoxes(prev => 
      prev.map(box =>
        box.id === id
          ? {...box, text: playerOneMove ? "X" : "O", active: !box.active}
          : box
      )
    )
  }

  const boxElements = boxes.map((box, index) => 
    <button className="box" 
            key={index}
            onClick={() => toggleBox(box.id)}
            disabled={box.active === true || playerWon}>
          {box.text}
    </button>
  )

  return (
    <div>
      <p>Welcome to the Tic Tac Toe game!</p>

      <div className="container">
        {boxElements}
      </div>


      {playerWon && 
        <>
          <p>The game is over!</p>
          <button onClick={() => setGameOver(true)}>Start New Game</button>
        </>
      }
      {playerWon && message}

    </div>
  );
}