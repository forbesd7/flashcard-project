import React, { Component, Fragment } from "react";
import { Button, Input, Grid } from "@material-ui/core/";
import axios from "axios";
import Deck from "./Deck";
import SingleDeckViewer from "./SingleDeckViewer";

import "../stylesheets/Decks.css";

const styles = theme => ({
  container: {
    width: "100vw",
    height: "100vh",
    background: "black"
  }
});

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
      console.log("got decks");
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

  showDeck = (cards, deckName) => {
    this.setState({
      deck: (
        <SingleDeckViewer
          deckName={deckName}
          goHome={this.goHome}
          cards={cards}
        />
      )
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
        <Grid container justify="center" alignItems="center">
          {this.state.currentDecks.map((deck, index) => {
            return <Deck key={index} showDeck={this.showDeck} deck={deck} />;
          })}
        </Grid>
      );
    } else if (this.state.currentView === "singleDeckViewer") {
      view = this.state.deck;
    }
    return <Fragment> {view}</Fragment>;
  }
}

/*
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
*/
