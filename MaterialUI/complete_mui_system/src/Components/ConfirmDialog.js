import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  makeStyles,
  Typography,
  IconButton,
} from "@material-ui/core";
import { Button } from "./controls";
import NotListedLocationIcon from "@material-ui/icons/NotListedLocation";

const useStyles = makeStyles((theme) => ({
  dialogWrapper: {
    padding: theme.spacing(2),
    position: "absolute",
    top: theme.spacing(5),
  },
  dialogContent: {
    textAlign: "center",
  },
  dialogActions: {
    justifyContent: "center",
  },
  dialogTitle: {
    textAlign: "center",
  },
  titleIcon: {
    backgroundColor: theme.palette.secondary.light,
    color: theme.palette.secondary.main,
    "&:hover": {
      backgroundColor: theme.palette.secondary.light,
      cursor: "default",
    },
    "& .MuiSvgIcon-root": {
      fontSize: "8rem",
    },
  },
}));

const ConfirmDialog = ({ confirmDialog, setConfirmDialog, ...others }) => {
  const classes = useStyles();

  return (
    <Dialog
      open={confirmDialog.isOpen}
      classes={{ paper: classes.dialogWrapper }}
    >
      <DialogTitle className={classes.dialogTitle}>
        <IconButton disableRipple className={classes.titleIcon}>
          <NotListedLocationIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent className={classes.dialogContent}>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          {confirmDialog.title}
        </Typography>
        <Typography variant="subtitle2" style={{ flexGrow: 1 }}>
          {confirmDialog.subtitle}
        </Typography>
      </DialogContent>
      <DialogActions className={classes.dialogActions}>
        <Button text="No" color="default" onClick={()=>setConfirmDialog({...confirmDialog, isOpen:false})}/>
        <Button text="Yes" color="secondary" onClick={()=>{
            if(confirmDialog.onConfirm) confirmDialog.onConfirm()
            setConfirmDialog({...confirmDialog, isOpen:false})
        }}/>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
