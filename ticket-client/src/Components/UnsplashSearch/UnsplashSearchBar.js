import React, { useState } from "react";
import {
  TextField,
  Grid,
  Button,
  CssBaseline,
  makeStyles,

} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    // margin: theme.spacing(0.5),
    width: "100%",
  },
  textField: {
    // flexGrow: 1,
    // width:"100%"
  },
}));

const UnsplashSearchBar = ({ submitHandler, hideHandler, hide }) => {
  const [input, setInput] = useState("");
  // const [error, setError] = useState("");
  const clickHandler = (e) => {
    e.preventDefault();
    submitHandler(input);
  };
  const classes = useStyles();
  return (
    <>
      <CssBaseline />
      <Grid
        container
        spacing={2}
        alignItems="center"
        classes={{ root: classes.root }}
      >
        <Grid item style={{ flexGrow: 1 }} className={classes.textField}>
          <TextField
            variant="outlined"
            onChange={(e) => setInput(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item>
          <Button onClick={clickHandler} variant="outlined" size="large">
            Submit
          </Button>
        </Grid>
        <Grid item>
          <Button
            onClick={hideHandler}
            variant={hide ? "outlined" : "contained"}
            size="large"
            color="secondary"
          >
            {hide?"Show":"Hide"}
          </Button>
        </Grid>
      </Grid>
    </>
  );
};
export { UnsplashSearchBar };
