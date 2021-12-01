import React from "react";
import {
  IconButton,
  Zoom,
  Grid,
  Icon,
  Typography,
  useTheme,
  useMediaQuery,
} from "@material-ui/core";

const IdentityIcon = ({
  onClick,
  to,

  open = true,
  color = "primary",
  user,
}) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <>
      {open ? (
        <Grid item>
          <Zoom in={open} timeout={300}>
            <IconButton size="small" color={color} onClick={onClick} href={to}>
              {user.userId ? <Icon>person</Icon> : <Icon>person_outline</Icon>}
              {matches ? null : <Typography>會員中心</Typography>}
            </IconButton>
          </Zoom>
        </Grid>
      ) : null}
    </>
  );
};

export { IdentityIcon };
