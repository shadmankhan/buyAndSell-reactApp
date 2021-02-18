import React, { Component } from "react";
import { Box, Grid, Typography } from "@material-ui/core";
import ProductCard from "../../../../common/components/ProductCard";
import { fetchProductOfferings } from "../../../../common/services/middleware";
import AppLoader from "../../../../common/components/AppLoader";
import {
  deepMergeObjectSum,
  deepMergeObjectSub,
} from "../../../../common/utility/commonUtility";
import _get from "lodash/get";
import CartFooter from "../../../../common/components/CartFooter";

let productsArr = [];

export class ProductHome extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: [],
      loader: false,
      showFooter: false,
    };
  }

  async componentDidMount() {
    await this.fetchProducts();
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.handleFooterVisibility();
    }
  }

  handleFooterVisibility = () => {
    if (this.props.totalCountCart === 0) {
      this.setState({ showFooter: false });
    } else {
      this.setState({ showFooter: true });
    }
  };

  fetchProducts = async () => {
    this.setState({ loader: true });
    productsArr = [];
    const products = await fetchProductOfferings();
    if (products) {
      products.forEach((product) => {
        productsArr.push({ ...product, quantity: 0 });
      });
    }
    this.setState({ products: productsArr, loader: false });
  };

  calculateCartQuantity = () => {
    const cartItems = this.props.cartItems;
    let cartCountTemp = 0;
    (cartItems || []).length &&
      cartItems.forEach((item) => {
        cartCountTemp += item.quantity;
      });
    this.props.setCartTotalCount(cartCountTemp);
  };

  addToCartItems = (product) => {
    let cartItems = this.props.cartItems;
    cartItems.totalPrice = this.props.totalAmountCart;

    if ((cartItems || []).length === 0) {
      let quant = product.quantity;
      quant++;
      product.quantity = quant;
      cartItems.totalPrice = _get(product, "sellingPrice");
      cartItems.push(product);
    } else {
      let fIndex = -1;
      let currentIndex = 0;
      cartItems.forEach((i) => {
        if (product["_id"] === i["_id"]) {
          fIndex = currentIndex;
          return;
        }
        currentIndex++;
      });

      if (fIndex > -1) {
        //Don't add if product already present just increase the quantity & the total pricing of cart
        let quant = cartItems[fIndex].quantity;
        quant++;
        product.quantity = quant;
        cartItems[fIndex].quantity = quant;

        let totalPrice = deepMergeObjectSum(
          cartItems.totalPrice,
          _get(product, "sellingPrice")
        );
        cartItems.totalPrice = totalPrice;
      } else {
        //Push the product into cart
        let quant = product.quantity;
        quant++;
        product.quantity = quant;
        let totalPrice = deepMergeObjectSum(
          cartItems.totalPrice,
          _get(product, "sellingPrice")
        );
        cartItems.totalPrice = totalPrice;
        cartItems.push(product);
      }
    }
    this.props.setCart(cartItems);
    this.props.setCartTotalAmount(cartItems.totalPrice);
    this.calculateCartQuantity();
  };

  decreaseQuantity = (product) => {
    let cartItems = this.props.cartItems;
    cartItems.totalPrice = this.props.totalAmountCart;
    const index = cartItems.findIndex((x) => x["_id"] === product["_id"]);

    if (cartItems[index].quantity === 1) {
      let quant = product.quantity - 1;
      product.quantity = quant;
      cartItems[index].quantity = quant;
      cartItems.splice(index, 1);
    } else {
      let quant = product.quantity - 1;
      product.quantity = quant;
      cartItems[index].quantity = quant;
    }
    let totalPrice = deepMergeObjectSub(
      cartItems.totalPrice,
      _get(product, "sellingPrice")
    );
    cartItems.totalPrice = totalPrice;
    this.props.setCart(cartItems);
    this.props.setCartTotalAmount(cartItems.totalPrice);
    this.calculateCartQuantity();
  };

  render() {
    const { products, loader, showFooter } = this.state;

    return (
      <Box mt={3}>
        <Grid container direction="column" alignItems="center" spacing={6}>
          <Grid item xs={9}>
            <Typography variant="h4">Dashboard</Typography>
          </Grid>
          <Grid item xs={9}>
            Some Advertisement Offers
          </Grid>
          <Grid item xs={10}>
            <Grid container spacing={4}>
              {products.map((product, index) => {
                // console.log({ product });
                return (
                  <Grid item key={index}>
                    <ProductCard
                      product={product}
                      addToCart={this.addToCartItems}
                      removeFromCart={this.decreaseQuantity}
                    />
                  </Grid>
                );
              })}
            </Grid>
          </Grid>
        </Grid>
        {showFooter && <CartFooter cartRequired={true} />}
        {loader && <AppLoader />}
      </Box>
    );
  }
}

export default ProductHome;
