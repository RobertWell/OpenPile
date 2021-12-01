import React from "react";
import {
  makeStyles,
  NativeSelect as Select,
  FormControl,
  InputLabel,
} from "@material-ui/core";

const useStyles = makeStyles(() => {
  return {
    select: {
      fontSize: "12px",
    },
  };
});

const OptionsShow = ({ opetionKey, options, setOption, label = "選項" }) => {
  const classes = useStyles();
  console.log();
  return (
    <FormControl id="select-label">
      {label ? <InputLabel id="select-label">{label}</InputLabel> : null}
      {/* 非原生版的有bug，會影響版面 */}
      <Select
        // native={true} 有NativeSelect
        // labelId="select-label"
        value={opetionKey}
        onChange={(e) => {
          setOption(e.target.value);
        }}
        className={classes.select}
      >
        {Object.keys(options).map((k) => {
          // console.log("----------options[k].number", options[k].number);
          return options[k].number > 0 ? (
            <option key={k} value={k}>
              {k}
            </option>
          ) : null;
        })}
      </Select>
    </FormControl>
  );
};

export { OptionsShow };
