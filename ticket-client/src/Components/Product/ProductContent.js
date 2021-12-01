import React from "react";
import { Grid, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => {
  return {
    root: {},
    img: {
      width: "100%",
    },
  };
});

const ProductContent = ({ ContentImg }) => {
  const classes = useStyles();
  return (
    <Grid container>
      {ContentImg &&
        ContentImg.map((i) => {
          return <img key={i} src={i} alt="Content Images" className={classes.img} />;
        })}
    </Grid>
  );
};

export { ProductContent };
