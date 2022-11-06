import { useState } from "react";
import "./App.css";
import GameTile from "./components/GameTile";

function App() {
  return (
    <div className="flex justify-center items-center h-screen">
      <GameTile />
    </div>
  );
}

export default App;
