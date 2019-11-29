import React, { Component } from 'react'
import Button from '@material-ui/core/Button'
import axios from 'axios';

export default class Deck extends Component {
    constructor(props) {
        super(props)
        this.deckName = React.createRef();
    }

    makeDeck = () => {
        axios.post('/api/makeDeck', {
            deckName: this.deckName.current.value
        }).then( res => console.log(res))
        console.log(this.deckName.current.value)
        this.props.updatePage();
        this.props.getDecks();
        this.props.goHome();

    }
    render() {
        return (
            <div>
                <input type="text"  ref={this.deckName}></input>
                <Button variant="contained" color="primary" onClick={this.makeDeck}> 
                    Make new deck
                </Button>
            </div>
        )
    }
}