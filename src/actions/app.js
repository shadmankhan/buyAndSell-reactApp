import {
  fetchCities,
  fetchCountries,
  fetchStates,
} from "../common/services/middleware";

export const setMasterData = (payload) => ({
  type: "SET_MASTER_DATA",
  payload,
});

export const setCart = (payload) => ({
  type: "ADD_TO_CART",
  payload,
});

export const setCartTotalAmount = (payload) => ({
  type: "SET_CART_TOTAL_AMOUNT",
  payload,
});

export const setCartTotalCount = (payload) => ({
  type: "SET_CART_TOTAL_COUNT",
  payload,
});

export const setCountryStateCityData = (
  countryName = "India",
  stateName = "Uttar Pradesh"
) => async (dispatch) => {
  const countries = await fetchCountries();
  // console.log({ countries });

  const states = await fetchStates(countryName);
  // console.log({ states });

  const cities = await fetchCities(stateName);
  // console.log({ cities });

  dispatch(setMasterData({ countries, states, cities }));
};
