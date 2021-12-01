import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import { useFirstVisit } from "hooks/useFirstVisit";

const FirstVisitDialog = () => {
  const { viewPopup, handleClose } = useFirstVisit();
  return (
    <Dialog open={viewPopup} onClose={handleClose} PaperComponent={Paper}>
      <DialogTitle style={{ cursor: "move" }}>關於本站</DialogTitle>
      <DialogContent>
        <DialogContentText>
          <Typography>※ 本站為展示用網站，請勿輸入敏感性資料。</Typography>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleClose} color="primary">
          確定
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export { FirstVisitDialog };
