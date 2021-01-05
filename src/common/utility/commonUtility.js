import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import _get from "lodash/get";

export const setSessionData = (key, val, isString) => {
  const data = isString ? val : JSON.stringify(val);
  sessionStorage.setItem(key, data);
};
export const getSessionData = (key, isString) => {
  const data = sessionStorage.getItem(key);
  return isString ? data : JSON.parse(data);
};

export const validateEmail = (value) => {
  const emailRegex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  const isValidEmail = emailRegex.test(value);
  if (!isValidEmail) {
    return false;
  }
  if (isValidEmail) {
    return true;
  }
};

export const priceValueCalc = (val, quantity) => {
  const unit = _get(val, "unit", "INR");
  const value = _get(val, "value", "0.00");

  return `${value * quantity} ${unit}`;
};

export const priceValueFormatter = (val) => {
  const unit = _get(val, "unit", "INR");
  const value = _get(val, "value", "0.00");

  return `${unit} ${value}`;
};

export const usagePeriodConverter = (val) => {
  dayjs.extend(relativeTime);
  return dayjs(val).fromNow(true);
};

export const deepMergeObjectSum = (obj1, obj2) => {
  return Object.keys(obj1).reduce((acc, key) => {
    if (typeof obj2[key] === "object") {
      acc[key] = deepMergeObjectSum(obj1[key], obj2[key]);
    } else if (obj2.hasOwnProperty(key) && !isNaN(parseFloat(obj2[key]))) {
      acc[key] = obj1[key] + obj2[key];
    }
    return acc;
  }, {});
};

export const deepMergeObjectSub = (obj1, obj2) => {
  return Object.keys(obj1).reduce((acc, key) => {
    if (typeof obj2[key] === "object") {
      acc[key] = deepMergeObjectSub(obj1[key], obj2[key]);
    } else if (obj2.hasOwnProperty(key) && !isNaN(parseFloat(obj2[key]))) {
      acc[key] = obj1[key] - obj2[key];
    }
    return acc;
  }, {});
};

// overflow:hidden disables the scrolling on a desktop browser
// position: fixed is additionally needed for mobile devices
export const lockBodyScroll = () => {
  document.body.setAttribute("style", "width: 100%;");
};

// overflow:visible ables the scrolling on a desktop browser
// position: static is additionally needed for mobile devices
export const unlockBodyScroll = () => {
  document.body.setAttribute("style", "overflow: visible; position: static;");
};
