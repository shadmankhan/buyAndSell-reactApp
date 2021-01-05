import React, { Component } from 'react';
import { Grid, Typography, Button, Box, IconButton } from '@material-ui/core';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import InputAdornment from '@material-ui/core/InputAdornment';
import constants from '../../../common/constants/constants';
import { TextField as FTextField } from 'formik-material-ui';
import { Field, Form, withFormik } from 'formik';
import * as Yup from 'yup';
import ChevronRightOutlinedIcon from '@material-ui/icons/ChevronRightOutlined';
import { duplicateEmailAddressValidate } from "../../../common/services/middleware";
import _ from 'lodash';
import { validateEmail } from '../../../common/utility/commonUtility';

export class RegistrationFieldsForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showPassword: false,
      showConfirmPassword: false,
      errMsg: "",
    };
  }

  checkDuplicateEmailValidation = async (e) => {
    if (!_.isEmpty(e.target.value)) {
      const isEmail = validateEmail(e.target.value);
      if (isEmail) {
        this.props.toggleLoader(true);
        await duplicateEmailAddressValidate(e.target.value)
          .then((res) => {
            if (res === constants.passed) {
              this.setState({ errMsg: "" });
            } else {
              this.setState({ errMsg: "Email already exists" });
            }
          })
          .catch((err) => console.log(err));
        this.props.toggleLoader(false);
      }
    } else {
      this.setState({ errMsg: "Email address cannot be empty" });
    }
  };

  render() {
    const { parentClasses, isValid, dirty } = this.props;
    const { showPassword, showConfirmPassword, errMsg } = this.state;

    const handleClickShowPassword = (value) => {
      this.setState({
        [value]: !this.state[value],
      });
    };

    return (
      <Form noValidate>
        <Box align="center">
          <Box mt={2} maxWidth="80%">
            <Grid container direction="column">
              <Grid item>
                <Box minHeight="3rem" align="left">
                  <Field
                    required
                    type="text"
                    label={"Enter First Name"}
                    name="firstName"
                    value={this.props.values.firstName}
                    component={FTextField}
                    fullWidth
                    className={parentClasses.enrollFormContrl}
                  />
                </Box>
              </Grid>
              <Grid item>
                <Box minHeight="3rem" align="left">
                  <Field
                    required
                    type="text"
                    label={"Enter Last Name"}
                    name="lastName"
                    value={this.props.values.lastName}
                    component={FTextField}
                    fullWidth
                    className={parentClasses.enrollFormContrl}
                  />
                </Box>
              </Grid>
              <Grid item>
                <Box minHeight="3rem" align="left">
                  <Field
                    required
                    type="text"
                    name="mobile"
                    label={"Enter Mobile Number"}
                    value={this.props.values.mobile}
                    component={FTextField}
                    fullWidth
                    className={parentClasses.enrollFormContrl}
                  />
                </Box>
              </Grid>
              <Grid item>
                <Box minHeight="3rem" align="left">
                  <Field
                    required
                    type="text"
                    label={"Enter Email Address"}
                    name="emailId"
                    value={this.props.values.emailId}
                    component={FTextField}
                    fullWidth
                    onChange={e => {
                      this.props.handleChange(e);
                      this.setState({ errMsg: '' });
                    }}
                    className={parentClasses.enrollFormContrl}
                    InputProps={{
                      onBlur: this.checkDuplicateEmailValidation,
                    }}
                  />
                  <Typography color="error" variant="caption">
                    {errMsg}
                  </Typography>
                </Box>
              </Grid>
              <Grid item>
                <Box minHeight="3rem" align="left">
                  <Field
                    required
                    type="text"
                    label={"Enter City"}
                    name="city"
                    value={this.props.values.city}
                    component={FTextField}
                    fullWidth
                    className={parentClasses.enrollFormContrl}
                  />
                </Box>
              </Grid>
              <Grid item>
                <Box minHeight="3rem">
                  <Field
                    required
                    type={showPassword ? "text" : "password"}
                    label={"Enter Password"}
                    name="password"
                    value={this.props.values.password}
                    component={FTextField}
                    fullWidth
                    className={parentClasses.enrollFormContrl}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={() =>
                              handleClickShowPassword("showPassword")
                            }
                          >
                            {showPassword ? (
                              <VisibilityIcon color="primary" />
                            ) : (
                                <VisibilityOffIcon color="primary" />
                              )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Box>
              </Grid>
              <Grid item>
                <Box minHeight="3rem">
                  <Field
                    required
                    type={showConfirmPassword ? "text" : "password"}
                    label={"Confirm Password"}
                    name="confirmPassword"
                    value={this.props.values.confirmPassword}
                    component={FTextField}
                    fullWidth
                    className={parentClasses.enrollFormContrl}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={() =>
                              handleClickShowPassword("showConfirmPassword")
                            }
                          >
                            {showConfirmPassword ? (
                              <VisibilityIcon color="primary" />
                            ) : (
                                <VisibilityOffIcon color="primary" />
                              )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Box>
              </Grid>
              <Grid item>
                <Box mt={8}>
                  <Typography
                    variant="caption"
                    className={parentClasses.whiteText}
                  >
                    By creating a BuyNSell account you accept the Terms &
                    Conditions
                  </Typography>
                  <Box mt={4}>
                    <Button
                      type="submit"
                      className={parentClasses.loginButton}
                      disabled={
                        (!isValid && dirty) ||
                        !_.isEmpty(errMsg) ||
                        (_.isEmpty(errMsg) && !dirty)
                      }
                    >
                      Proceed
                      <ChevronRightOutlinedIcon />
                    </Button>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Form>
    );
  }
}

const RegistrationFields = withFormik({
  mapPropsToValues(props) {
    return {
      props,
      firstName: '',
      lastName: '',
      mobile: '',
      emailId: '',
      city: '',
      password: '',
      confirmPassword: ''
    };
  },
  validateOnChange: true,
  validateOnBlur: true,

  validationSchema: Yup.object().shape({
    firstName: Yup.string()
      .max(constants.fieldLengths.firstName, `First Name max length is ${constants.fieldLengths.firstName}`)
      .required('First name cannot be empty'),

    lastName: Yup.string()
      .max(constants.fieldLengths.lastName, `Last Name max length is ${constants.fieldLengths.lastName}`)
      .required('Last name cannot be empty'),

    mobile: Yup.string()
      .max(constants.fieldLengths.mobile, `Mobile max length is ${constants.fieldLengths.mobile}`)
      .matches(constants.regex.mobile, 'Enter a valid Mobile number')
      .required('Mobile number cannot be empty'),

    emailId: Yup.string()
      .email('Not a valid email address')
      .required('Email address cannot be empty'),

    city: Yup.string().required('City cannot be empty'),

    password: Yup.string()
      .required('Password cannot be empty')
      .matches(constants.regex.password, 'Enter a valid Password')
      .max(constants.fieldLengths.password, `Password max length is ${constants.fieldLengths.password}`),

    confirmPassword: Yup.string()
      .required('Password cannot be empty')
      .matches(constants.regex.password, 'Enter a valid Password')
      .oneOf([Yup.ref('password'), null], 'Passwords do not match')
      .max(constants.fieldLengths.password, `Password max length is ${constants.fieldLengths.password}`),
  }),

  handleSubmit: async (values, { props, setSubmitting }) => {
    props.toggleLoader(true);

    const payload = {
      firstName: _.get(values, 'firstName'),
      lastName: _.get(values, 'lastName'),
      mobile: _.get(values, 'mobile'),
      email: _.get(values, 'emailId'),
      city: _.get(values, 'city'),
      password: _.get(values, 'password')
    };

    await props.customerRegistrationPost(payload);
    props.toggleLoader(false);
    setSubmitting(false);
  }
})(RegistrationFieldsForm);

export default RegistrationFields;
