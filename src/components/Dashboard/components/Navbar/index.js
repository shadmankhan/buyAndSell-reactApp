import Navbar from "./Navbar";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  setCart,
  setCartTotalAmount,
  setCartTotalCount,
} from "../../../../actions/app";
import _get from "lodash/get";

function mapStateToProps(state) {
  const totalCountCart = _get(state, "app.totalCountCart");
  return {
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

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
