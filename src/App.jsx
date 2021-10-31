/* src/App.jsx */
import React from "react";
import "./App.css";
import AudioVisualizer from "./Components/AudioVisualizer";


function App() {
  return (
    <div className="flex justify-center bg-cover bg-no-repeat h-scren w-screen">
      <AudioVisualizer />
    </div>
  );
}

export default App;