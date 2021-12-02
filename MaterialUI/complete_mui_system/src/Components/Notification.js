import React from "react";
import { Snackbar, makeStyles } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
  root: {
    top: theme.spacing(9),
  },
}));

const Notification = ({ notify, setNotify, ...others }) => {
  const classes = useStyles();
  const handleClose = (event, reason) => {
    if (reason === "clickaway") return;
    setNotify({ ...notify, isOpen: false });
  };
  return (
    <Snackbar
      open={notify.isOpen}
      autoHideDuration={1000}
      onClose={handleClose}
      className={classes.root}
      anchorOrigin={{vertical:'top', horizontal:'right'}}
    >
      <MuiAlert elevation={6} variant="filled" severity={notify.type}  onClose={handleClose}>
        {notify.message}
      </MuiAlert>
    </Snackbar>
  );
};

export default Notification;
