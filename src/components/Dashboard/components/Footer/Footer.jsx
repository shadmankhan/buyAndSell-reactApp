import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  appBar: {
    top: "auto",
    bottom: 0,
    position: "fixed",
  },
  grow: {
    flexGrow: 1,
  },
  mainText: {
    position: "absolute",
    zIndex: 1,
    left: 0,
    right: 0,
    margin: "0 auto",
    textAlign: "center",
  },
}));

function Footer() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar className={classes.appBar}>
        <Toolbar>
          <Grid className={classes.mainText}>
            <Typography>Created by: Shadman A Khan</Typography>
          </Grid>
          {/*<div className={classes.grow} />*/}
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}

export default Footer;
