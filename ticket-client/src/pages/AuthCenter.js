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

import { useActions } from "hooks/useActions";

import { IdentityDetail, PurchasingList, ChangePassword } from "Components";

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

const AuthCenter = () => {
  const classes = useStyles();
  const { sign_out } = useActions();
  const history = useHistory();
  const location = useLocation();
  const SignOutHandler = () => {
    sign_out();
    history.push("/");
  };

  

  const BreadList = {
    "/identity": { text: "個人資料", path: "/identity" },
    "/identity/purchasing_list": {
      text: "訂單紀錄",
      path: "/identity/purchasing_list",
    },

    "/identity/change_password": {
      text: "變更密碼",
      path: "/identity/change_password",
    },
  };
  const loc = BreadList[history.location.pathname];

  return (
     <Container>

          <Grid container spacing={2} item xs={12}>
            <Grid item xs={12}>
              <Breadcrumbs separator="›" aria-label="breadcrumb">
                <Link href="/identity">會員中心</Link>
                <Link href={loc["path"]}>{loc["text"]}</Link>
              </Breadcrumbs>
            </Grid>

            <Grid item xs={12} sm={4} md={3}>
              <MenuList className={classes.Menu}>
                <MenuItem
                  disabled
                  disableRipple
                  classes={{ root: classes.HeadItem }}
                  style={{ opacity: "1" }}
                >
                  會員中心
                </MenuItem>
                <MenuItem
                  disableRipple
                  selected={location.pathname === "/identity"}
                  onClick={() => {
                    history.push("/identity");
                  }}
                >
                  個人資料
                </MenuItem>
                <MenuItem
                  disableRipple
                  selected={location.pathname === "/identity/purchasing_list"}
                  onClick={() => {
                    history.push("/identity/purchasing_list");
                  }}
                >
                  訂單紀錄
                </MenuItem>
                <MenuItem
                  disableRipple
                  selected={location.pathname === "/identity/change_password"}
                  onClick={() => {
                    history.push("/identity/change_password");
                  }}
                >
                  變更密碼
                </MenuItem>
                <MenuItem disableRipple onClick={SignOutHandler}>
                  登出
                </MenuItem>
              </MenuList>
            </Grid>
            <Grid item xs={12} sm={8} md={9}>
              <Grid container>
                <Switch>
                  <Route path="/identity/purchasing_list">
                    <PurchasingList />
                  </Route>
                  <Route path="/identity/change_password">
                    <ChangePassword />
                  </Route>
                  <Route path="/identity">
                    <IdentityDetail />
                  </Route>
                </Switch>
              </Grid>
            </Grid>
          </Grid>


     </Container>
  );
};

// const AuthCenterPanel = () => {
//   return (
//     <Grid item container spacing={2}>
//       <Grid item></Grid>
//     </Grid>
//   );
// };

export default AuthCenter;
