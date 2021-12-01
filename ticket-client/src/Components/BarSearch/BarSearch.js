import React from "react";
import {
  useMediaQuery,
  useTheme,
  TextField,
  Collapse,
  Typography,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { makeStyles } from "@material-ui/styles";
import Autocomplete from "@material-ui/lab/Autocomplete";
const useStyles = makeStyles((theme) => {
  return {
    searchInput: {
      opacity: 0.5,
      padding: `0px 0px`,

      margin: "10px 0 !important",
      fontSize: "0.8rem",
      // border: `1px solid ${theme.palette.third.contrastText}`,
      borderRadius: "5px",
      color: theme.palette.third.contrastText,
      transition: " all 0.5s ease-out",
      width: ({ matches }) => (matches ? 200 : 300),
      // &:hover,
      "&:hover, &:focus-within": {
        backgroundColor: theme.palette.third.main,
        opacity: "1",
        // width: ({ matches }) => (matches ? 200 : 300),
      },

      "& .MuiSvgIcon-root": {
        marginRight: theme.spacing(1),
      },
    },
    TextField: {
      fontSize: 11,
    },
    Option:{
      width: ({ matches }) => (matches ? 200 : 300),
    }
  };
});

const BarSearch = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));
  const classes = useStyles({ matches });
  return (
    <Autocomplete
      id="free-solo-demo"
      freeSolo
      options={["123"]}
      className={classes.searchInput}
      renderInput={(params) => (
        <TextField
          size="small"
          // margin="dense"
          {...params}
          placeholder="Search Topics"
          InputProps={{
            ...params.InputProps,
            startAdornment: <SearchIcon />,
          }}
          // startAdornment={<SearchIcon />}
          // margin="normal"
          variant="outlined"
          // className={classes.TextField}
        />
      )}
      renderOption={(option) => {        
        return (
          <Typography >
            {option}
          </Typography>
        );
      }}
    />
  );
};

export { BarSearch };
