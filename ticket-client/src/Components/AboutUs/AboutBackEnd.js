import React from "react";
import { Grid, Typography, makeStyles, Avatar, Box } from "@material-ui/core";

import WebsiteFrame from "assets/Component 43.png";
import DockerImg from "assets/Component 48.png";
import DockerImg2 from "assets/Component 51.png";
import DockerIcon from "assets/vscode-icons_file-type-docker.svg";
import NodeIcon from "assets/logos_nodejs.svg";
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
    title: {
      verticalAlign: "middle",
      display: "inline-flex",
    },
  };
});

const AboutBackEnd = () => {
  const classes = useStyles();
  const {
    open: open3,
    handleClose: handleClose3,
    handleToggle: handleToggle3,
  } = useZoomHandle();
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h6">後端設計</Typography>
        </Grid>
        <Grid item xs={12} className={classes.Panel}>
          <Grid container>
            <Block>
              <Box>
                <Avatar
                  variant="square"
                  alt="icon"
                  src={NodeIcon}
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
                Node + Express
              </Typography>

              <Paragraph>
                由於Javascript是前端開發的主流語言，
                作為基於Javascript而設計的後端平台，Node使用人數非常廣。以Node作為後端平台，可以非常簡潔的架構出單一節點的伺服器，且由於其跨平台的優勢，可以在各種作業系統上使用。
              </Paragraph>

              <Paragraph>
                Express是Node.js製作的網站框架，由於其體積小、架構精簡，而基於其Javascript的特性，具有相當豐富的JS模組庫，彼此相容性也極高。因此，雖然本身功能不多，卻最為適合作為搭建Docker節點的Node框架。
              </Paragraph>
            </Block>

            <Block>
              <Box>
                <Avatar
                  variant="square"
                  alt="icon"
                  src={DockerIcon}
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
                Docker、Kubernetes與微服務
              </Typography>

              <Paragraph>
                由於現代網站功能性越來越多，後端伺服器的支援也相對複雜。以當前能建立伺服器種類，或相關的封裝套件。軟體工程師雖然多，但想找到一群同樣技能的人卻有其困難度。因此伺服器容器化變得非常重要。
              </Paragraph>
              <Paragraph>
                Docker作為容器的虛擬機，可以在各平台建立獨立的環境讓Server運作。搭配Kubernetes或Docker本身支援的Docker-compose，可快速佈建不同的伺服器，並藉由內部或外部的Event-bus交流，從而形成伺服器叢集。Kubernetes能自動依據Server需求與實體機量能建立節點。
              </Paragraph>
            </Block>
            <Block>
              <img
                src={DockerImg}
                alt="Docker Image"
                className={`${classes.Img} `}
                style={{ width: "100%" }}
              />
            </Block>
            <Block>
              <Paragraph>
                除了將獨立功能從單一伺服器拆解之外，還能依據訪問需求將功能拆解。如本站需要的訪問需求：商品(Product)、購物車物品(Ticket)、帳單(Order)、付款結帳(Payment)等等，彼此非獨立的功能，但為了未來可能的負載均衡需求，而分別拆開。
              </Paragraph>

              <Paragraph>
                此設計增加了非常多難度，包含資料庫的版本控制、伺服器之間的訊號規格等等，需要非常多的考量，但優勢便在於，未來若須因應不同功能的負載能力增加(如商品、購物車物品訪問次數明顯會高於帳單與結帳系統)，可以單獨增強需要的節點，以此增加伺服器的使用效率。
              </Paragraph>

              <Paragraph>
                針對多人後端開發，也可藉此將功能拆開交給不同的人製作，進而將不同架構、功能的伺服器互相串聯，減少重複性功能的伺服器再開發的困擾，也能納入不同伺服器的優點，如Flask對Python套件的支援。
              </Paragraph>
            </Block>
            <Block>
              <img
                src={DockerImg2}
                alt="Docker Image"
                className={`${classes.Img} `}
                style={{ width: "30%" }}
              />
            </Block>
          </Grid>
        </Grid>

        <Grid item onClick={handleToggle3}>
          <ZoomableImg open={open3} handleClose={handleClose3}>
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

export { AboutBackEnd };
