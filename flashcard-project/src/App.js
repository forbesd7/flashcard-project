import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import Decks from "./Components/Decks";
import HomeScreen from "./Components/HomeScreen";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/homescreen" component={HomeScreen}></Route>
        <Route path="/" component={Decks}></Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
