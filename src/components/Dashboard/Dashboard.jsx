import React, { Component } from "react";
import { Grid } from "@material-ui/core";
import Navbar from "./components/Navbar";
import ProductHome from "./components/ProductHome";
import Footer from "./components/Footer";
import { withStyles } from "@material-ui/core/styles";

const styles = (theme) => ({
  root: {
    overflowX: "hidden",
  },
});

export class Dashboard extends Component {

  async componentDidMount() {
    await this.props.setCountryStateCityData();
  }

  render() {
    const { classes, history } = this.props;
    return (
      <Grid container className={classes.root}>
        <Grid item xs={12}>
          <Navbar history={history} />
        </Grid>
        <Grid item xs={12}>
          <ProductHome />
        </Grid>
        {/*<Grid item>
          <Footer />
        </Grid>*/}
      </Grid>
    );
  }
}

export default withStyles(styles)(Dashboard);
