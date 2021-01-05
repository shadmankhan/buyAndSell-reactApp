import { connect } from "react-redux";
import CartFooter from "./CartFooter";
import _get from "lodash/get";

function mapStateToProps(state) {
  const cartItems = _get(state, "app.cartItems");
  const totalAmountCart = _get(state, "app.totalAmountCart");
  const totalCountCart = _get(state, "app.totalCountCart");
  return {
    cartItems,
    totalAmountCart,
    totalCountCart,
  };
}

export default connect(mapStateToProps, null)(CartFooter);
