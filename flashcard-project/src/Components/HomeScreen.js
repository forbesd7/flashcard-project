import React from "react";
import { Typography, Grid, withStyles } from "@material-ui/core";

const styles = theme => ({
  container: {
    width: "100vw",
    height: "100vw",
    background: "goldenrod"
  }
});
const HomeScreen = props => {
  return (
    <Grid className={props.classes.container} alignItems="center" container>
      <Grid item>
        <Typography>Study</Typography>
      </Grid>
      <Grid item>
        <Typography>Make Your Own Deck</Typography>
      </Grid>
      {/* <Grid item>
        <Typography>About</Typography>
      </Grid> */}
    </Grid>
  );
};

export default withStyles(styles)(HomeScreen);
