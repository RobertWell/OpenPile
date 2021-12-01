import React from "react";
import { IconButton, Badge, Zoom } from "@material-ui/core";
const HeaderIcon = ({
  children,
  open,
  onClick,
  to,
  badgeContent,
  color = "secondary",
  ...others
}) => {
  return (
    <>
      {open ? (
        <Zoom in={open} timeout={300}>
          <IconButton color={color} onClick={onClick} href={to}>
            <Badge badgeContent={badgeContent} color="error">{children}</Badge>
          </IconButton>
        </Zoom>
      ) : null}
    </>
  );
};

export  {HeaderIcon};
