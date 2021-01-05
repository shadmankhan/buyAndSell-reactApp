import ProductHome from "./ProductHome";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  setCart,
  setCartTotalAmount,
  setCartTotalCount,
} from "../../../../actions/app";
import _get from "lodash/get";

function mapStateToProps(state) {
  const cartItems = _get(state, "app.cartItems", []);
  const totalAmountCart = _get(state, "app.totalAmountCart");
  const totalCountCart = _get(state, "app.totalCountCart");
  return {
    cartItems,
    totalAmountCart,
    totalCountCart,
  };
}

function mapDispatchToProps(dispatch, props) {
  return bindActionCreators(
    {
      setCart,
      setCartTotalAmount,
      setCartTotalCount,
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductHome);
