import React, { Fragment } from "react";
import { Typography } from "@material-ui/core/";

function Deck(props) {
  return (
    <Fragment>
      <Typography>{props.deck}</Typography>
    </Fragment>
  );
}

export default Deck;
