import React from "react";
import { IconButton, Avatar, makeStyles, Zoom } from "@material-ui/core";
import { deepOrange } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  root: {
    "&:hover, &:focus": {
      backgroundColor: "inherit",
    },
    padding: "0",
  },
  orange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
  },
}));
const BrandIcon = ({ Brand, open = true, userId }) => {
  const classes = useStyles();
  return (
    <>
      {open ? (
        <Zoom in={open} timeout={300}>
          <IconButton href={`/`} disableRipple classes={{ root: classes.root }}>
            <Avatar
              src={Brand}
              alt="Brand"
              className={userId && classes.orange}
            />
          </IconButton>
        </Zoom>
      ) : null}
    </>
  );
};

export { BrandIcon };
