import React from "react";
import {
  Grid,
  Typography,
  makeStyles,
} from "@material-ui/core";
import WebsiteFrame from "assets/Component 25.png";
import { ZoomableImg } from "Components";
import { useZoomHandle } from "hooks/useZoomHandle";

const useStyles = makeStyles((theme) => {
  return {
    Panel: {
      border: "1px grey solid",
      borderRadius: "10px",
      padding: "20px 30px !important",
      marginBottom: "10px",
    },
    Img: {
      maxWidth: "80%",
      height: "auto",
      // backgroundColor: "lightgrey",
      margin: "auto",
      transition: "transform 0.3s",
    },
    HeadImg: {
      // boxShadow:"1px solid grey"
      width: theme.spacing(10),
      height: theme.spacing(10),
      // backgroundColor:"white"
    },

    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: "#fff",
    },
    Zoomable: {
      cursor: "zoom-in",
    },
    Text:{
      fontWeight:"400",
      marginTop:"10px"
    }
  };
});

const AboutThisWebsite = () => {
  const classes = useStyles();
  const { open, handleClose, handleToggle } = useZoomHandle();
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h6">關於本站</Typography>
        </Grid>

        <Grid item xs={12} className={classes.Panel} >
          <Grid container>
            <Grid item xs={12}>



              

                <Paragraph>
                  本網站為MERN架構的樣板網站，前端使用React + Material
                  UI，後端使用Node + Express + Docker架構。
                </Paragraph>
                <Paragraph>
                  前端藉由React與Material
                  UI的性質，實現快速的排版、物件綁定，整合後端功能且將其放大。利用有效的功能安排，減輕後端壓力，實現電商網站的功能。
                </Paragraph>
                <Paragraph>
                  {" "}
                  後端為經典Node + Express ，加上
                  Docker + Kubernete佈局，設計與製作上，雖較單一節點伺服器更複雜，但利用Docker便於架設的特性與Kubernete的框架，
                  可依需求、使用人數調整節點數量，實現伺服器分流與負載均衡的功能，規避節點失效的風險。
                </Paragraph>
                <Paragraph style={{textIndent:0}}>
                  ※ 本網站架設於Digital Ocean，僅為展示用。每個節點均只有單一Replica，請勿自行作壓力測試，感謝！
                </Paragraph>

            </Grid>
          </Grid>
        </Grid>

        <Grid item onClick={handleToggle}>
          <ZoomableImg open={open} handleClose={handleClose}>
            <img
              src={WebsiteFrame}
              alt="test"
              className={`${classes.Img} ${classes.Zoomable}`}
            />
          </ZoomableImg>
        </Grid>
      </Grid>
    </>
  );
};

const Paragraph = ({ children, ...others }) => {
  const classes = useStyles()
  return (
    <Typography variant='body1' className={classes.Text} style={{textIndent:"2em"}} {...others}>{children}</Typography>
  );
};

export { AboutThisWebsite };
