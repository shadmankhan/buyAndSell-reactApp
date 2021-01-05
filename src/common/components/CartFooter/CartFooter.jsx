import React, { useEffect, useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Badge from "@material-ui/core/Badge";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import ArrowForwardOutlined from "@material-ui/icons/ArrowForwardOutlined";
import ShoppingCart from "@material-ui/icons/ShoppingCart";
import _has from "lodash/has";
import _get from "lodash/get";
import { blue } from "@material-ui/core/colors";
import { CustomCircularProgress } from "../CustomCircularProgress";
// import { fetchMultipleProductOrder } from 'srq/utils/serviceRequest';
import CloseIcon from "@material-ui/icons/Close";
import CartDetailsComponent from "./CartDetails";
import { IconButton, Typography } from "@material-ui/core";

const styles = (theme) => ({
  footer: {
    top: "auto",
    bottom: 0,
    backgroundColor: theme.palette.background.paper,
    minHeight: 75,
  },
  root: {
    marginTop: 10,
  },
  proceedBtn: {
    backgroundColor: theme.palette.warning.light,
    borderRadius: 5,
    padding: "10px 20px",
    "&:hover": {
      backgroundColor: `#00000870 !important`,
    },
  },
  primaryColor: {
    color: theme.palette.text.primary,
  },
  viewDetails: {
    color: 'black',
    display: "inline",
    marginLeft: theme.spacing(8),
    cursor: "pointer",
  },
  cartIcon: {
    "&>span": {
      height: "unset",
      cursor: "pointer",
      width: theme.spacing(4.5),
      marginRight: theme.spacing(8),
    },
  },
});

const StyledBadge = withStyles((theme) => ({
  badge: {
    backgroundColor: theme.palette.error.main,
    top: 0,
    padding: "0 4px",
  },
}))(Badge);

function CartFooter(props) {
  const [showLoader, setShowLoader] = useState(false);
  const [cartDetail, setDetail] = useState(null);
  const [cartTotal, setCartTotal] = useState(null);
  const [cartTotalCount, setCartTotalCount] = useState(null);

  const {
    classes,
    cartRequired,
    cartIconLoader,
    setShowFooter,
    totalAmountCart,
    totalCountCart,
    enableCloseIcon = true,
    proceedAction = null,
    cartItems = [],
  } = props;

  useEffect(() => {
    setCartTotal(totalAmountCart);
    setCartTotalCount(totalCountCart);
  }, [cartItems]);

  const onClickItem = (cart) => {
    setDetail(cart);
  };
  const onCloseAction = () => {
    setDetail(null);
  };

  return (
    <React.Fragment>
      <AppBar position="fixed" color="primary" className={classes.footer}>
        <Toolbar>
          <Grid container direction="row">
            <Grid item xs={2} />
            <Grid item xs={8}>
              <Grid
                container
                direction="row"
                justify="space-between"
                alignItems="center"
                spacing={3}
                className={classes.root}
              >
                <Grid item>
                  <Grid container direction="row">
                    <Grid item>
                      {cartRequired && (
                        <div
                          aria-label="cart"
                          onClick={(e) => {
                            onClickItem(cartItems);
                          }}
                          className={classes.cartIcon}
                          disabled={cartIconLoader}
                        >
                          <StyledBadge
                            color="primary"
                            badgeContent={totalCountCart || cartTotalCount}
                            showZero
                          >
                            <ShoppingCart color="disabled" fontSize="large" />
                            {cartIconLoader && <CustomCircularProgress />}
                          </StyledBadge>
                        </div>
                      )}
                    </Grid>
                    <Grid item>
                      <Grid container direction="column">
                        <Grid item>
                          <Typography
                            variant={"body1"}
                            className={classes.primaryColor}
                          >
                            {`Cart Total Price INR ${_get(
                              totalAmountCart,
                              "value",
                              "0.00"
                            )}`}
                          </Typography>
                        </Grid>
                        <Grid item>
                          <Typography
                            variant={"caption"}
                            className={classes.primaryColor}
                          >
                            {`FREE DELIVERY AVAILABLE`}
                          </Typography>
                          <Typography
                            variant={"body2"}
                            className={classes.viewDetails}
                            onClick={() => {
                              setDetail(cartItems);
                            }}
                          >
                          <b>{`View Cart`}</b>
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <Grid container direction="row">
                    <Grid item>
                      <Button
                        className={classes.proceedBtn}
                        variant="contained"
                        type="submit"
                        onClick={(e) => {
                          setShowLoader(true);
                          if (proceedAction) {
                            proceedAction();
                          }
                          setShowLoader(false);
                        }}
                        disabled={showLoader}
                        endIcon={<ArrowForwardOutlined />}
                      >
                        Proceed
                        {showLoader && <CustomCircularProgress />}
                      </Button>
                    </Grid>
                    {enableCloseIcon ? (
                      <Grid item>
                        <IconButton aria-label="close">
                          <CloseIcon onClick={(e) => setShowFooter(false)} />
                        </IconButton>
                      </Grid>
                    ) : null}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={2} />
          </Grid>
        </Toolbar>
      </AppBar>
      <Toolbar />
      {cartDetail && (
        <CartDetailsComponent
          isOpen={cartDetail !== null}
          cart={cartItems}
          totalPrice={totalAmountCart}
          totalCount={totalCountCart}
          onCloseAction={onCloseAction}
        />
      )}
    </React.Fragment>
  );
}

export default withStyles(styles)(CartFooter);
