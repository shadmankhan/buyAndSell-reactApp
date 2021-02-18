import {
  Avatar,
  Box,
  Button,
  Grid,
  Paper,
  Typography,
  Modal,
  Fade,
  Backdrop,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React from "react";
import constants from "../../common/constants/constants";
import { getSessionData } from "../../common/utility/commonUtility";
import Navbar from "../Dashboard/components/Navbar";
import _ from "lodash";

const useStyles = makeStyles((theme) => ({
  borderBox: {
    borderBlock: "1px solid black",
  },
  paperPadding: {
    padding: 24,
    borderRadius: 16,
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paperOutline: {
    outline: "none",
    padding: 24,
    width: 680,
    height: 400,
  },
}));

function Profile(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { user } = getSessionData(constants.userInfo);
  const firstName = _.get(user, "firstName", "");
  const lastName = _.get(user, "lastName", "");
  const mobile = _.get(user, "mobile", "");
  const registeredEmailAddress = _.get(user, "email", "");
  const city = _.get(user, "city", "");

  return (
    <Grid container direction="column" spacing={6}>
      <Grid item xs={12}>
        <Navbar history={props.history} />
      </Grid>

      <Grid item>
        <Grid container>
          <Grid item xs={2} />
          <Grid item xs={8}>
            <Box className={classes.borderBox}>
              <Grid container justify="space-between" alignItems="center">
                <Grid item xs={6}>
                  <Avatar
                    variant="square"
                    style={{ height: "150px", width: "150px" }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Grid item>
                    <Typography variant="h5" align="left">
                      Profile Details:
                    </Typography>
                  </Grid>
                  <br />
                  <Grid container direction="column" spacing={0}>
                    <Grid item>
                      <Grid container>
                        <Grid item xs={6}>
                          <Typography variant="subtitle1">Full Name</Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="subtitle1">
                            {`: ${firstName} ${lastName}`}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>

                    <Grid item>
                      <Grid container>
                        <Grid item xs={6}>
                          <Typography variant="subtitle1">
                            Mobile Number
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="subtitle1">
                            {`: ${mobile}`}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>

                    <Grid item>
                      <Grid container>
                        <Grid item xs={6}>
                          <Typography variant="subtitle1">
                            Registered Email Address
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="subtitle1">
                            {`: ${registeredEmailAddress}`}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>

                    <Grid item>
                      <Grid container>
                        <Grid item xs={6}>
                          <Typography variant="subtitle1">City</Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="subtitle1">
                            {`: ${city}`}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Box>
          </Grid>
          <Grid item xs={2} />
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <Grid container>
          <Grid item xs={2} />
          <Grid item xs={8}>
            <Paper className={classes.paperPadding}>
              <Grid container justify="space-around" alignItems="center">
                <Grid item>
                  <Typography variant="button">
                    Would you like to post an ad of your product?
                  </Typography>
                </Grid>
                <Grid item>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={handleOpen}
                  >
                    Post Ad!
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={2} />
        </Grid>
      </Grid>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Paper className={classes.paperOutline}>
            <Grid container direction="column">
              <Grid item>Field 1</Grid>
              <Grid item>Field 2</Grid>
              <Grid item>Field 3</Grid>
            </Grid>
          </Paper>
        </Fade>
      </Modal>
    </Grid>
  );
}

export default Profile;
