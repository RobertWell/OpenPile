import {
  AppBar,
  Toolbar,
  Grid,
  Collapse,
  Container,
  useMediaQuery,
  useTheme,
  Typography,
  CssBaseline,
  Link,
} from "@material-ui/core";
import { CustomTabber } from "./CustomTabs";
import { makeStyles } from "@material-ui/styles";
import "./index.scss";
import React, { useState, useEffect } from "react";
import LogButton from "./LogButton";
import Brand from "assets/burn-512.png";
import { useSelector } from "react-redux";
import {
  BarSearch,
  MenuButton,
  BrandIcon,
  ShoppingCart,
  IdentityIcon,
  AboutIcon,
} from "Components";

const useStyle = makeStyles((theme) => {
  return {
    appbar: ({ elevation }) => {
      return {
        // width: `calc(100% - ${drawerWidth}px)`,

        // marginLeft: drawerWidth,
        color: theme.palette.third.contrastText,
        // backgroundColor: theme.palette.third.light,
        backgroundColor: elevation ? "transparent" : theme.palette.third.light,
        // opacity: elevation ? 0.4 : 1,

        //此處不可用transition + all!!!!
        //Material ui的Popover會觸發!!!!
        // transition: " all 1s ease-out",
        transitionProperty: "background-color",
        transitionTimingFunction: "ease-out",
        transitionDuration: "1s",
        "&:hover, &:focus-within": {
          opacity: "1",
        },
        // backgroundColor: "white",
      };
    },
    toolbar: {
      borderBottom: "2px solid black",
      minHeight:0
    },
    grid_container: {
      // borderBottom: "2px solid black",
    },
    middle: {
      flexGrow: 1,
    },

    btnRoot: {
      backgroundColor: "green",
    },
    btnLabel: {
      backgroundColor: "red",
    },
    Tabs: {
      // maxWidth:"300px"
    },
    Link: {
      textDecoration: "none",
      color: "black",

      "&:hover": {
        textDecoration: "none",
        color: "black",
      },
    },
  };
});

const CustomAppBar = ({
  drawerWidth,
  elevation,
  handleDrawer,
  GroupList,
  setTabItem,
  user,
  ...others
}) => {
  const classes = useStyle({ drawerWidth, elevation });
  const theme = useTheme();
  // const matchesMD = useMediaQuery(theme.breakpoints.up("md"));
  // console.log('------matchesMD', matchesMD);
  const matches = useMediaQuery(theme.breakpoints.down("sm"));
  // console.log('------matches', matches);
  // const matchesXS = useMediaQuery(theme.breakpoints.down("xs"));
  const [value, setValue] = useState(false);
  const tickets = useSelector((state) => state.ticket);
  // console.log(tickets.length);
  useEffect(() => {
    setTabItem(value);
  }, [value]);
  return (
    <AppBar elevation={elevation} {...others} className={classes.appbar}>
      <Container maxWidth="lg">
        <Collapse in={elevation === 0}>
          <Toolbar variant={"dense"} >
            <Grid
              container
              spacing={2}
              alignItems="center"
              className={classes.grid_container}
            >
              <Grid item>
                <BrandIcon Brand={Brand} open={elevation === 0} />
              </Grid>

              {/* {!matchesXS && elevation === 0 ? ( */}
              <Grid item>
                <Typography>
                  <Link href="/" classes={{ root: classes.Link }}>
                    DemoShop
                  </Link>
                </Typography>
              </Grid>
              {/* ) : null} */}

              {/* {matches ? null : <Grid item className={classes.middle}></Grid>} */}
              <Grid item className={classes.middle}></Grid>
              <CustomTabber
                value={value}
                setValue={setValue}
                GroupList={GroupList}
                open={!matches && elevation === 0}
              />

              <Grid item>
                <ShoppingCart
                  to={"/ticket"}
                  badgeContent={tickets.length}
                  open={elevation === 0}
                />
              </Grid>

              {matches ? null : (
                <Grid item className={classes.Tabs}>
                  <LogButton open={elevation === 0} />
                </Grid>
              )}
              <MenuButton
                handleDrawer={handleDrawer}
                open={matches && elevation === 0}
              />
            </Grid>
          </Toolbar>
          <Toolbar  className={classes.toolbar}/>
        </Collapse>
        <Toolbar
          // className={classes.toolbar}
          variant={ "dense" }
        >
          <Grid container alignItems="center" >
            <Grid item>
              <BrandIcon Brand={Brand} open={elevation !== 0} />
            </Grid>
            <Grid item className={classes.middle}></Grid>

{/*               
            <Grid item>
              <BarSearch />
            </Grid> */}
            <AboutIcon to={"/AboutUs"} open={!matches && elevation === 0} />
            <Grid item>
              <ShoppingCart
                to={"/ticket"}
                badgeContent={tickets.length}
                open={elevation !== 0}
              />
            </Grid>
            <IdentityIcon
              to={"/identity"}
              open={!matches && elevation === 0}
              user={user}
            />
            <Grid item>
              <MenuButton handleDrawer={handleDrawer} open={elevation !== 0} />
            </Grid>
          </Grid>
        </Toolbar>
      </Container>
      <CssBaseline />
    </AppBar>
  );
};

export default CustomAppBar;
