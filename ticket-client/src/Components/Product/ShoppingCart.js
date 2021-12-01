import React from "react";
import PropTypes from "prop-types";
import { IconButton, Badge, Zoom } from "@material-ui/core";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

// const useStyles = makeStyles(() => ({
//   // root: {
//   //   '& > *': {
//   //     margin: theme.spacing(1),
//   //   },
//   // },
//   shape: {
//     // backgroundColor: theme.palette.primary.main,
//     width: 40,
//     height: 40,
//   },
//   shapeCircle: {
//     borderRadius: "50%",
//   },
// }));

function ShoppingCart({ onClick, to, badgeContent, open = true }) {
  return (
    <>
      {open ? (
        <Zoom in={open} timeout={300}>
          <IconButton size='small' color="secondary" onClick={onClick} href={to}>
            <Badge badgeContent={badgeContent} color="error">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Zoom>
      ) : null}
    </>
  );
}

ShoppingCart.propTypes = {
  to: PropTypes.string,
  onClick: PropTypes.func,
};

export { ShoppingCart };
