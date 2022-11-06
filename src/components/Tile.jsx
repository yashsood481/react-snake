import React from "react";

const Tile = ({ row, col, currentPos }) => {
  return (
    <div
      className={` w-5 h-5 border border-black ${
        currentPos.row === row && currentPos.col === col ? "bg-red-400" : ""
      }`}
      data-row={row}
      data-col={col}
    ></div>
  );
};

export default Tile;
