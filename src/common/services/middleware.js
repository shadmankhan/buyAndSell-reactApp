import { get, post } from "axios";
import _ from "lodash";
import constants from "../constants/constants";
import { setSessionData } from "../utility/commonUtility";
import config from "../../config";
const {
  base_url,
  apiConfig: { universalCountries },
} = config;

export const getUserInfo = (user) => {
  const encPassword = new Buffer(user.password).toString("base64");

  const payload = {
    email: _.get(user, "email", ""),
    password: encPassword,
  };

  return post(`${base_url}/login`, payload)
    .then((res) => {
      if (_.get(res, "data.status") === constants.success) {
        const status = _.get(res, "data.status");
        const user = _.get(res, "data[_doc]");
        const userInfo = { status, user };

        setSessionData(constants.userInfo, userInfo);
        return constants.success;
      } else {
        return constants.failed;
      }
    })
    .catch((err) => console.log(err));
};

export const registerUser = (payload) => {
  const encPassword = new Buffer(payload.password).toString("base64");
  payload.password = encPassword;

  return post(`${base_url}/login/customerRegistration`, payload)
    .then((res) => {
      if (_.get(res, "data.status") === constants.success) {
        return _.get(res, "data.status");
      } else {
        return constants.failed;
      }
    })
    .catch((err) => {
      console.log(err);
      return constants.failed;
    });
};

export const duplicateEmailAddressValidate = (email) => {
  return get(`${base_url}/login/customerRegistration/${email}`)
    .then((res) => {
      if (_.get(res, "data.status") === constants.passed) {
        return _.get(res, "data.status");
      } else {
        return constants.failed;
      }
    })
    .catch((err) => {
      console.log("err", err.status);
      return constants.failed;
    });
};

export const fetchProductOfferings = () => {
  const url = `${base_url}/home`;

  return get(url)
    .then((res) => {
      if (_.get(res, "data.status") === constants.success) {
        return _.get(res, "data.products");
      } else {
        return [];
      }
    })
    .catch((err) => {
      console.log("err", err.status);
      return constants.failed;
    });
};

export const addProduct = (payload) => {
  const url = `${base_url}/profile/addProduct`;

  return post(url, payload)
  .then(res => {
    if (_.get(res, "data.status") === constants.success) {
      return _.get(res, "data.status");
    } else {
      return constants.failed;
    }
  })
  .catch((err) => {
    console.log(err);
    return constants.failed;
  });
}

export const fetchCountries = async () => {
  const url = `${universalCountries.href}/countries/`;

  const res = await restAPI_GET_METHOD(url);
  return res.data;
};

export const fetchStates = async (countryName) => {
  const url = `${universalCountries.href}/states/${countryName}`;

  const res = await restAPI_GET_METHOD(url);
  return res.data;
};

export const fetchCities = async (stateName) => {
  const url = `${universalCountries.href}/cities/${stateName}`;

  const res = await restAPI_GET_METHOD(url);
  return res.data;
};

const getAccessTokenForCountriesAPI = async () => {
  const accessToken =
    "Rhs-l67TVu51nFNZ8JB2sq0X9u9HsDo7y1CHWGiXU0fgwNtG1JBoCm7KSdqzhCv-exQ";
  const method = "GET";
  const headers = {
    "api-token": accessToken,
    Accept: "application/json",
    "user-email": "contactshadman@gmail.com",
  };
  const request = { method, headers };

  const res = await fetch(`${universalCountries.href}/getaccesstoken`, request)
    .then((res) => res.json())
    .catch((e) => console.log(e));

  return res.auth_token;
};

const restAPI_GET_METHOD = async (url) => {
  const auth_token = await getAccessTokenForCountriesAPI();

  const method = "GET";
  const headers = {
    Authorization: `Bearer ${auth_token}`,
    Accept: "application/json",
  };
  const request = { method, headers };

  try {
    let res = await fetch(url, request);
    let response = {};

    if (res.status >= 200 && res.status <= 299) {
      response.data = res.json();
      return response;
    } else {
      return response;
    }
  } catch (e) {
    return e;
  }
};
