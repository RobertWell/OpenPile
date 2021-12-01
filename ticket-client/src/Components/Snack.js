import { useEffect, useState } from "react";
import { Snackbar } from "@material-ui/core";

import { useActions } from "hooks/useActions";
import { Alert } from "@material-ui/lab";
import { useSelector } from "react-redux";

// message structure: {message:string, state: string, key: new Date().getTime()}

function Snack() {
  const [open, setOpen] = useState(false);
  const [messageInfo, setMessageInfo] = useState(undefined);
  const { pop_message } = useActions();
  const messages = useSelector((state) => state.message);

  useEffect(() => {
    if (messages.length && !messageInfo) {
      setMessageInfo({ ...messages[0] });
      pop_message();
      setOpen(true);
    } else if (messages.length && messageInfo && open) {
      setOpen(false);
      handleExited();
    }
  }, [messages, messageInfo, open, pop_message]);

  const handleClose = (reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
    handleExited();
  };

  const handleExited = () => {
    setMessageInfo(undefined);
  };
  return (
    <Snackbar
      key={messageInfo ? messageInfo.key : undefined}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      open={open}
      autoHideDuration={3000}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity={messageInfo && messageInfo.state}>
        {messageInfo && messageInfo.message}
      </Alert>
    </Snackbar>
  );
}

export { Snack  };
