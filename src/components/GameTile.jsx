import React, { useEffect, useReducer, useState } from "react";
import GameOver from "./GameOver";
import Tile from "./Tile";

const MATRIX_SIZE = 20;

const GameTile = ({ setAppState }) => {
  const tiles = [];
  const initialSnakeArray = [
    {
      row: 1,
      col: 1,
    },
  ];
  const getRandomGridTile = (gridSize) => {
    return Math.floor(Math.random() * gridSize + 1);
  };
  const setNewEggPostion = () => {
    setEggPosCol(getRandomGridTile(MATRIX_SIZE));
    setEggPosRow(getRandomGridTile(MATRIX_SIZE));
  };
  const reset = () => {
    setGameOver(true);
    return initialSnakeArray;
  };
  const didSnakeCollideWithItself = (snakeArray) => {
    const copiedArray = [...snakeArray];
    const updatedSnakeHead = copiedArray[0];
    copiedArray.shift();
    return copiedArray.some(
      (pos) =>
        pos.row === updatedSnakeHead.row && pos.col === updatedSnakeHead.col
    );
  };
  const [gameOver, setGameOver] = useState(false);
  const [currentDir, setCurrentDir] = useState("right");
  const [score, setScore] = useState(0);
  const [eggPosRow, setEggPosRow] = useState(getRandomGridTile(MATRIX_SIZE));
  const [eggPosCol, setEggPosCol] = useState(getRandomGridTile(MATRIX_SIZE));

  const snakePosReducer = (state, action) => {
    const currentSnake = [...state];
    const snakeHead = currentSnake[0];
    const snakeTail = currentSnake.pop();
    const didEatApple =
      snakeHead.row === eggPosRow && snakeHead.col === eggPosCol;
    if (didEatApple) {
      setNewEggPostion();
      setScore((score) => score + 1);
      currentSnake.push(snakeTail);
    }
    switch (action.type) {
      case "left":
        if (snakeHead.col - 1 < 1) {
          return reset();
        }
        currentSnake.unshift({ row: snakeHead.row, col: snakeHead.col - 1 });
        if (didSnakeCollideWithItself(currentSnake)) return reset();
        setCurrentDir("left");
        return currentSnake;

      case "right":
        if (snakeHead.col + 1 > MATRIX_SIZE) {
          return reset();
        }
        currentSnake.unshift({ row: snakeHead.row, col: snakeHead.col + 1 });
        if (didSnakeCollideWithItself(currentSnake)) return reset();

        setCurrentDir("right");
        return currentSnake;
      case "up":
        if (snakeHead.row - 1 < 1) {
          return reset();
        }
        currentSnake.unshift({ row: snakeHead.row - 1, col: snakeHead.col });
        if (didSnakeCollideWithItself(currentSnake)) return reset();

        setCurrentDir("up");
        return currentSnake;
      case "down":
        if (snakeHead.row + 1 > MATRIX_SIZE) {
          return reset();
        }
        currentSnake.unshift({ row: snakeHead.row + 1, col: snakeHead.col });
        if (didSnakeCollideWithItself(currentSnake)) return reset();

        setCurrentDir("down");
        return currentSnake;
      default:
        return;
    }
  };
  const [snakePosArray, dispatch] = useReducer(
    snakePosReducer,
    initialSnakeArray
  );

  // creating tiles
  let totalTiles = 0;
  for (let i = 1; i <= MATRIX_SIZE; i++) {
    for (let j = 1; j <= MATRIX_SIZE; j++) {
      totalTiles++;
      tiles.push(
        <Tile
          key={totalTiles}
          row={i}
          col={j}
          currentPos={snakePosArray}
          eggPosRow={eggPosRow}
          eggPosCol={eggPosCol}
        />
      );
    }
  }

  useEffect(() => {
    if (gameOver) {
      setCurrentDir("right");
      return;
    }
    // listen for keystroke
    document.addEventListener("keydown", keyPressedHandler, true);
    // set game tick rate
    const gameInterval = setInterval(() => {
      directionHandler(currentDir);
    }, 100);

    return () => {
      clearInterval(gameInterval);
      document.removeEventListener("keydown", () => {});
    };
  }, [currentDir, gameOver]);

  //handle movement keys
  const keyPressedHandler = (e) => {
    switch (e.key) {
      case "ArrowLeft":
        setCurrentDir("left");
        break;
      case "ArrowRight":
        setCurrentDir("right");
        break;
      case "ArrowUp":
        setCurrentDir("up");
        break;
      case "ArrowDown":
        setCurrentDir("down");
        break;
      default:
    }
  };

  // trigger snake position based on dir
  const directionHandler = (input) => {
    switch (input) {
      case "left":
        dispatch({ type: "left" });
        break;
      case "right":
        dispatch({ type: "right" });
        break;
      case "up":
        dispatch({ type: "up" });
        break;
      case "down":
        dispatch({ type: "down" });
        break;
      default:
        dispatch({ type: "right" });
    }
  };

  // setting css variable for creating grid
  useEffect(() => {
    const test = document.documentElement.style.setProperty(
      "--rows",
      MATRIX_SIZE
    );
  }, [MATRIX_SIZE]);
  return (
    <div className="grid-container w-fit h-fit">
      {!gameOver && score}
      {!gameOver && <div className="my-grid">{tiles}</div>}
      {gameOver && (
        <GameOver
          score={score}
          setScore={setScore}
          setGameOver={setGameOver}
          setAppState={setAppState}
        />
      )}
    </div>
  );
};

export default GameTile;
