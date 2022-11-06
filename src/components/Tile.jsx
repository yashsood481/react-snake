import React from "react";

const Tile = ({ row, col, currentPos, eggPosRow, eggPosCol }) => {
  const isSnakeTile = currentPos.row === row && currentPos.col === col;
  const isEggTile = eggPosRow === row && eggPosCol === col;

  return (
    <div
      className={` w-5 h-5 border border-black ${
        isSnakeTile ? "bg-red-400" : isEggTile ? "bg-green-300" : ""
      }`}
      data-row={row}
      data-col={col}
    ></div>
  );
};

export default Tile;
