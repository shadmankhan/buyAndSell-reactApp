import React, { useState } from "react";
import RegistrationFields from "./RegistrationFields";
import { Grid, IconButton, Typography } from "@material-ui/core";
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import { registerUser } from "../../../common/services/middleware";
import constants from "../../../common/constants/constants";
import AppLoader from "../../../common/components/AppLoader";

function SignUp(props) {
  const { parentClasses, backToLogin } = props;
  const [loader, setLoader] = useState(false);

  const toggleLoader = val => {
    setLoader(val)
  };

  const customerRegistrationPost = async payload => {
    setLoader(true);
    await registerUser(payload)
      .then(res => {
        if (res === constants.success) {
          backToLogin({ type: "success", message: "Registration Successful!" })
        } else {
          this.props.handleShowToast({
            type: "error",
            message: "Error occured, please try again!",
          });
        }
      })
      .catch(err => {
        this.props.handleShowToast({
          type: "error",
          message: err
        });
        console.log(err)
      })

    setLoader(false);
  }


  return (
    <Grid container justify='center'>
      {loader && <AppLoader />}
      <Grid item xs={12}>
        <Grid container alignItems="center">
          <Grid item>
            <IconButton onClick={backToLogin}>
              <KeyboardBackspaceIcon className={parentClasses.textWhite} fontSize="large" />
            </IconButton>
          </Grid>
          <Grid item xs={9}>
            <Typography variant="h4" className={parentClasses.textWhite}>
              Register at BuyNSell
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <RegistrationFields
          toggleLoader={toggleLoader}
          customerRegistrationPost={customerRegistrationPost}
          parentClasses={parentClasses} />
      </Grid>
    </Grid>
  );
}

export default SignUp;
