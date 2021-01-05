import { Box, Button, Grid, Link, Typography } from "@material-ui/core";
import React from "react";
import Navbar from "../Dashboard/components/Navbar";

function Profile(props) {
  return (
    <Grid container direction="column" spacing={6}>
      <Grid item xs={12}>
        <Navbar history={props.history} />
      </Grid>
      <Grid item>
        <Typography variant="h2">Profile: To Be Done</Typography>
      </Grid>
      <Grid item>
        <Grid container direction="column">
          <Grid item>
            <Typography variant="h4">Features:</Typography>
          </Grid>
          <Grid item>
            <Typography variant="h5">
              User will be able to post new product by filling up the form of
              all the necessary fields.
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="h5">
              User can view his/her details and advertisement of recommended
              products as well.
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="h5">
              Will add more features in future.
            </Typography>
          </Grid>
          <Grid item>
            <Box ml={10} mt={3}>
              <Typography variant="h5">
                <Button variant="outlined" color="secondary">
                  Thank you
                </Button>
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Profile;
