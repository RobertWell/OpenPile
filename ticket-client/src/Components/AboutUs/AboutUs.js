import React from "react";
import {
  Grid,
  Typography,
  makeStyles,
  Avatar,
  Box,

} from "@material-ui/core";
import HeadImg from "assets/jae-park-7GX5aICb5i4-unsplash.jpg";
import Language from "assets/Language.png";
import { ZoomableImg } from "Components";
import { useZoomHandle } from "hooks/useZoomHandle";
const useStyles = makeStyles((theme) => {
  return {
    Panel: {
      border: "1px grey solid",
      borderRadius: "10px",
      padding: "20px 10px !important",
      marginBottom: "10px",
    },
    Img: {
      maxWidth: "100%",
      height: "auto",
      backgroundColor: "lightgrey",
      margin: "auto",
      transition: "transform 0.3s",
    },
    HeadImg: {
      // boxShadow:"1px solid grey"
      width: theme.spacing(10),
      height: theme.spacing(10),
    },

    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: "#fff",
    },
    Zoomable: {
      cursor: "zoom-in",
    },
  };
});

const AboutUs = () => {
  const classes = useStyles();
  const { open, handleClose, handleToggle } = useZoomHandle();

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h6">關於作者</Typography>
        </Grid>

        <Grid item xs={12} className={classes.Panel}>
          <Grid container>
            <Grid
              item
              xs={12}
              md={2}
              container
              justifyContent="center"
              alignItems="center"
            >
              <Box textAlign="center">
                <Avatar
                  alt="作者照片"
                  src={HeadImg}
                  className={`${classes.Img} ${classes.HeadImg}`}
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={10}>
              <Typography>姓名：Robert Lin</Typography>
              <Typography>性別：男</Typography>
              <Typography>從業經驗: 1年半</Typography>              
              <Typography>
                擅長語言: Javascript/Typescript, Python, JAVA
              </Typography>
              <Typography>Email: cheeagno@gmail.com</Typography>
            </Grid>
            <Grid item onClick={handleToggle}>
              <ZoomableImg open={open} handleClose={handleClose}>
                <img
                  src={Language}
                  alt="test"
                  className={`${classes.Img} ${classes.Zoomable}`}
                />
              </ZoomableImg>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export { AboutUs };
