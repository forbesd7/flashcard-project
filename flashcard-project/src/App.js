import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import Decks from "./Components/Decks";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={Decks}></Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
