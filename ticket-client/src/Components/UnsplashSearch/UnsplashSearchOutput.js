import React, { useCallback, useState, useEffect } from "react";
import Gallery from "react-photo-gallery";
import SelectedImage from "./SelectedImage";
import { Button, Typography, makeStyles } from "@material-ui/core";
import CheckIcon from "@material-ui/icons/Check";

const useStyle = makeStyles(() => {
  return {};
});

const UnsplashSearchOutput = ({ photos,  selected, setSelected }) => {
  // console.log(photos);
  const classes = useStyle();
  const [selectAll, setSelectAll] = useState(undefined);

  // const [selected, setSelected] = useState(
  //   Array.from(new Array(photos.length), (t) => false)
  // );

  useEffect(() => {
    setSelected(Array.from(new Array(photos.length), () => false));
  }, [photos.length]);
  const toggleSelectAll = () => {
    let temp;
    if (selectAll) {
      temp = false;
      setSelectAll(temp);
    } else {
      temp = true;
      setSelectAll(temp);
    }
    setSelected(Array.from(new Array(photos.length), () => temp));
  };

  const selectHandler = (index) => (s) => {
    let temp = [...selected];
    temp.splice(index, 1, s);
    setSelected(temp);
    let all = !temp.includes(false);
    setSelectAll(all);
  };

  const imageRenderer = useCallback(
    ({ index, left, top, key, photo }) => (
      <SelectedImage
        selected={selected[index]}
        key={key}
        margin={"2px"}
        index={index}
        photo={photo}
        left={left}
        top={top}
        selectHandler={selectHandler(index)}
      />
    ),
    [selected]
  );

  return (
    <div style={{ marginTop: "10px" }}>
      <div style={{ height: "50px" }}>
        <Button
          value="check"
          variant={selectAll ? "contained" : "outlined"}
          onClick={toggleSelectAll}
          classes={{
            root: classes.toggleRoot,
            selected: classes.toggleSelected,
          }}
          color="primary"
        >
          <CheckIcon />
          <Typography>Select All</Typography>
        </Button>

      </div>

      <Gallery photos={photos} renderImage={imageRenderer} />
    </div>
  );
};

export { UnsplashSearchOutput };
