/* eslint-disable no-param-reassign */

const initialState = {
  userData: [],
  masterData: [],
  cartItems: [],
  totalAmountCart: {},
  totalCountCart: 0,
};
const app = (state = initialState, action) => {
  switch (action.type) {
    case "SET_LOGGED_IN_USER_DATA": {
      return {
        ...state,
        userData: action.payload,
      };
    }

    case "SET_MASTER_DATA": {
      return {
        ...state,
        masterData: action.payload,
      };
    }
    case "ADD_TO_CART":
      return {
        ...state,
        cartItems: action.payload,
      };
    case "SET_CART_TOTAL_AMOUNT":
      return {
        ...state,
        totalAmountCart: action.payload,
      };
    case "SET_CART_TOTAL_COUNT":
      return {
        ...state,
        totalCountCart: action.payload,
      };

    default:
      return state;
  }
};
export default app;
