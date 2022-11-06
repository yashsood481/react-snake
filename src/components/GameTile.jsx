import React, { useEffect, useReducer, useState } from "react";
import Tile from "./Tile";

const MATRIX_SIZE = 40;

const GameTile = () => {
  const tiles = [];
  const initialPosState = {
    row: 1,
    col: 1,
    dir: "right",
  };
  const posReducer = (state, action) => {
    switch (action.type) {
      case "left":
        if (state.col - 1 < 1) return { ...initialPosState };
        return { row: state.row, col: state.col - 1, dir: "left" };
      case "right":
        if (state.col + 1 > MATRIX_SIZE) return { ...initialPosState };
        return { row: state.row, col: state.col + 1, dir: "right" };
      case "up":
        if (state.row - 1 < 1) return { ...initialPosState };
        return { row: state.row - 1, col: state.col, dir: "up" };
      case "down":
        if (state.row + 1 > MATRIX_SIZE) return { ...initialPosState };
        return { row: state.row + 1, col: state.col, dir: "down" };
      case "ArrowLeft":
        return { row: state.row, col: state.col, dir: "left" };
        break;
      case "ArrowRight":
        return { row: state.row, col: state.col, dir: "right" };
        break;
      case "ArrowUp":
        return { row: state.row, col: state.col, dir: "up" };
        break;
      case "ArrowDown":
        return { row: state.row, col: state.col, dir: "down" };
        break;
      case "reset": {
        return { ...initialPosState };
      }
      default:
        return;
    }
  };
  const [currentPos, dispatch] = useReducer(posReducer, initialPosState);

  // creating tiles
  let totalTiles = 0;
  for (let i = 1; i <= MATRIX_SIZE; i++) {
    for (let j = 1; j <= MATRIX_SIZE; j++) {
      totalTiles++;
      tiles.push(
        <Tile key={totalTiles} row={i} col={j} currentPos={currentPos} />
      );
    }
  }

  // listen for keystroke
  useEffect(() => {
    document.addEventListener("keydown", keyPressedHandler, true);
  }, []);

  // set game tick rate
  useEffect(() => {
    const gameInterval = setInterval(
      () => directionHandler(currentPos.dir),
      100
    );

    return () => {
      clearInterval(gameInterval);
    };
  });

  const keyPressedHandler = (e) => {
    switch (e.key) {
      case "ArrowLeft":
        dispatch({ type: "ArrowLeft" });
        break;
      case "ArrowRight":
        dispatch({ type: "ArrowRight" });
        break;
      case "ArrowUp":
        dispatch({ type: "ArrowUp" });
        break;
      case "ArrowDown":
        dispatch({ type: "ArrowDown" });
        break;
      default:
    }
  };

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
      {currentPos.row} / {currentPos.col}
      <div className="my-grid">{tiles}</div>
    </div>
  );
};

export default GameTile;
