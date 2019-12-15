import React, { Component, Fragment } from "react";
import { Button, Input } from "@material-ui/core/";
import axios from "axios";
import Deck from "./Deck";
import "../stylesheets/Decks.css";

export default class Decks extends Component {
  constructor() {
    super();
    this.state = {
      userInput: "",
      currentDecks: []
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
      .post("/api/addCard", {
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

  render() {
    return (
      <Fragment>
        <Input
          value={this.state.userInput}
          onChange={e => this.updateUserDeckName(e)}
        ></Input>
        <Button onClick={this.makeNewDeck} variant="contained" color="primary">
          Make new Deck
        </Button>
        {this.state.currentDecks.map(deck => {
          return <Deck deck={deck} />;
        })}
      </Fragment>
    );
  }
}
