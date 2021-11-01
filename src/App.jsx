/* src/App.jsx */
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import AudioVisualizer from "./Components/AudioVisualizer";
import HomePage from "./Components/HomePage";


function App() {
  return (
    <Router>
      <div className="flex justify-center bg-cover bg-no-repeat h-scren w-screen">
        <Switch>
          <Route path='/' exact component={HomePage} />
          <Route path='/visual-stories' exact component={AudioVisualizer} />
        </Switch>
      </div>
    </Router>

  );
}

export default App;