import React from "react";
import {
  IconButton,
  Zoom,
  Grid,
  Icon,
  Typography,
} from "@material-ui/core";

const AboutIcon = ({
  onClick,
  to,
  open = true,
  color = "primary",
}) => {
  return (
    <>
      {open ? (
        <Grid item>
          <Zoom in={open} timeout={300}>
            <IconButton size="small" color={color} onClick={onClick} href={to}>
            <Icon>contact_page</Icon>
            <Typography>關於我們</Typography>
            </IconButton>
          </Zoom>
        </Grid>
      ) : null}
    </>
  );
};

export { AboutIcon };
