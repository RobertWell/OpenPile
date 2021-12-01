import React from "react";
import {
  Container,
  Grid,
  Paper,
  Breadcrumbs,
  Link,
  MenuList,
  MenuItem,
  makeStyles,
} from "@material-ui/core";
import { Switch, Route, useLocation, useHistory } from "react-router-dom";
import {
  AboutBackEnd,
  AboutUs as About,
  AboutFrontEnd,
  AboutThisWebsite,
  DutyFree,
} from "Components";
const BreadList = {
  "/AboutUs": { text: "關於作者", path: "/AboutUs" },
  "/AboutUs/this_website": {
    text: "關於本站",
    path: "/AboutUs/this_website",
  },
  "/AboutUs/DutyFree": {
    text: "免責聲明",
    path: "/AboutUs/DutyFree",
  },

  "/AboutUs/frontend": {
    text: "前端設計",
    path: "/AboutUs/frontend",
  },
  "/AboutUs/backend": {
    text: "後端設計",
    path: "/AboutUs/backend",
  },
};

const useStyles = makeStyles(() => {
  return {
    HeadItem: {
      color: "black",
      background: "#E8E8E8",
      opacity: "0.5",
      border: "1px solid grey",
    },
    Menu: {
      // border: "1px solid grey",

      padding: 0,
      "& li:not(:first-child)": {
        borderBottom: "1px solid grey",
        borderLeft: "1px solid grey",
        borderRight: "1px solid grey",
        // color:"red"
      },

      "& li.Mui-selected,li.Mui-selected:hover": {
        color: "white",
        background: "black",
        borderLeft: "1px solid black",
        borderRight: "1px solid black",
        // fontColor:"white"
      },
    },
    Item: {
      border: "1px solid grey",
    },
  };
});

const AboutUs = () => {
  const classes = useStyles();

  const history = useHistory();
  const location = useLocation();
  const loc = BreadList[history.location.pathname];
  return (
    <Container>
      {/* // <Paper > */}
      {/* <Container> */}
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Breadcrumbs separator="›" aria-label="breadcrumb">
            <Link href="/AboutUs">關於我們</Link>
            <Link href={loc["path"]}>{loc["text"]}</Link>
          </Breadcrumbs>
        </Grid>

        <Grid item xs={12} sm={4} md={3}>
          <Container>
            <MenuList className={classes.Menu}>
              <MenuItem
                disabled
                disableRipple
                classes={{ root: classes.HeadItem }}
                style={{ opacity: "1" }}
              >
                關於我們
              </MenuItem>
              <MenuItem
                disableRipple
                selected={location.pathname === "/AboutUs"}
                onClick={() => {
                  history.push("/AboutUs");
                }}
              >
                關於作者
              </MenuItem>
              <MenuItem
                disableRipple
                selected={location.pathname === "/AboutUs/DutyFree"}
                onClick={() => {
                  history.push("/AboutUs/DutyFree");
                }}
              >
                免責聲明
              </MenuItem>
              <MenuItem
                disableRipple
                selected={location.pathname === "/AboutUs/this_website"}
                onClick={() => {
                  history.push("/AboutUs/this_website");
                }}
              >
                關於本站
              </MenuItem>

              <MenuItem
                disableRipple
                selected={location.pathname === "/AboutUs/frontend"}
                onClick={() => {
                  history.push("/AboutUs/frontend");
                }}
              >
                前端設計
              </MenuItem>
              <MenuItem
                disableRipple
                selected={location.pathname === "/AboutUs/backend"}
                onClick={() => {
                  history.push("/AboutUs/backend");
                }}
              >
                後端設計
              </MenuItem>
            </MenuList>
          </Container>
        </Grid>

        <Grid item xs={12} sm={8} md={9}>
          <Container>
            {/* <Grid container> */}
            <Switch>
              <Route path="/AboutUs/backend">
                <AboutBackEnd />
              </Route>
              <Route path="/AboutUs/frontend">
                <AboutFrontEnd />
              </Route>
              <Route path="/AboutUs/this_website">
                <AboutThisWebsite />
              </Route>
              <Route path="/AboutUs/DutyFree">
                <DutyFree />
              </Route>
              <Route path="/AboutUs">
                <About />
              </Route>
            </Switch>
            {/* </Grid> */}
          </Container>
        </Grid>
      </Grid>
      {/* </Container> */}
      {/* </Paper> */}
    </Container>
  );
};

export default AboutUs;
