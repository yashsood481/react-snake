import React from "react";

const MainMenu = ({ setAppState }) => {
  return (
    <div className="flex justify-center items-center">
      <div>
        <h1>React Snake</h1>
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
