import React, { Fragment, useState } from "react";
import { Typography, Button } from "@material-ui/core/";
import Card from "./Card";
import AddCard from "./AddCard";

function SingleDeckViewer(props) {
  const [currentView, changeCurrentView] = useState("viewCards");
  const [viewComponents, changeViewComponents] = useState("");
  const addCard = () => {
    changeCurrentView("addCard");
  };
  console.log(props.deckInfo);

  if (currentView === "viewCards") {
    changeViewComponents(
      <Fragment>
        <Typography>Cards</Typography>
        {props.deckInfo.map((card, index) => {
          return <Card key={index} cardInfo={card} />;
        })}
        <Button onClick={addCard}>Add new card</Button>
      </Fragment>
    );
    changeCurrentView("");
  } else if (currentView === "addCard") {
    changeViewComponents(<AddCard />);
    changeCurrentView("");
  }
  return (
    <Fragment>
      <Button onClick={props.goHome}>GO HOME</Button>
      {viewComponents}
    </Fragment>
  );
}

export default SingleDeckViewer;
