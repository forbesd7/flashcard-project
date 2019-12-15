import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import Decks from "./Components/Decks";
import DeckViewer from "./Components/DeckViewer";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={Decks}></Route>
        <Route path="/deck" component={DeckViewer}></Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
