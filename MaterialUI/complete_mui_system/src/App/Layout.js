import { makeStyles } from "@material-ui/core";
import React, { div } from "react";
import SideMenu from "./_Layout/SideMenu";
import Header from "./_Layout/Header";
// import PageHeader from "./_Layout/PageHeader";
// import PeopleOutlineIcon from "@material-ui/icons/PeopleOutline";

const useStyle = makeStyles((theme) => {
  return {
    root: {
    //   display: "flex",
        paddingLeft:'160px',
      //   width:'100%'
    },
    toolbar: theme.mixins.toolbar,
    
    children: {
      // background: "#f9f9f9",
      width: "100%",
    //   padding: theme.spacing(1),
    //   paddingLeft:'160px',
    },
  };
});

const Layout = ({ children }) => {
  const classes = useStyle();
  return (
    <div className={classes.root}>
      <Header drawerWidth={160} />
      <SideMenu drawerWidth={160} />

      <div>
        <div className={classes.children}>{children}</div>
      </div>
    </div>
  );
};

export default Layout;
