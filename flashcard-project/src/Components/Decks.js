import React, { Component, Fragment } from "react";
import { Button, Input } from "@material-ui/core/";
import axios from "axios";
import Deck from "./Deck";
import CardViewer from "./SingleDeckViewer";

import "../stylesheets/Decks.css";

export default class Decks extends Component {
  constructor() {
    super();
    this.state = {
      userInput: "",
      currentDecks: [],
      currentView: "allDeckViewer",
      deck: ""
    };
  }

  componentDidMount() {
    this.getDecks();
  }

  getDecks = () => {
    axios.get("/api/getDecks").then(res => {
      this.setState(prevState => ({ currentDecks: res.data }));
    });
  };

  updatePage = () => {
    this.getDecks();
  };

  makeNewDeck = () => {
    axios
      .post("/api/addDeck", {
        deckName: this.state.userInput
      })
      .then(res => {
        console.log(this.state);
      });
    const currDecks = this.state.currentDecks;
    currDecks.push(this.state.userInput);
    this.setState({ currentDecks: currDecks, userInput: "" });
  };

  updateUserDeckName = event => {
    this.setState({ userInput: event.target.value });
  };

  showDeck = deckInfo => {
    this.setState({
      deck: <CardViewer goHome={this.goHome} deckInfo={deckInfo} />
    });
    this.setState({ currentView: "singleDeckViewer" });
  };

  goHome = () => {
    this.setState({ currentView: "allDeckViewer" });
  };

  render() {
    //select which view will be shown
    let view;
    if (this.state.currentView === "allDeckViewer") {
      view = (
        <Fragment>
          <Input
            value={this.state.userInput}
            onChange={e => this.updateUserDeckName(e)}
          ></Input>
          <Button
            onClick={this.makeNewDeck}
            variant="contained"
            color="primary"
          >
            Make new Deck
          </Button>
          {this.state.currentDecks.map((deck, index) => {
            return <Deck key={index} showDeck={this.showDeck} deck={deck} />;
          })}
        </Fragment>
      );
    } else if (this.state.currentView === "singleDeckViewer") {
      view = this.state.deck;
    }
    return <Fragment> {view}</Fragment>;
  }
}
