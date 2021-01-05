const constants = {
  userInfo: "userInfo",
  success: "Success",
  failed: "Failed",
  passed: "Passed",
  regex: {
    mobile: /^(\+91-|\+91|0)?\d{10}$/,
    password: /^(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%&*]).*$/,
  },
  fieldLengths: {
    firstName: 45,
    lastName: 45,
    mobile: 10,
    email: 50,
    password: 32,
  },
  dateFormat: {
    fullMonthFirstFull: "MMMM DD, YYYY",
    fullDateMonthWithTime: "DD MMM YYYY HH:mm",
    onlyTime: "hh:mm:ss",
  },
};

export default constants;
