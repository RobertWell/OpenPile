import React from "react";
import {
  Grid,
  Typography,
  makeStyles,
} from "@material-ui/core";
import CatImg from "assets/kate-stone-matheson-uy5t-CJuIK4-unsplash.jpg";
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

const DutyFree = () => {
  const classes = useStyles();
  const { open, handleClose, handleToggle } = useZoomHandle();
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h6">免責聲明</Typography>
        </Grid>

        <Grid item xs={12} className={classes.Panel}>
          <Grid container>
            <Block>
              <Paragraph>※ 本站為展示用網站，請勿輸入敏感性資料。 </Paragraph>
              <Paragraph>
                ※
                任何購買行為操作、功能性與暗示性文字敘述，均不具法律所有權轉移、買賣行為之有效性。
              </Paragraph>
          
              <Paragraph>
                ※
                本網頁所載的所有商品刊載之圖片均以免費圖庫所有，本站不具所有權。
              </Paragraph>
              <Paragraph>
                ※
                本網頁所載之資料、商標、標誌、圖像、連結及其他資料等，將會隨時更改，並由本站決定而不作另行通知。
              </Paragraph>
              <Paragraph>
                ※
                本站所有商品、價格、敘述等均為展示輔助用，均不具任何指涉、暗示、宣傳含意。如有不妥，歡迎聯絡告知並會下架該商品。{" "}
              </Paragraph>
              
            </Block>
          </Grid>
        </Grid>
        <Grid item onClick={handleToggle}>
          <ZoomableImg open={open} handleClose={handleClose}>
            <img
              src={CatImg}
              alt="test"
              className={`${classes.Img} ${classes.Zoomable}`}
            />
          </ZoomableImg>
        </Grid>
      </Grid>
    </>
  );
};

const Paragraph = ({ children }) => {
  const ind='1.25em'
  return (
    <Typography
    
      style={{
        
        textIndent: "-"+ind,
        // margin: "10px",
        fontWeight: "400",
        marginLeft: ind,
      }}
    >
      {children}
    </Typography>
  );
};


const Block = ({ children }) => {
  return (
    <Grid
      item
      xs={12}
      container
      alignItems="center"
      alignContent="center"
      style={{ padding: "10px" }}
    >
      {children}
    </Grid>
  );
};
export { DutyFree };
