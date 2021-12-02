import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { ActionButton } from "./controls";
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
  dialogWrapper: {
    padding: theme.spacing(2),
    position: "absolute",
    top: theme.spacing(5),
  },
  dialogTitle: {
    paddingRight: 0,
  },
}));

const Popup = ({ title, children, openPopup, setOpenPopup, ...others }) => {
  const classes = useStyles();
  
  return (
    <Dialog
      classes={{ paper: classes.dialogWrapper }}
      open={openPopup}
      onClose={() => setOpenPopup(!openPopup)}
      maxWidth="md"
    >
      <DialogTitle className={classes.dialogTitle}>
        <div style={{ display: "flex" }}>
          <Typography variant="h6" componet="div" style={{ flexGrow: 1 }}>
            {title}
          </Typography>
          <ActionButton
            color="secondary"
            onClick={() => setOpenPopup(!openPopup)}
          >
            <CloseIcon />
          </ActionButton>
        </div>
      </DialogTitle>
      <DialogContent dividers>{children}</DialogContent>
    </Dialog>
  );
};

export default Popup;
