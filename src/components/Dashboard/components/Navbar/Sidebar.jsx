import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { Grid } from "@material-ui/core";
import StorefrontIcon from "@material-ui/icons/Storefront";

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
});

function Sidebar(props) {
  const classes = useStyles();
  const { isOpen, handleDrawer } = props;

  return (
    <React.Fragment>
      <Drawer anchor="left" open={isOpen} onClose={() => handleDrawer(false)}>
        <Grid className={classes.list}>
          <List>
            <ListItem>
              <ListItemIcon>
                <StorefrontIcon />
              </ListItemIcon>
              <ListItemText primary={`Buy & Sell`} />
            </ListItem>
          </List>
          <Divider />
          <List>
            <ListItem
              button
              onClick={() => {
                props.history.push("/profile");
                handleDrawer(false);
              }}
            >
              <ListItemIcon>
                <ShoppingCartIcon />
              </ListItemIcon>
              <ListItemText primary={"Your Profile"} />
            </ListItem>
          </List>
        </Grid>
      </Drawer>
    </React.Fragment>
  );
}

export default Sidebar;
