import React from "react";

import { Card } from "@material-ui/core";
import { Paper, makeStyles, Typography } from "@material-ui/core";
const useStyle = makeStyles((theme) => {
  return {
    root: {
      width: "100%",
      backgroundColor: "#fdfdff",
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
  };
});
const PageHeader = ({ icon, title, subTitle }) => {
  const classes = useStyle();
  return (
    <Paper className={classes.root} elevation={1}>
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
    </Paper>
  );
};

export default PageHeader;
