import React from "react";
import {
  AppBar,
  Toolbar,
  makeStyles,
  Grid,
  InputBase,
  IconButton,
  Badge,
} from "@material-ui/core";
import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import SearchIcon from "@material-ui/icons/Search";

const useStyle = makeStyles((theme) => {
  return {
    appbar: (drawerWidth) => {
      return {
        // width: `calc(100% - ${drawerWidth}px)`,
        
        // marginLeft: drawerWidth,
        color: theme.palette.primary.contrastText,
        backgroundColor: theme.palette.third.dark,
        // backgroundColor: "white",
      };
    },
    toolbar: theme.mixins.toolbar,
    badge: {
      color: theme.palette.primary.contrastText,
    },
    middle: {
      flexGrow: 1,
    },
    searchInput: {
      opacity: "0.8",
      padding: `0px ${theme.spacing(1)}px`,
      fontSize: "0.8rem",
      border: "1px solid #ffff",
      color: theme.palette.primary.contrastText,

      "&:hover": {
        backgroundColor: theme.palette.third.main,
      },

      "& .MuiSvgIcon-root": {
        marginRight: theme.spacing(1),
      },
    },
    btnRoot: {
      backgroundColor: "green",
    },
    btnLabel: {
      backgroundColor: "red",
    },
  };
});

const Header = ({ drawerWidth }) => {
  const classes = useStyle(drawerWidth);
  return (
    <AppBar className={classes.appbar} position='static'>
      <Toolbar className={classes.toolbar}>
        <Grid container alignItems="center">
          <Grid item>
            <InputBase
              placeholder="Search Topics"
              startAdornment={<SearchIcon />}
              className={classes.searchInput}
              //   margin="dense"
            />
          </Grid>
          <Grid item className={classes.middle}></Grid>
          <Grid item>
            <IconButton
            //   classes={{ root: classes.btnRoot, label: classes.btnLabel }}
            >
              <Badge badgeContent={4} color="secondary">
                <NotificationsNoneIcon className={classes.badge} />
              </Badge>
            </IconButton>
            <IconButton>
              <Badge badgeContent={4} color="primary">
                <ChatBubbleOutlineIcon className={classes.badge} />
              </Badge>
            </IconButton>
            <IconButton>
              <PowerSettingsNewIcon className={classes.badge} />
            </IconButton>
          </Grid>
        </Grid>
      </Toolbar>
      
    </AppBar>
  );
};

export default Header;
