import  { useState } from "react";


export const useMenu = ({setSelectedIndex}) => {
  const [anchorEl, setAnchorEl] = useState(null);


  const handleMenuItemClick = (event, index) => {
    //   console.log('----handleMenuItemClick');
    setSelectedIndex(index);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickListItem = (event) => {
    setAnchorEl(event.currentTarget);
  };
  return {
    anchorEl,
    handleMenuItemClick,
    handleClose,
    handleClickListItem
  };
};
