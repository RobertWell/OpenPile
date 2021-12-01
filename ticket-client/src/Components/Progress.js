import React from "react";
import { makeStyles } from "@material-ui/core";
import { CircularProgress, Backdrop } from "@material-ui/core";

const useStyle = makeStyles((theme) => {
    
  return {
    bar: {
        width: "100%",
        // '& > * + *':{
        //     marginTop:theme.spacing(2)
        // }
      },
      backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: "#fff",
      },
  }
});

const Progress = () => {
  const classes = useStyle();
  
  return (
    <Backdrop className={classes.backdrop} open>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export { Progress };
