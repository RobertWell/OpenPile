import {
  ListItem,
  ListItemIcon,
  ListItemText,
  List,
  makeStyles,
  Typography,
  SwipeableDrawer,
  Grid,
  Box,
  Link,
  Divider,
} from "@material-ui/core";
import { useLocation } from "react-router";
import Brand from "assets/burn-512.png";
import { BrandIcon } from "Components";
import Icon from "@material-ui/core/Icon";
import { useHistory } from "react-router";

const useStyle = makeStyles((theme) => {
  return {
    drawer: {
      width: ({ drawerWidth }) => drawerWidth,
    },
    drawerPaper: {
      width: ({ drawerWidth }) => drawerWidth,
    },

    ListIcon: {
      paddingLeft: theme.spacing(7),
    },
    Header: {
      marginTop: "10px",
    },
  };
});

const SideDrawer = ({
  openDrawer,
  drawerWidth,
  handleDrawer,
  anchor,
  GroupList,
  user,
  SignOutHandler,
  SignInHandler,
  AuthCenterHander,
  AboutUsHandler,
}) => {
  const classes = useStyle({ drawerWidth });
  const { userId } = user;
  const location = useLocation();
  const history = useHistory();
  // console.log(location);
  return (
    <SwipeableDrawer
      // variant="temporary"
      anchor={anchor}
      onClose={() => {
        handleDrawer();
      }}
      open={openDrawer}
      // className={classes.drawer}
      // classes={{ paper: classes.drawerPaper }}
      onOpen={handleDrawer}
    >
      <Grid
        container
        alignItems="center"
        justifyContent="center"
        spacing={2}
        className={classes.Header}
      >
        <Grid item sm={12} md={2}>
          <Box textAlign="center">
            <BrandIcon Brand={Brand} userId={userId} />
          </Box>
        </Grid>
        {userId ? (
          <Grid
            item
            xs={12}
            sm={userId.length > 9 ? 12 : 6}
            style={{ flexGrow: 1 }}
          >
            <Typography align="center" variant="subtitle1">
              <Link
                href="/identity"
                style={{ textDecoration: "none", color: "black" }}
              >
                {userId}
              </Link>
            </Typography>
          </Grid>
        ) : null}
      </Grid>

      <List>
        <Divider />
        {GroupList.map((item, index) => {
          // console.log("-----his", history.location.pathname);
          return (
            <ListItem
              button
              key={index}
              onClick={() => {
                handleDrawer();
                history.push(`/CategorizedProduct/${item.path}`);
              }}
              selected={
                history.location.pathname === `/CategorizedProduct/${item.path}`
              }
            >
              <ListItemText primary={item.text} />
              <ListItemIcon className={classes.ListIcon}>
                {item.icon}
              </ListItemIcon>
            </ListItem>
          );
        })}
        <Divider />
        <ListItem
          button
          onClick={() => {
            handleDrawer();
            AboutUsHandler();
          }}
          selected={location.pathname.startsWith("/AboutUs")}
        >
          <ListItemText primary={"關於我們"} />
          <ListItemIcon className={classes.ListIcon}>
            <Icon>contact_page</Icon>
          </ListItemIcon>
        </ListItem>

        <Divider />

        {userId ? (
          <>
            <ListItem
              button
              onClick={() => {
                handleDrawer();
                AuthCenterHander();
              }}
              selected={location.pathname.startsWith("/identity")}
            >
              <ListItemText primary={"會員中心"} />
              <ListItemIcon className={classes.ListIcon}>
                <Icon>person</Icon>
              </ListItemIcon>
            </ListItem>
            <ListItem
              button
              onClick={() => {
                handleDrawer();
                SignOutHandler();
              }}
            >
              <ListItemText primary={"登出"} />
              <ListItemIcon className={classes.ListIcon}>
                <Icon>logout</Icon>
              </ListItemIcon>
            </ListItem>
          </>
        ) : (
          <ListItem
            button
            onClick={() => {
              handleDrawer();
              SignInHandler();
            }}
          >
            <ListItemText primary={"登入"} />
            <ListItemIcon className={classes.ListIcon}>
              <Icon>logout</Icon>
            </ListItemIcon>
          </ListItem>
        )}
      </List>
    </SwipeableDrawer>
  );
};

export default SideDrawer;
