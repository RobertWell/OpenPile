import React from "react";
import {
  makeStyles,
  Grid,
  Typography,
  AppBar,
  Toolbar,
  Icon,
  Link,
} from "@material-ui/core";
import FB from "assets/facebook.svg";
import IG from "assets/instagram.svg";
import Twitter from "assets/twitter.svg";
import { Copyright } from "Components";
const useStyle = makeStyles(() => {
  return {
    Footer: {
      backgroundColor: "black",
      margin: "30px 0 0 0",
    },
    Bar: {
      backgroundColor: "black",
      padding: "70px 20px",
      margin: 0,
    },
    Bar2: {
      backgroundColor: "black",
    },
    Title: {
      fontWeight: "700",
    },
    Name: {
      fontWeight: "100",
    
    },
    imageIcon: {
      height: "100%",
    },
    link:{
      textDecoration:"none",
      color:'inherit',
      "&:hover":{
        textDecoration:"inherit",
      }
    }
  };
});
const Title = ({ content, to="#" }) => {
  const classes = useStyle();
  return (
    <Typography variant="body1" className={classes.Title}>
      <Link href={to} className={classes.link}>{content}</Link>
    </Typography>
  );
};

const Subtitle = ({ content, to="#" }) => {
  const classes = useStyle();
  return (
    <Typography variant="body2" className={classes.Name}>
      <Link href={to}  className={classes.link}>{content}</Link>
    </Typography>
  );
};

const Footer = () => {
  const classes = useStyle();
  return (
    <AppBar position="static" className={classes.Footer}>
      {/* <Container maxWidth="lg"> */}
      <Toolbar className={classes.Bar}>
        <Grid container spacing={2} justifyContent='center'>
          <Grid item container  xs={12} md={9} spacing={2} justifyContent='center'>
            <Grid
              item
              container
              md={4}
              sm={6}
              xs={12}
              direction="column"
              spacing={2}
              alignItems="center"
            >
              <Grid item>
                <Title content="關於我們" to='/AboutUs'/>
              </Grid>
              <Grid item>
                <Subtitle content="關於作者"  to='/AboutUs'/>
              </Grid>
              <Grid item>
                <Subtitle content="關於本站" to='/AboutUs/this_website'/>
              </Grid>
            </Grid>
 
            <Grid
              item
              container
              md={4}
              sm={6}
              xs={12}
              direction="column"
              spacing={2}
              alignItems="center"
            >
              <Grid item>
                <Title content="本站介紹" to="/AboutUs/this_website"/>
              </Grid>
              <Grid item>
                <Subtitle content="前端設計" to="/AboutUs/frontend"/>
              </Grid>
              <Grid item>
                <Subtitle content="後端設計" to="/AboutUs/backend"/>
              </Grid>
            </Grid>
            <Grid
              item
              container
              md={4}
              sm={6}
              xs={12}
              direction="column"
              spacing={2}
              alignItems="center"
            >
              <Grid item>
                <Title content="條款與政策" to='/AboutUs/this_website'/>
              </Grid>
              <Grid item>
                <Subtitle content="免責聲明" to="/AboutUs/DutyFree"/>
              </Grid>      
            </Grid>
          </Grid>
          
          <Grid
            container
            item
            xs={12}
            md={3}
            alignItems="center"
            justifyContent="center"
            spacing={2}
          >
            <Grid item>
              <Icon>
                <img className={classes.imageIcon} src={IG} alt="Instagram" />
              </Icon>
            </Grid>
            <Grid item>
              <Icon>
                <img className={classes.imageIcon} src={FB} alt="Facebook" />
              </Icon>
            </Grid>
            <Grid item>
              <Icon>
                <img
                  className={classes.imageIcon}
                  src={Twitter}
                  alt="Twitter"
                />
              </Icon>
            </Grid>
          </Grid>
        </Grid>
      </Toolbar>
      <Toolbar className={classes.Bar2} variant="dense">
        <Grid>
          <Copyright color="white" />
        </Grid>
      </Toolbar>
      {/* </Container> */}
    </AppBar>
  );
};

export default Footer;
