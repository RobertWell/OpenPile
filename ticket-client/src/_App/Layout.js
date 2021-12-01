import {
  makeStyles,
  useMediaQuery,
  useTheme,
  // Container,
  Fab,
  
} from "@material-ui/core";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
// import { makeStyles } from '@material-ui/styles';
import React from "react";
import Header from "./_Layout/Header";
import Footer from "./_Layout/Footer";
import BackToTop from "./_Layout/BackToTop";
import { useSelector } from "react-redux";
import { FirstVisitDialog } from "Components";

const useStyle = makeStyles((theme) => {
  return {
    root: {
      // paddingLeft: 0,
      // backgroundColor:"black"
    },
    // toolbar: theme.mixins.toolbar,
    container: ({ matches }) => ({
      // width: "100%",
      marginTop: matches ? "120px" : "125px",
      minHeight: "80vh",
    }),
  };
});

const Layout = ({ children }) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("xs"));
  const classes = useStyle({ matches });
  const auth = useSelector((state) => state.auth);

  return (
    <div className={classes.root} >
      <Header
        drawerWidth={240}
        user={auth}
        anchor={"left"}
        
      />
      <div id="back-to-top-anchor"/>
  
      <div
       className={classes.container}
       >{children}</div>
      <Footer />
      <BackToTop>
        <Fab color="secondary" size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </BackToTop>
      <FirstVisitDialog />
    </div>
  );
};

export default Layout;
