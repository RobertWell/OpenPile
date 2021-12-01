import React from "react";
import {
  Grid,
  Avatar,
  Typography,
  makeStyles,
  useTheme,
  useMediaQuery,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => {
  return {
    title: {
      fontSize: ({upSM}) => (upSM ? "18px" : "10px"),
    },
    optionKey: {
      fontSize:({upSM}) => (upSM ? "18px" : "10px"),
      color: "grey",
    },
    number: {
      fontSize:({upSM}) => (upSM ? "18px" : "10px"),
      color: "grey",
    },
    price: {
      fontSize: ({upSM}) => (upSM ? "18px" : "10px"),
      color: "grey",
    },
    large: {
      width: theme.spacing(7),
      height: theme.spacing(7),
    },
    small: {
      width: theme.spacing(3),
      height: theme.spacing(3),
    },
  };
});

const OrderShowMD = ({ snapshot }) => {
  const theme = useTheme();
  const upSM = useMediaQuery(theme.breakpoints.up("sm"));
  const classes = useStyles({ upSM });
  return (
    <Grid item container spacing={2} xs={12} style={{ margin: "2px" }}>
      <Grid item xs={4}>
        <Avatar
          variant={"square"}
          src={snapshot.thumbnail}
          className={classes.large}
        />
      </Grid>
      <Grid
        item
        xs={8}
        container
        justifyContent="space-between"
        className={"Panel"}
      >
        <Grid item xs={12}>
          <Typography className={classes.title}>{snapshot.title}</Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography className={classes.optionKey}>
            {snapshot.optionKey}
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography align="right" className={classes.number}>
            x {snapshot.number}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography align="right" className={classes.price}>
            TWD$ {snapshot.price}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

export { OrderShowMD };
