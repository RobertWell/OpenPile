import React from "react";
import {
  Button,
  Typography,
  useMediaQuery,
  useTheme,

} from "@material-ui/core";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { makeStyles } from "@material-ui/styles";
import { useActions } from "hooks/useActions";
import Icon from "@material-ui/core/Icon";
// import Login from "assets/baseline_login_black_24dp";
// import Logout from "assets/baseline_logout_black_24dp";
const useStyle = makeStyles((theme) => {
  return {
    button: ({ matches }) => ({
      // maxWidth: matches ? "40px" : "120px",
      // minWidth: matches ? "20px" : "80px",
      // maxHeight: "30px",
      // minHeight: "30px",
      minWidth:"10px"
    }),
    text: ({ matches }) => ({
      fontSize: matches ? "10px" : "18px",
    }),
  };
});
const LogButton = ({ open }) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("xs"));
  const classes = useStyle({ matches });
  const auth = useSelector((state) => state.auth);
  const history = useHistory();

  const { sign_out } = useActions();
  return (
    <>
      {open ? (
        auth.userId ? (
          <Button
            // variant="outlined"
            onClick={(event) => {
              event.preventDefault();
              sign_out();
              history.go(0);
            }}
            size={matches ? "small" : "medium"}
            classes={{ root: classes.button }}
          >
            <Icon>logout</Icon>
            {matches ? null : (
              <Typography className={classes.text}>登出</Typography>
            )}
          </Button>
        ) : (
          <Button
            // variant="outlined"
            onClick={(event) => {
              event.preventDefault();
              history.push("/auth/login");
            }}
            size={matches ? "small" : "medium"}
            classes={{ root: classes.button }}
          >
            <Icon>login</Icon>
            {matches ? null : (
              <Typography className={classes.text}>登入/註冊</Typography>
            )}
          </Button>
        )
      ) : null}
    </>
  );
};

export default LogButton;
