import { Typography, makeStyles } from "@material-ui/core";
import { Link } from "react-router-dom";

const useStyle = makeStyles(() => {
  return {
    text: ({ color }) => {
      return {
        color: color,
      };
    },
  };
});

function Copyright({ color = "textSecondary" }) {
  const classes = useStyle({ color });
  return (
    <Typography variant="body2" align="center" className={classes.text}>
      {"Copyright © "}
      <Link
        color="inherit"
        to="/AboutUs"
        style={{ textDecoration: "none", color: color }}
      >
        Robert Lin
      </Link>{" "}
      {new Date().getFullYear()}{" "}
    </Typography>
  );
}

export { Copyright };
