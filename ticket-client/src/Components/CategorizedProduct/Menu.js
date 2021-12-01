import {  useState } from "react";
import React from "react";
import "./Menu.scss";
import {
  makeStyles,
  MenuItem,
  MenuList,
  CssBaseline,
} from "@material-ui/core";

const useStyles = makeStyles(() => {
  return {
    root: {
      position: "relative",
      height: "31px",
      "& .popover__wrapper": {
        "& .popover__wrapper2": {
          "& .popover__content": {
            // background: ({ open }) => (open ? "white" : "red"),
            opacity: ({ open }) => (open ? 1 : 0),
            visibility: ({ open }) => (open ? "visible" : "hidden"),
          },
          "& .popover__title": {
            borderBottom: ({ open }) =>
              open ? "1px solid white" : "1px solid grey",
          },
        },
      },
    },
  };
});

export const CustomedMenu = ({
  text,
  options,
  selectedIndex,
  setSelectedIndex,
}) => {
  const [open, setOpen] = useState(false);

  const classes = useStyles({ open });
  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <>
      <div className={classes.root}>
        {/* 123 */}
        <div
          className={"popover__wrapper"}
          onMouseEnter={handleOpen}
          onMouseLeave={handleClose}
        >
          <div className={"popover__wrapper2"}>
            <div className={"popover__content"}>
              <div>
                <MenuList>
                  {options.map((option, index) => {
                    // console.log(option);
                    return (
                      <MenuItem
                        key={index}
                        // disabled={index === 0}
                        selected={index === selectedIndex}
                        onClick={(event) => handleMenuItemClick(event, index)}
                      >
                        <span>{option}</span>
                      </MenuItem>
                    );
                  })}
                </MenuList>
              </div>
            </div>
            <div className={"popover__title"}>
              <a href="#" onClick={handleOpen}>
                <p>{text}</p>
              </a>
            </div>
          </div>
        </div>
      </div>
      <CssBaseline />
    </>
  );
};
