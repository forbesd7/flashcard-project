import React, { Component } from 'react'
import Axios from 'axios';
import Button from '@material-ui/core/Button'


export default class Deck extends Component {
    constructor(props) {
        super(props)
        this.state = {
            cardFrontSides: [],
            cardBackSides: [],
        }
    }

    componentDidMount() {
        Axios.get('/api/getCards')
        .then(res => {

        })
    }

    makeNewCard = () => {

    }

    render() {
        return (
            <div>
                <h1>
                    {this.props.deck}
                </h1>

                <div>
                
                </div>

                <Button variant="contained" color="primary" onClick={this.makeNewCard}> 
                    Make new card
                </Button>
            </div>
        )
    }
}