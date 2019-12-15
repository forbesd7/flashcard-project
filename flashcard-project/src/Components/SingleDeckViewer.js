import React, { Fragment } from "react";
import { Typography, Button } from "@material-ui/core/";
import Card from "./Card";

function SingleDeckViewer(props) {
  console.log(props.deckInfo);
  return (
    <Fragment>
      <Button onClick={props.goHome}>GO HOME</Button>
      <Typography>hey</Typography>
      {props.deckInfo.map((card, index) => {
        return <Card key={index} cardInfo={card} />;
      })}
    </Fragment>
  );
}

export default SingleDeckViewer;
