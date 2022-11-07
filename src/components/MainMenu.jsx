import React from "react";

const MainMenu = ({ setAppState }) => {
  return (
    <div className="flex justify-center items-center text-center border border-purple-700 w-1/2 h-96">
      <div>
        <h1 className="font-medium leading-tight text-5xl mt-0 mb-20 text-purple-700 ">
          React Snake
        </h1>
        <button
          onClick={() => setAppState("game")}
          className="p-2 bg-purple-700 border-1 border-purple-900 rounded text-lg text-white"
        >
          START
        </button>
      </div>
    </div>
  );
};

export default MainMenu;
