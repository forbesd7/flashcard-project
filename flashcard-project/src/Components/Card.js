import React, { Fragment } from "react";
import { Typography } from "@material-ui/core";

const Card = props => {
  return (
    <Fragment>
      <Typography> {props.cardInfo.front}</Typography>
      <Typography> {props.cardInfo.back}</Typography>
    </Fragment>
  );
};

export default Card;
