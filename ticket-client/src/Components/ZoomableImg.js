import React from "react";
import {
  makeStyles,
  Backdrop,
} from "@material-ui/core";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";


const useStyles = makeStyles((theme) => {
  return {
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: "#fff",
    },
    Zoomable: {
      cursor: "zoom-in",
      backgroundColor:"white"
    },
  };
});
const ZoomableImg = ({ children, open, handleClose }) => {
  const classes = useStyles();
  return (
    <>
      {children}
      <Backdrop
        open={open}
        className={`${classes.backdrop} ${classes.Zoomable}`}
        onClick={handleClose}
      >
        <TransformWrapper>
          <TransformComponent>{children}</TransformComponent>
        </TransformWrapper>
      </Backdrop>
    </>
  );
};

export { ZoomableImg };
