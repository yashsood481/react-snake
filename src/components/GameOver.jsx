import React from "react";

const GameOver = ({ setScore, setAppState, setGameOver, score }) => {
  return (
    <div className="flex justify-center items-center text-center h-96 border border-purple-700 p-10">
      <div>
        <h1 className="font-medium leading-tight text-5xl mt-0 mb-2 text-purple-700 ">
          Game Over!
        </h1>

        <h2 className="font-medium leading-tight text-5xl mt-0 mb-2 text-purple-700 mb-20">
          Your score was {score} eggs.
        </h2>

        <button
          onClick={() => {
            setScore(0);
            setGameOver(false);
          }}
          className="p-2 mr-2 bg-purple-700 border-1 border-purple-900 rounded text-lg text-white"
        >
          Play again
        </button>

        <button
          onClick={() => setAppState("menu")}
          className="p-2 bg-purple-700 border-1 border-purple-900 rounded text-lg text-white"
        >
          Back to menu
        </button>
      </div>
    </div>
  );
};

export default GameOver;
