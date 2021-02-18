import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Typography, Box } from "@material-ui/core";
import { lockBodyScroll, unlockBodyScroll } from "../utility/commonUtility";
import CloseIcon from "@material-ui/icons/Close";

const styles = (theme) => ({
  root: {
    position: "fixed",
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: 1200,
    "transition-property": "all",
    "transition-duration": ".5s",
    "transition-timing-function": "cubic-bezier(0, 1, 0.5, 1)",
  },
  modalClose: {
    top: "100%",
  },
  modalOpen: {
    top: 0,
  },
  transparentSection: {
    height: "25%",
    background: `#00000870 !important`,
  },
  detailSection: {
    height: "75%",
    padding: "25px",
    background: theme.palette.common.white,
    overflowY: "scroll",
  },
  header: {
    height: 30,
  },
  close: {
    float: "right",
    padding: "0px 21px",
    cursor: "pointer",
  },
  titleClass: {
    float: "left",
  },
  iconClass: {
    marginLeft: 22,
  },
  title: {
    textAlign: "left",
    letterSpacing: 0,
    color: "grey",
    opacity: 1,
    marginLeft: theme.spacing(2),
  },
});

const ModalComponent = ({
  classes,
  onCloseAction,
  children,
  transparentClassName = "",
  detailClassName = "",
  isOpen = false,
  modalTitle = "",
  titleIcon = null,
}) => {
  const [isModalOpen, setModalClass] = useState(isOpen);
  const onClickAction = (e) => {
    setModalClass(false);
    onCloseAction && onCloseAction(e);
  };
  useEffect(() => {
    if (!isOpen) {
      lockBodyScroll();
      setModalClass(isOpen);
      onCloseAction && onCloseAction();
    } else {
      unlockBodyScroll();
      setTimeout(() => {
        setModalClass(isOpen);
      }, 500);
    }
  }, [isOpen]);
  return (
    <div
      className={`${classes.root} ${
        isModalOpen ? classes.modalOpen : classes.modalClose
      }`}
    >
      <div
        className={`${classes.transparentSection} ${transparentClassName}`}
      />
      <div className={`${classes.detailSection} ${detailClassName}`}>
        <div className={classes.header}>
          {modalTitle ? (
            <Box className={classes.titleClass}>
              <Typography
                variant='h5'
                className={classes.title}
                display='inline'
                gutterBottom
              >
                {modalTitle}
              </Typography>
            </Box>
          ) : null}
          <div className={classes.close} onClick={onClickAction}>
            <CloseIcon iconName='close' iconColor='#333333' />
          </div>
        </div>
        {children}
      </div>
    </div>
  );
};

ModalComponent.propTypes = {
  children: PropTypes.any,
  classes: PropTypes.object,
  detailClassName: PropTypes.string,
  isOpen: PropTypes.bool,
  modalTitle: PropTypes.string,
  onCloseAction: PropTypes.func,
  titleIcon: PropTypes.string,
  transparentClassName: PropTypes.string,
};

ModalComponent.defaultProps = {
  children: null,
  detailClassName: "",
  isOpen: false,
  modalTitle: "",
  onCloseAction: null,
  titleIcon: "",
  transparentClassName: "",
};
export default withStyles(styles)(ModalComponent);
