import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import WarningIcon from '@material-ui/icons/Warning';
import { withStyles } from '@material-ui/core/styles';
import _ from 'lodash';

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon
};

const styles1 = theme => ({
  success: {
    borderBottom: `solid 5px ${theme.palette.success.main}`,
    '& #client-snackbar svg': {
      color: theme.palette.success.main
    }
  },
  error: {
    borderBottom: `solid 5px ${theme.palette.error.main}`,
    '& #client-snackbar svg': {
      color: theme.palette.error.main
    }
  },
  info: {
    borderBottom: `solid 5px ${theme.palette.info.main}`,
    '& #client-snackbar svg': {
      color: theme.palette.info.main
    }
  },
  warning: {
    borderBottom: `solid 5px ${theme.palette.warning.main}`,
    '& #client-snackbar svg': {
      color: theme.palette.warning.main
    }
  },
  icon: {
    fontSize: 20
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1)
  },
  message: {
    display: 'flex',
    alignItems: 'center',
    color: theme.palette.primary.white
  },
  closeIcon: {
    fontSize: 12,
    color: theme.palette.primary.white
  }
});

function MySnackbarContent(props) {
  const { classes, className, message, onClose, variant, isToastVisible, ...other } = props;
  const Icon = variantIcon[variant];
  return (
    <SnackbarContent
      className={classes[variant]}
      aria-describedby="client-snackbar"
      message={
        <span id="client-snackbar" className={classes.message}>
          <>
            <Icon className={classNames(classes.icon, classes.iconVariant)} />
            {message}
          </>
        </span>
      }
      action={[
        <IconButton key="close" aria-label="Close" color="inherit" className={classes.close} onClick={onClose}>
          <CloseIcon className={classes.closeIcon} />
        </IconButton>
      ]}
      {...other}
    />
  );
}

MySnackbarContent.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  message: PropTypes.node,
  onClose: PropTypes.func,
  variant: PropTypes.oneOf(['success', 'warning', 'error', 'info']).isRequired
};

MySnackbarContent.defaultProps = {
  className: '',
  message: {},
  onClose: () => ({})
};

const MySnackbarContentWrapper = withStyles(styles1)(MySnackbarContent);

const styles2 = theme => ({
  margin: {
    margin: theme.spacing(1)
  }
});

class CommonToast extends Component {
  render() {
    const { toastProperty } = this.props;
    const type = _.get(toastProperty, 'type', 'info');
    const message = _.get(toastProperty, 'message', null);
    const isToastVisible = _.get(toastProperty, 'isToastVisible', false);

    return (
      <>
        <Snackbar
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center'
          }}
          open={isToastVisible}
          autoHideDuration={3000}
          onClose={() => {
            this.props.handleHideToast({
              type,
              message
            });
          }}
        >
          <MySnackbarContentWrapper
            onClose={() =>
              this.props.handleHideToast({
                type,
                message
              })
            }
            isToastVisible
            variant={type}
            message={message}
          />
        </Snackbar>
      </>
    );
  }
}
CommonToast.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles2)(CommonToast);
