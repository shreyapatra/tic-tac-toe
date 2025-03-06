

import React, { useState, useRef } from "react";
import "./TicTacToe.css";
import circle_icon from "../Assets/circle.png";
import cross_icon from "../Assets/cross.png";

export const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(""));
  const [count, setCount] = useState(0);
  const [lock, setLock] = useState(false);
  const titleRef = useRef(null);

  const toggle = (index) => {
    if (lock || board[index] !== "") return; 
    const newBoard = [...board];
    newBoard[index] = count % 2 === 0 ? "x" : "o";
    setBoard(newBoard);
    setCount(prevCount => prevCount + 1);
    checkWin(newBoard);
  };

  const checkWin = (newBoard) => {
    const winningCombinations = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    for (let [a, b, c] of winningCombinations) {
      if (newBoard[a] && newBoard[a] === newBoard[b] && newBoard[a] === newBoard[c]) {
        won(newBoard[a]);
        return;
      }
    }

    if (!newBoard.includes("")) {
      draw();
    }
  };

  const won = (winner) => {
    setLock(true);
    titleRef.current.innerHTML = ` Congratulations! <img src=${winner === "x" ? cross_icon : circle_icon}> wins! 🎉`;
  };

  const draw = () => {
    setLock(true);
    titleRef.current.innerHTML = ` Ooops! Game Draw! 😢`;
  };

  const reset = () => {
    setLock(false);
    setBoard(Array(9).fill(""));
    setCount(0);
    titleRef.current.innerHTML = 'Tic Tac Toe Game In <span>React</span>';
  };

  return (
    <div className="container">
      <h1 className="title" ref={titleRef}>
        Tic Tac Toe Game In <span>React</span>
      </h1>
      <div className="board">
        {board.map((value, index) => (
          <div key={index} className="boxes" onClick={() => toggle(index)}>
            {value === "x" ? <img src={cross_icon} alt="X" /> : value === "o" ? <img src={circle_icon} alt="O" /> : ""}
          </div>
        ))}
      </div>
      <button className="reset" onClick={reset}>Reset</button>
    </div>
  );
};

export default TicTacToe;

