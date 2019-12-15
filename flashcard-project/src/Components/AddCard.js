import React, { Fragment, useState } from "react";
import { TextField, Button, Container, Box } from "@material-ui/core";
import axios from "axios";

const AddCard = () => {
  const [cardFront, changeCardFront] = useState("");
  const [cardBack, changeCardBack] = useState("");

  const recordCardBackInput = event => {
    changeCardFront(event.target.value);
    console.log(cardFront);
  };

  const recordCardFrontInput = event => {
    changeCardBack(event.target.value);
    console.log(cardBack);
  };

  const addCardToDeck = (cardFront, cardBack) => {
    axios.post("/api/addCard", {
      front: cardFront,
      back: cardBack
    });
  };

  return (
    <Fragment>
      <Container>
        <Box flexDirection="column" width={300} marginTop={10}>
          <TextField
            onChange={e => recordCardBackInput(e)}
            label="Front"
            variant="outlined"
          ></TextField>
          <TextField
            onChange={e => recordCardFrontInput(e)}
            label="Back"
            variant="outlined"
          ></TextField>
          <Button
            onClick={() => addCardToDeck(cardFront, cardBack)}
            variant="contained"
            color="primary"
          >
            Add new card
          </Button>
        </Box>
      </Container>
    </Fragment>
  );
};

export default AddCard;
