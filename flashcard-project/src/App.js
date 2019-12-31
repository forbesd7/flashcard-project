import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import Decks from "./Components/Decks";
import HomeScreen from "./Components/HomeScreen";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/decks" component={Decks}></Route>
          <Route path="/" component={HomeScreen}></Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
