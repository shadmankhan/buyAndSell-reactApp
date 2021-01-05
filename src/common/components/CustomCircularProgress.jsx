import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = theme => ({
  buttonProgress: {
    position: 'absolute',
    color: theme.palette.success.main
  }
});

export const CustomCircularProgress = withStyles(styles)(
  ({ classes, size = 24 }) => {
    return <CircularProgress size={size} className={classes.buttonProgress} />;
  }
);
