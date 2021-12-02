import React from "react";
import { Drawer, Typography, makeStyles } from "@material-ui/core";

const useStyle = makeStyles((theme) => {
  return {
    title: {
      padding: theme.spacing(2),
    },
    drawer: {
      width: (drawerWidth) => drawerWidth,
    },
    drawerPaper: {
      width: (drawerWidth) => drawerWidth,
      color: theme.palette.primary.contrastText,
      backgroundColor: theme.palette.primary.main,
    },
  };
});

const SideMenu = ({ drawerWidth }) => {
  const classes = useStyle(drawerWidth);

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      className={classes.drawer}
      classes={{ paper: classes.drawerPaper }}
    >
      <div>
        <Typography className={classes.title}>Robert's Note!</Typography>
      </div>
    </Drawer>
  );
};

export default SideMenu;
