import React from "react";
import { withStyles } from "@material-ui/core/styles";
import classnames from "classnames";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import _, { toUpper } from "lodash";
import constants from "../constants/constants";
import dayjs from "dayjs";
import { Box, Button, Grid, Tooltip } from "@material-ui/core";
import AcUnitIcon from "@material-ui/icons/AcUnit";
import {
  priceValueFormatter,
  usagePeriodConverter,
} from "../utility/commonUtility";
import ModalComponent from "./ModalComponent";

const styles = (theme) => ({
  root: {
    width: "350px",
    // minWidth: "361px",
    // height: "489.06px",
    // maxHeight: "489.06px",
    position: "relative",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
  fW500: {
    fontWeight: 600,
    fontSize: theme.spacing(2.3),
  },
  ribbon: {
    position: "absolute",
    overflow: "hidden",
    width: 135,
    height: 135,
    "&::before": {
      content: "close-quote",
      position: "absolute",
      display: "block",
      border: `5px solid ${red[500]}`,
    },
    "&::after": {
      content: "close-quote",
      position: "absolute",
      display: "block",
      border: `5px solid ${red[500]}`,
    },
  },
  ribbonTopRight: {
    top: -10,
    right: -10,
    "&::before": {
      content: "close-quote",
      borderTopColor: "transparent",
      borderRightColor: "transparent",
      top: 0,
      left: 30,
    },
    "&::after": {
      content: "close-quote",
      borderTopColor: "transparent",
      borderRightColor: "transparent",
      bottom: 30,
      right: 0,
    },
  },
  ribbonText: {
    position: "absolute",
    display: "block",
    padding: theme.spacing(1, 0),
    margin: theme.spacing(2),
    width: 225,
    fontSize: 12,
    backgroundColor: red[500],
    color: "#000",
    textTransform: "uppercase",
    textAlign: "center",
    left: -25,
    top: 30,
    transform: "rotate(45deg)",
  },
  addedToCartBtn: {
    padding: theme.spacing(0, 2),
    border: `2px solid ${theme.palette.warning.light}`,
    borderRadius: 8,
    "&:hover": {
      background: theme.palette.warning.light,
      color: theme.palette.common.white,
    },
  },
  incBtn: {
    background: theme.palette.common.white,
    minWidth: theme.spacing(7),
    padding: theme.spacing(0),
    border: `1px solid ${theme.palette.warning.light}`,
    borderRadius: theme.spacing(0, 50, 50, 0),
    "&:hover": {
      background: theme.palette.warning.light,
      color: theme.palette.common.white,
    },
  },
  decBtn: {
    background: theme.palette.common.white,
    minWidth: theme.spacing(7),
    padding: theme.spacing(0),
    border: `1px solid ${theme.palette.warning.light}`,
    borderRadius: theme.spacing(50, 0, 0, 50),
    "&:hover": {
      background: theme.palette.warning.light,
      color: theme.palette.common.white,
    },
  },
  cartCount: {
    background: theme.palette.common.white,
    padding: theme.spacing(0, 2),
    borderRadius: 0,
    borderTop: `1px solid ${theme.palette.warning.light}`,
    borderBottom: `1px solid ${theme.palette.warning.light}`,
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing(10, 30, 10),
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  iconBtn: {
    // position: "absolute",
    display: "flex",
    justifyContent: "flexEnd",
    float: "right",
  },
});

class ProductCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
    };
  }

  handleOpen = () => {
    this.setState({
      isModalOpen: true,
    });
  };
  handleClose = () => {
    this.setState({
      isModalOpen: false,
    });
  };

  render() {
    const { isModalOpen } = this.state;
    const { product, classes, addToCart, removeFromCart } = this.props;

    const productTitle = _.get(product, "productTitle", "");
    const productImage = _.get(product, "productImage", "");
    const productDescription = _.get(product, "productDescription", "");
    const costPrice = priceValueFormatter(_.get(product, "costPrice", {}));
    const sellingPrice = priceValueFormatter(
      _.get(product, "sellingPrice", {})
    );
    const usagePeriod = usagePeriodConverter(_.get(product, "dateOfPurchase"));
    const availableInState = _.get(product, "availabilityArea.state", {});
    const availableInCity = _.get(product, "availabilityArea.city", {});
    const postedOn = dayjs(_.get(product, "createdAt")).format(
      constants.dateFormat.fullMonthFirstFull
    );
    const sellerDetails = _.get(product, "sellerDetails", {});
    const sellerName = _.get(sellerDetails, "sellerName", "");
    const specialRibbon = _.get(product, "specialRibbon", true);
    const quantity = _.get(product, "quantity", 0);

    const limit = _.get(product, "limit");
    // debugger;

    return (
      <Card className={classes.root}>
        <CardHeader
          avatar={
            <Avatar aria-label='recipe' className={classes.avatar}>
              {toUpper(sellerName.charAt(0))}
            </Avatar>
          }
          action={
            <IconButton aria-label='settings'>
              <MoreVertIcon />
            </IconButton>
          }
          title={sellerName}
          subheader={postedOn}
        />
        {specialRibbon && (
          <div className={`${classes.ribbon} ${classes.ribbonTopRight}`}>
            <Typography className={classes.ribbonText}>
              DISCOUNT&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </Typography>
          </div>
        )}
        <CardMedia
          className={classes.media}
          image={productImage}
          // title={productTitle}
        />
        <CardContent>
          <Tooltip title={productTitle}>
            <Typography variant='body2'>
              {productTitle.length > 80
                ? `${productTitle.slice(0, 80)}...`
                : productTitle}
            </Typography>
          </Tooltip>
          {productTitle.length < 45 ? <br /> : ""}
          <br />
          <Grid container alignItems='baseline'>
            <Grid item>
              <Typography variant='body1'>M.R.P.:&nbsp;</Typography>
            </Grid>
            <Grid item>
              <Typography variant='body1' color='error'>
                <strike>{costPrice}</strike>
              </Typography>
            </Grid>
          </Grid>
          <Grid container alignItems='baseline'>
            <Grid item>
              <Typography variant='body1'>Price:&nbsp;</Typography>
            </Grid>
            <Grid item>
              <Typography
                variant='body1'
                className={classes.fW500}
                color='error'
              >
                {sellingPrice}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant='caption'>
                &nbsp;FREE Scheduled Delivery
              </Typography>
            </Grid>
          </Grid>
        </CardContent>

        <CardActions disableSpacing>
          {quantity > 0 ? (
            <Grid container>
              <Box px={-10}>
                <Button
                  className={classes.decBtn}
                  onClick={() => removeFromCart(product)}
                >
                  -
                </Button>
              </Box>
              <Typography className={classes.cartCount}>{quantity}</Typography>
              <Box px={-10}>
                <Button
                  className={classes.incBtn}
                  onClick={() => addToCart(product)}
                  disabled={quantity >= limit ? true : false}
                >
                  +
                </Button>
              </Box>
            </Grid>
          ) : (
            <Button
              onClick={(e) => {
                e && e.stopPropagation() && e.stopImmediatePropagation();
                addToCart(product);
              }}
              variant='outlined'
              className={classnames(classes.addedToCartBtn)}
            >
              <Typography variant='button'>{"Add to Cart"}</Typography>
            </Button>
          )}

          <IconButton onClick={this.handleOpen} className={classes.iconBtn}>
            <AcUnitIcon />
          </IconButton>
          <ModalComponent isOpen={isModalOpen} onCloseAction={this.handleClose}>
            <Grid container>
              <Grid item xs={3} />
              <Grid item xs={6}>
                <Typography variant='h5' id='transition-modal-title'>
                  {productTitle}
                </Typography>
                <Typography variant='body1' id='transition-modal-description'>
                  {productDescription}
                </Typography>
              </Grid>
              <Grid item xs={3} />
            </Grid>
          </ModalComponent>
        </CardActions>
      </Card>
    );
  }
}

export default withStyles(styles)(ProductCard);
