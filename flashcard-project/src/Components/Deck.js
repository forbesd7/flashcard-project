import React, { useState, useEffect } from "react";
import axios from "axios";
import { Typography, withStyles, Grid } from "@material-ui/core/";

const styles = theme => ({
  Deck: {
    "&:hover": {
      cursor: "pointer"
    }
  }
});
function Deck(props) {
  const [cards, updateCards] = useState("");
  const getDeckInfo = deckName => {
    axios.get(`api/getDeck?deckName=${deckName}`).then(res => {
      updateCards(res.data);
    });
  };
  const { showDeck, deck } = props;
  useEffect(() => {
    if (cards !== "") {
      showDeck(cards, deck);
    }
  }, [cards, showDeck, deck]);

  return (
    <Grid item xs={12}>
      <Typography
        className={props.classes.Deck}
        onClick={() => getDeckInfo(props.deck)}
      >
        {props.deck}
      </Typography>
    </Grid>
  );
}

export default withStyles(styles)(Deck);
