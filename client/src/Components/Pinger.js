import React, { Component } from 'react'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography' 
import axios from 'axios'

export default class Pinger extends Component {
    constructor() {
        super();
        this.state = {
            pong: "pending"
        }
    }
    
    componentWillMount() {
      axios.get('api/ping')
          .then((response) => {
              this.setState(() => {
                  return { pong: response.data.message }
              })
          })
          .catch(function (error) {
              console.log(error);
          });
    
    }

    render() {
        return (
            <div>
                <Typography variant='display1' align='left' gutterBottom>        {this.state.pong}      </Typography>                 
                
                <Button variant="contained" color="primary"> 
                    Hello World
                </Button>

                
            </div>
        )
    }
}

