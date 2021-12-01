import React from "react";
import MenuIcon from "@material-ui/icons/Menu";
import { IconButton,  Zoom, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
const useStyles = makeStyles((theme) => {
  return {
    badge: {
      color: theme.palette.third.contrastText,
    },
  };
});
const MenuButton = ({ handleDrawer, open }) => {
  const classes = useStyles();
  // console.log(open);
  return (
    <>
      {open ? (
        <Zoom in={open} timeout={300}>
          <Grid item>
            <IconButton size="small" onClick={() => handleDrawer()}>
              <MenuIcon className={classes.badge} />
            </IconButton>
          </Grid>
        </Zoom>
      ) : null}
    </>
  );
};

export { MenuButton };
//
