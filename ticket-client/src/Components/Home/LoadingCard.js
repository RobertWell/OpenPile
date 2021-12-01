import React from "react";
import Skeleton from "@material-ui/lab/Skeleton";
import { Grid } from "@material-ui/core";
const LoadingCard = () => {
  return (
    <Grid item container xs={12} spacing={2}>
      {[...new Array(12)].map((d, i) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={i}>
          <Skeleton variant="rect" height={118} />
          <Skeleton variant="circle" width={40} height={40} />
          <Skeleton variant="text" />
        </Grid>
      ))}
    </Grid>
  );
};

export { LoadingCard };
