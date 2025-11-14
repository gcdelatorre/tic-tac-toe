import { useState, useEffect } from "react";
import Box from "./components/Box";

export default function App() {

  {/* STATES */}

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
  const [isRunning, setIsRunning] = useState(false)

  {/* CONSTANT DATAS */}

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

  
  {/* USE EFFECTS */}

  useEffect(() => {
      const playerOneWon = winningCombos.some(combo =>
        combo.every(num => playerMoves.playerOne.includes(num))
      );
      const playerTwoWon = winningCombos.some(combo =>
        combo.every(num => playerMoves.playerTwo.includes(num))
      );
      const draw = boxes.every(box => box.active === true);

      playerOneWon ? setMessage("Player One Wins") : draw ? setMessage("It's a Draw") : playerTwoWon ? setMessage("Player Two Wins") : setMessage("")

      if (playerOneWon || playerTwoWon || draw) {
        setGameOver(true)
      }
    }, [playerMoves]) 

  useEffect(() => {
    if (isRunning) {
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
      setIsRunning(false)
  }, [isRunning])

  {/* FUNCTIONS */}

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

  function generateBoxes() {
    return Array.from({ length: 9 }, (_, i) => ({
      text: null,
      active: false,
      id: i + 1
    }));
  }

  function handleRestart() {
    setIsRunning(prev => !prev)
  }

  // BOX RENDER

  const boxElements = boxes.map((box, index) => 
    <Box key={index} box={box} toggleBox={() => toggleBox(box.id)} playerWon={playerWon} gameOver={gameOver}/>
  )

  return (
    <div className="main-container">
      <p className="title">Tic Tac Toe</p>

      <p className="player-turn">
        {gameOver ? "" : playerOneMove ? "Player (X) Turn" : "Player (O) Turn"}
      </p>

      <div className="container">
        {boxElements}
      </div>

      {gameOver &&
        <>
          <p className="game-over-message">The game is over!</p>
          <p className="game-over-message">{message}</p>
          <button className="restart-button" onClick={handleRestart}>Restart Game</button>
        </>
      }

    </div>
  );
}