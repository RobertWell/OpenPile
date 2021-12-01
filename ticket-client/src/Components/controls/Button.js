import React from "react";
import { Button as MuiButton, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(0.5),
  },
  label:{
      textTransform:'none'
  }
}));

const Button = ({ variant, size, color, onClick, text, ...others }) => {
  const classes = useStyles();
  return (
    <MuiButton
      classes={{root:classes.root, label:classes.label}}
      variant={variant || "contained"}
      size={size || "large"}
      color={color || "primary"}
      onClick={onClick}
      {...others}
    >
      {text}
    </MuiButton>
  );
};

export { Button };
