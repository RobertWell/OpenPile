import React from "react";
import { Grid, Typography, Avatar } from "@material-ui/core";
const OrderShow = ({ snapshot }) => {
  return (
    <Grid container item xs={12} spacing={2} alignItems="center">
      <Grid item xs={1}>
        <Avatar variant={"square"} sizes={"small"} src={snapshot.thumbnail} />
      </Grid>

      <Grid item xs={3}>
        <Typography>{snapshot.title}</Typography>
      </Grid>
      <Grid item xs={1}>
        <Typography>{snapshot.optionKey}</Typography>
      </Grid>
      <Grid item xs={1}>
        <Typography>{snapshot.number}</Typography>
      </Grid>
      <Grid item xs={2}>
        <Typography>{snapshot.price}</Typography>
      </Grid>
      <Grid item xs={2}>
        <Typography>{snapshot.number * snapshot.price}</Typography>
      </Grid>
    </Grid>
  );
};

export { OrderShow };
