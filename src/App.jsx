import { useState, useEffect } from "react";

export default function App() {
  return (
    <div>
      <h1>tic tac toe game</h1>

      <p>Welcome to the Tic Tac Toe game!</p>

      <div className="container">
        <button className="box"></button>
        <button className="box"></button>
        <button className="box"></button>
        <button className="box"></button>
        <button className="box"></button>
        <button className="box"></button>
        <button className="box"></button>
        <button className="box"></button>
        <button className="box"></button>
      </div>

      <h1></h1>
      <h1></h1>
      <h1></h1>
      <h1></h1>
      <h1></h1>
      <h1></h1>
      <h1></h1>
    </div>
  );
}