import React, { Component } from 'react'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography' 
import axios from 'axios'
import Deck from './Deck'
import DeckMaker from './DeckMaker'
import '../stylesheets/Decks.css'
export default class Decks extends Component {
    constructor() {
        super();
        this.state = {
            pong: "peending",
            decks: [],
            currentDeck: "",
        }
    }
    
    componentDidMount() {
      this.getDecks();
      axios.post('/api/add', 
      {
          "name": "derek"
      })
          .then((response) => {
              console.log(response.data.name)
              this.setState(() => {
                  return { pong: response.name }
              })
          })
          .catch(function (error) {
              console.log(error);
          });

    }
    updatePage = () => {
        this.getDecks();
    }
    getDecks = () => {

        axios.get('api/decks')
          .then(res => {
            let decks = res.data;
            decks = decks.replace("[", "")
            decks = decks.replace("]", "")
            decks = decks.split(' ')
            decks.pop();
            decks.pop();
            const newDeckList = decks;
            this.setState({decks: newDeckList})
            console.log(this.state)
          })

    }
    deckViewer = (deck) => {
        this.setState({currentDeck: <Deck deck={deck}/>})
    }

    goHome = () => {
        this.setState({currentDeck: ""})
    }

    openDeckMaker = () => {
        this.setState({currentDeck: "deckMaker"})
    }

    deleteDeck = (deck) => {
        axios.post('/api/deleteDeck', {
            "deckName": deck
        }).then(res => this.getDecks())
    }

    render() {
        let currentView;
        const decks = this.state.decks.map(deck => {
            return (
            <div className="deckViewer">
            <div className="deckName" onClick={() => this.deckViewer(deck)}>{deck}</div>

            <div className="deleteButton">
            <Button onClick={() => this.deleteDeck(deck)} variant="contained" color="primary" className="deckButton"> 
                    Delete
                </Button>
            </div>
            </div>
            )
        })
        if(this.state.currentDeck === "") {
            currentView = <div>
                 <Typography variant='display1' align='left' gutterBottom>        {this.state.pong}      </Typography>                 
                    
                <Button variant="contained" color="primary" onClick={this.openDeckMaker}> 
                    Make new deck
                </Button>

                <div>
                {decks}
                </div>
            </div>
        } else if(this.state.currentDeck === "deckMaker") {
            currentView = 
            <div>
                <DeckMaker updatePage={this.updatePage} getDecks={this.getDecks} goHome={this.goHome}  />
            </div>
        }
        else {
            currentView =  <div>
           <Button onClick={this.goHome} variant="contained" color="primary" > 
                    Go Home
                </Button>
            {this.state.currentDeck}
        </div>
        }
        
        return (
            <div>
                
                {currentView}
            </div>
        )
    }
}

