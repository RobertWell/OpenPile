import React from "react";
import {  Typography, Card } from "@material-ui/core";

import { makeStyles } from "@material-ui/styles";

const useStyle = makeStyles((theme) => {
  return {
    root: {
      // width: "100%",
      // backgroundColor: "#fdfdff",
      borderRadius: 0,
    },
    pageHeader: {
      padding: theme.spacing(4),
      display: "flex",
      marginBottom: theme.spacing(2),
      borderRadius: 0,
    },
    pageIcon: {
      display: "inline-block",
      padding: theme.spacing(2),
      color: "#3c44b1",
    },
    pageTitle: {
      paddingLeft: theme.spacing(4),
      "& .MuiTypography-subtitle2": {
        opacity: 0.6,
      },
    },
    media: {
      height: "500px",
      backgroundPosition: '0 80%'
      // paddingBottom: "56.3%", // 16:9,
      // maxHeight:'100px'
      // transform :"translate( 0,-120px)"
    },
    // imageContainer: {
    //   overflow: "hidden",
    //   height: "300px",
    //   width: "100%",
    // },
    // imageController: {
    //   // position: "absolute",
    // },
  };
});
const PageHeader = ({ title, subTitle = null,icon }) => {
  const classes = useStyle();
  return (
    <Card className={classes.root} elevation={0}>
      
      <div className={classes.pageHeader}>
      <Card className={classes.pageIcon}>{icon}</Card>
      <div className={classes.pageTitle}>
      <Typography variant="h6" component="div">
            {title}
          </Typography>
          <Typography variant="subtitle2" component="div">
            {subTitle}
          </Typography>
      </div>
       </div>
    </Card>
  );
};

export default PageHeader;
