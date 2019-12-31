import React from "react";
import { Link } from "react-router-dom";
import { Button, Grid, withStyles } from "@material-ui/core";

const styles = theme => ({
  container: {
    width: "100vw",
    height: "100vh",
    background: "black"
  }
});
const HomeScreen = props => {
  return (
    <Grid
      className={props.classes.container}
      justify="center"
      alignItems="center"
      container
    >
      <Grid item>
        <Link to="/decks">
          <Button variant="contained" color="primary">
            Study
          </Button>
        </Link>
      </Grid>
      <Grid item>
        <Button variant="contained" color="primary">
          Make Your Own Deck
        </Button>
      </Grid>
      {/* <Grid item>
        <Typography>About</Typography>
      </Grid> */}
    </Grid>
  );
};

export default withStyles(styles)(HomeScreen);
