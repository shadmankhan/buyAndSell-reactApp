import React, { Component } from 'react';
import { Box, CircularProgress } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
const styles = theme => ({
  loader: {
    position: 'fixed',
    top: 'calc(50% - 20px)',
    left: 'calc(50% - 20px)',
    color: theme.palette.primary
  },
  loaderPanel: {
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    position: 'fixed',
    zIndex: 1500,
    backgroundColor: '#00000047'
  }
});

class AppLoader extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Box className={classes.loaderPanel}>
        <CircularProgress className={classes.loader} disableShrink />
      </Box>
    );
  }
}
export default withStyles(styles)(AppLoader);
