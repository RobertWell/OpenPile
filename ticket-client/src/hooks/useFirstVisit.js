import React, { useState, useEffect } from "react";

const useFirstVisit = () => {
  useEffect(() => {
    let visited = localStorage["alreadyVisited"];
    if (visited) {
      setViewPopup(false);
    } else {
      setViewPopup(true);
    }
  }, []);
  const [viewPopup, setViewPopup] = useState(false);
  
  const handleClose = () => {
    setViewPopup(false);
    localStorage["alreadyVisited"] = false;
  };

  return { viewPopup, handleClose };
};

export { useFirstVisit };
