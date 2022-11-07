import { useState } from "react";
import "./App.css";
import GameOver from "./components/GameOver";
import GameTile from "./components/GameTile";
import MainMenu from "./components/MainMenu";

function App() {
  const [appState, setAppState] = useState("menu");
  return (
    <div className="flex justify-center items-center h-screen">
      {appState === "menu" && <MainMenu setAppState={setAppState} />}
      {appState === "game" && <GameTile setAppState={setAppState} />}
      {appState === "over" && <GameOver setAppState={setAppState} />}
    </div>
  );
}

export default App;
