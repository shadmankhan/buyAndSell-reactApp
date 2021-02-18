import React, { Component, Fragment } from "react";
import CommonToast from "../../common/components/CommonToast";
import {
  Box,
  Grid,
  InputAdornment,
  Typography,
  IconButton,
  Button,
  Paper,
} from "@material-ui/core";
import { TextField } from "formik-material-ui";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import {
  AccountCircle,
  VpnKey,
  Visibility,
  VisibilityOff,
} from "@material-ui/icons";
import { withStyles } from "@material-ui/core/styles";
import constants from "../../common/constants/constants";
import { getUserInfo } from "../../common/services/middleware";
import SignUp from "./SignUp";
import appRoutes from "../../common/constants/appRoutes";
import { Route, Switch } from "react-router-dom";
import classnames from "classnames";
import AppLoader from "../../common/components/AppLoader";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Enter a valid email address")
    .required("Email address is required"),
  // .min(8, 'User name length should be minimum 8')
  // .max(10, 'User name length should be maximum 10'),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password length should be minimum 8"),
});

const styles = (theme) => ({
  loader: {
    position: "absolute",
    height: "100vh",
  },
  textWhite: {
    color: "#fff !important",
  },
  loginContainer: {
    height: "100vh",
    color: "#ffffff",
    background:
      "url(/assets/login-banner.jpg) 50% center / cover no-repeat fixed",
  },
  loginPanel: {
    backgroundColor: "rgba(0, 0, 0, 0.5)", // "#00000870",
    borderRadius: 0,
    height: "100%",
    textAlign: "center",
    padding: theme.spacing(12),
  },
  loginButton: {
    background: "#ffcb05",
    padding: "5px 30px",
    borderRadius: 15,
    "&:hover": {
      background: "#ffffff",
    },
  },
  registerBtn: {
    color: "#ffffff",
    borderColor: "#ffcb05",
    padding: "5px 30px",
    borderRadius: 15,
  },
  backBtn: {
    color: "#ffffff",
    borderColor: "#ffcb05",
    borderRadius: 20,
    marginRight: 10,
  },
  whiteText: {
    color: "#ffffff",
  },
  pointer: {
    cursor: "pointer",
  },
  enrollFormContrl: {
    "& .MuiInput-underline:before": {
      borderBottom: `1px solid '#ffffff'`,
    },
    "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
      borderBottom: "2px solid #fffffa",
    },
    "& .MuiInput-underline.Mui-error:after": {
      borderBottomColor: "#FF99BC",
    },
    "& .MuiInputBase-input": {
      color: "white",
    },
    "& .MuiFormLabel-root": {
      color: "#ffffff",
      fontSize: "14px",
      fontWeight: "normal",
    },
  },
});

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showLoader: false,
      isLogin: true,
      showPassword: false,
    };
  }

  goToSignup = () => {
    this.props.history.push(
      `${this.props.match.path}${appRoutes.customerRegistration}`
    );
    this.setState({ isLogin: false });
  };
  comebackToLogin = ({ type, message }) => {
    this.props.history.push({
      pathname: `${this.props.match.path}`,
      state: { type, message },
    });

    if (this.props.location.state) {
      this.props.handleShowToast({
        type: this.props.location.state.type,
        message: this.props.location.state.message,
      });
    }

    this.setState({ isLogin: true });
  };

  onSubmit = async (user, { setSubmitting }) => {
    this.setState({ showLoader: true });
    setSubmitting(true);

    await getUserInfo(user)
      .then((res) => {
        if (res === constants.success) {
          this.props.history.push("/home");
        } else {
          this.props.handleShowToast({
            type: "error",
            message: "Please enter correct email and password!",
          });
        }
      })
      .catch((err) => {
        this.props.handleShowToast({
          type: "error",
          message: err,
        });
        console.log(err);
      });

    setSubmitting(false);
    this.setState({ showLoader: false });
  };

  handleClickShowPassword = (value) => {
    this.setState({
      [value]: !this.state[value],
    });
  };

  render() {
    const { isLogin, showPassword, showLoader } = this.state;

    const { classes } = this.props;

    return (
      <Grid
        container
        justify="center"
        alignItems="center"
        className={classes.loginContainer}
      >
        <Grid item>
          <CommonToast />
        </Grid>
        <Grid item xs={5}>
          <Paper className={classes.loginPanel}>
            <Grid container>
              <Grid item xs={12}>
                {isLogin ? (
                  <Fragment>
                    <Grid item xs={12}>
                      <Typography variant="h4" className={classes.textWhite}>
                        Login to BuyNSell
                      </Typography>
                    </Grid>
                    <br />
                    <Grid item xs={12}>
                      <Typography className={classes.textWhite}>
                        Simple & Convenient <br /> access to marketplace
                      </Typography>
                    </Grid>
                    <br />
                    <Formik
                      initialValues={{ email: "", password: "" }}
                      validationSchema={validationSchema}
                      enableReinitialize={true}
                      onSubmit={this.onSubmit}
                    >
                      {({ submitForm, isValid }) => (
                        <Form>
                          <Grid
                            item
                            xs={12}
                            className={classes.enrollFormContrl}
                            align="center"
                          >
                            <Box maxWidth="75%" p={2}>
                              <Field
                                component={TextField}
                                fullWidth
                                id="emailId"
                                placeholder="Enter Email Address"
                                title="Enter Email Address"
                                type="text"
                                name="email"
                                InputProps={{
                                  startAdornment: (
                                    <InputAdornment position="start">
                                      <AccountCircle
                                        className={classes.whiteText}
                                      />
                                    </InputAdornment>
                                  ),
                                }}
                                autoComplete="off"
                              />
                            </Box>
                          </Grid>

                          <Grid
                            item
                            xs={12}
                            className={classes.enrollFormContrl}
                            align="center"
                          >
                            <Box maxWidth="75%" p={2}>
                              <Field
                                component={TextField}
                                id="password"
                                placeholder="Enter Password"
                                type={showPassword ? "text" : "password"}
                                name="password"
                                fullWidth
                                autoComplete="off"
                                InputProps={{
                                  startAdornment: (
                                    <InputAdornment position="start">
                                      <VpnKey className={classes.whiteText} />
                                    </InputAdornment>
                                  ),
                                  endAdornment: (
                                    <InputAdornment position="end">
                                      <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={() =>
                                          this.handleClickShowPassword(
                                            "showPassword"
                                          )
                                        }
                                      >
                                        {showPassword ? (
                                          <Visibility color="primary" />
                                        ) : (
                                          <VisibilityOff color="primary" />
                                        )}
                                      </IconButton>
                                    </InputAdornment>
                                  ),
                                }}
                              />
                            </Box>
                          </Grid>

                          <Grid item xs={12} align="center">
                            <Box maxWidth="75%" m={4}>
                              <Button
                                variant="outlined"
                                disabled={!isValid}
                                className={classes.loginButton}
                                onClick={submitForm}
                              >
                                Sign-in
                              </Button>
                            </Box>
                          </Grid>
                        </Form>
                      )}
                    </Formik>
                    <Grid item xs={12}>
                      <Typography className={classes.textWhite}>
                        New user,
                        <Typography
                          className={classnames(
                            classes.textWhite,
                            classes.pointer
                          )}
                          onClick={this.goToSignup}
                        >
                          <u>Register here</u>
                        </Typography>
                      </Typography>
                    </Grid>
                  </Fragment>
                ) : (
                  <Grid item xs={12}>
                    <Switch>
                      <Route
                        exact
                        path={`${this.props.match.path}${appRoutes.customerRegistration}`}
                        render={(props) => (
                          <SignUp
                            parentClasses={classes}
                            handleShowToast={this.props.handleShowToast}
                            backToLogin={this.comebackToLogin}
                          />
                        )}
                      />
                    </Switch>
                  </Grid>
                )}
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        {showLoader ? (
          <Grid container className={classes.loader}>
            <Grid item xs={12}>
              <AppLoader />
            </Grid>
          </Grid>
        ) : null}
      </Grid>
    );
  }
}

export default withStyles(styles)(Login);
