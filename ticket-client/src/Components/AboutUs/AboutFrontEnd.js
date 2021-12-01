import React from "react";
import { Grid, Typography, makeStyles, Avatar, Box } from "@material-ui/core";

import WebsiteFrame from "assets/Component 26.png";
import { ZoomableImg } from "Components";
import { useZoomHandle } from "hooks/useZoomHandle";
import ReactIcon from "assets/logos_react.svg";
import MuiIcon from "assets/logos_material-ui.svg";
const useStyles = makeStyles((theme) => {
  return {
    Panel: {
      border: "1px grey solid",
      borderRadius: "10px",
      padding: "20px 10px !important",
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
    inline: {
      display: "inline",
    },
    paragraph: {
      marginTop: "10px",
      textIndent: "2em",
      fontWeight: "400",
    },
  };
});

const AboutFrontEnd = () => {
  const classes = useStyles();
  const { open, handleClose, handleToggle } = useZoomHandle();
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h6">前端設計</Typography>
        </Grid>
        <Grid item xs={12} className={classes.Panel}>
          <Grid container>
            <Block>
              <Box>
                <Avatar
                  variant="square"
                  alt="icon"
                  src={ReactIcon}
                  style={{ width: "4rem", height: "auto" }}
                />
              </Box>
              <Typography
                color="primary"
                style={{
                  // verticalAlign: "middle",
                  display: "inline",
                  // alignItems: "center",
                  marginLeft: "10px",
                }}
              >
                React框架
              </Typography>
              <Paragraph>
                作為目前全世界最受歡迎的前端框架，React社群龐大，使用人數眾多。                JSX為React基於Javascript編寫的語法糖，結合Javascript與HTML的編寫模式，將網站功能元件化、模組化，泛用性廣。React藉由元件化的方式，增加代碼的重複利用效率，並協助程式人員完成元件組裝，達到快速架構功能性網站的目的。
              </Paragraph>
              <Paragraph>
                React利用Hook模式，拋棄過去須加入與移除多種Listener的模式，簡化網站的複雜度，有效提升撰寫、架設、運行的效率。
              </Paragraph>
              <Paragraph>
                由於React社群的活耀性，React技術支援十分迅速且有效，可避免一直陷於自己造輪子的階段。搭配各種豐富的樣板框架、開源的功能性元件，可以輕易組裝出各種功能性網站。
              </Paragraph>
              <Paragraph>
                近年來Electron的崛起，React與Electron的銜接度也極高，可以讓開發線上網站的同時，一鍵完成桌面版的開發，極高的增加開發效率。
              </Paragraph>
              <Paragraph>
                React與原生的Javascript/HTML/CSS並不衝突，所以對於舊式的網站功能也多能輕易銜接，也支援SCSS/SASS等多種樣式設計語法。React基於Webpack控制，因此也可藉由Webpack調整，利用ModuleFederation的幫助，與其他語系的模組整合，完成大型網站的設計與多人協作。
              </Paragraph>
            </Block>
            <Block>
              <Box>
                <Avatar
                  variant="square"
                  alt="Material UI Icon"
                  src={MuiIcon}
                  style={{ width: "4rem", height: "auto" }}
                />
              </Box>
              <Typography
                color="primary"
                style={{
                  verticalAlign: "middle",
                  display: "flex",
                  alignItems: "center",
                  marginLeft: "10px",
                }}
              >
                Material UI
              </Typography>

              <Paragraph>
                Material
                UI為基於React框架所設計的套件，提供多種基礎元件的樣式、功能，支援非常多網站所需的基礎功能，讓設計師能專注於功能、服務上的設計，減少重複造輪子的困擾。
              </Paragraph>
              <Paragraph>
                Material
                UI架如同Bootstrap，支援斷點系統、網格系統，可協助響應式網站的建構。但與Bootstrap不同的是，Materail
                UI基於Google Material Design的設計，對於Google
                Font、Icon與Material
                Design中常見的各種功能，支援性極強。使用者體驗也較為直覺。
              </Paragraph>
              <Paragraph>
                Material
                UI為基於React框架所設計的套件，提供多種基礎元件的樣式、功能，支援非常多網站所需的基礎功能，讓設計師能專注於功能、服務上的設計，減少重複造輪子的困擾。
              </Paragraph>

              <Paragraph>
                Material
                UI支援主題系統，可協助快速佈建不同風格的顏色、字體、背景主題，如夜間模式與白晝模式，減少重複開發的麻煩。Material
                UI支援React Transition
                Group，可以快速完成基本的進出動畫，有效增加使用者體驗。
              </Paragraph>
            </Block>
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

const Paragraph = ({ children }) => {
  return (
    <Typography
      style={{ textIndent: "2em", margin: "10px", fontWeight: "400" }}
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

export { AboutFrontEnd };
