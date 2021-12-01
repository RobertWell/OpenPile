import React, { useState } from "react";
import {
  Grid,
  Avatar,
  Select,
  MenuItem,
  Typography,
  ButtonBase,
  Popover,
  Box,
} from "@material-ui/core";
import { CopyToClipboard } from "react-copy-to-clipboard";
// import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state";
const FigurePanel = ({ products }) => {
  return (
    <Grid container spacing={2}>
      {products.map((p, i) => {
        const { urls } = p;
        return urls ? (
          <Grid item key={i} xs={12}>
            <ImgItem
              full={urls.full}
              raw={urls.raw}
              regular={urls.regular}
              small={urls.small}
              thumb={urls.thumb}
            />
          </Grid>
        ) : null;
      })}
    </Grid>
  );
};

const ImgItem = ({ full, raw, regular, small, thumb }) => {
  //   const [text, setText] = useState(regular);
  const [select, setSelect] = useState("regular");
  const [open, setopen] = useState(false);
  const getFig = (s) => {
    switch (s) {
      case "full":
        return full;
      case "raw":
        return raw;
      case "regular":
        return regular;
      case "small":
        return small;
      case "thumb":
        return thumb;
      default:
        return regular;
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={2}>
        <Avatar src={thumb} alt="figure candidate" variant="rounded" />
      </Grid>
      <Grid item xs={2}>
        <Select value={select} onChange={(e) => setSelect(e.target.value)}>
          <MenuItem value="full"> full</MenuItem>
          <MenuItem value="raw"> raw</MenuItem>
          <MenuItem value="regular"> regular</MenuItem>
          <MenuItem value="small"> small</MenuItem>
          <MenuItem value="thumb"> thumb</MenuItem>
        </Select>
      </Grid>

      <Grid item xs={8}>
        <CopyToClipboard
          text={getFig(select)}
          onCopy={() => {
            setopen(!open);
            setTimeout(() => {
              setopen(!open);
            }, 500);
          }}
        >
          <div>
            <ButtonBase>
              <Typography nowrap='true' align="left">{getFig(select)}</Typography>
            </ButtonBase>
            <Popover
              open={open}
            //   onClose={setopen(!open)}
            //   anchorEl={true}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
              transformOrigin={{
                vertical: 'center',
                horizontal: 'center',
              }}
            >
              <Box p={2}>
                <Typography>Copied</Typography>
              </Box>
            </Popover>
          </div>
        </CopyToClipboard>
      </Grid>
    </Grid>
  );
};

export { FigurePanel };
