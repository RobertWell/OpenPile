import  { useState } from "react";

const useZoomHandle = () => {
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };

  return { open, handleClose, handleToggle };
};

export  {useZoomHandle};
