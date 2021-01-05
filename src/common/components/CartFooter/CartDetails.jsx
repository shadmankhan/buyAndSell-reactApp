import React, { useEffect, useState } from "react";
import ModalComponent from "../ModalComponent";
import { withStyles } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";
import _get from "lodash/get";
import ShoppingCart from "@material-ui/icons/ShoppingCart";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { priceValueCalc } from "../../utility/commonUtility";

const styles = (theme) => ({
  table: {
    minWidth: 700,
  },
  offer: {
    width: 106,
    height: 27,
    background: theme.palette.error.main,
  },
  offerText: {
    color: theme.palette.common.white,
    padding: theme.spacing(2),
    verticalAlign: "-webkit-baseline-middle",
  },
  subText: {
    color: "grey",
  },
  strikeout: {
    textAlign: "left",
    textDecoration: "line-through",
    color: theme.palette.error.main,
    verticalAlign: "super",
  },
  spacing: {
    marginTop: theme.spacing(8),
  },
  subSpacing: {
    marginTop: theme.spacing(4),
  },
  cap: {
    textTransform: "uppercase",
  },
});

function createRow(product) {
  const { productTitle, sellingPrice, quantity } = product || {};

  const price = priceValueCalc(sellingPrice, quantity);
  return { productTitle, quantity, price };
}

const CartDetailsComponent = ({
  isOpen,
  onCloseAction,
  classes,
  cart = {},
  totalPrice,
  totalCount,
}) => {
  const [rowsToShow, setRowsToShow] = useState([]);
  const [totalPriceCart, setTotalPriceCart] = useState({});
  const [totalCountCart, setTotalCountCart] = useState(0);
  let rows = [];

  useEffect(() => {
    cart.forEach((product) => {
      rows.push(createRow(product));
    });
    setRowsToShow(rows);
  }, [cart]);

  return (
    <ModalComponent isOpen={isOpen} onCloseAction={onCloseAction}>
      <Grid container>
        <Grid item xs={3} />
        <Grid item xs={6}>
          <Grid container className={classes.spacing}>
            <Grid item xs={6}>
              <Grid container>
                <Grid item>
                  <Typography variant={"h4"}>{"Your cart"}</Typography>
                </Grid>
                &nbsp; &nbsp;
                <Grid item>
                  <ShoppingCart color="disabled" fontSize="large" />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid container direction="column" justify="space-between">
            <Grid item>
              <TableContainer>
                <Table className={classes.table} aria-label="spanning table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Sr No.</TableCell>
                      <TableCell>Name</TableCell>
                      <TableCell align="right">Qty.</TableCell>
                      <TableCell align="right">Price</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rowsToShow.map((row, index) => (
                      <TableRow key={index}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{row.productTitle}</TableCell>
                        <TableCell align="right">{row.quantity}</TableCell>
                        <TableCell align="right">{row.price}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>

            <Grid item xs={12}>
              <Grid container>
                <Grid item xs={7} />
                <Grid item>
                  <TableRow align="right">
                    <TableCell colSpan={1}>Total</TableCell>

                    <TableCell align="right" colSpan={2}>
                      <Grid container direction="column">
                        <Grid item>{`${_get(totalPrice, "value")} INR`}</Grid>
                      </Grid>
                    </TableCell>
                  </TableRow>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={3} />
      </Grid>
    </ModalComponent>
  );
};

export default withStyles(styles)(CartDetailsComponent);
