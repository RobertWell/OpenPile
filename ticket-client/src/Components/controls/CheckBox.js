import React from "react";
import {
  FormControl,
  FormControlLabel,
  Checkbox as MuiCheckbox,
} from "@material-ui/core";

const CheckBox = ({ name, value, onChange, label }) => {
  const convertToDefaultEventPara = (name, value) => ({
    target: {
      name,
      value,
    },
  });
  return (
    <FormControl>
      <FormControlLabel
        control={
          <MuiCheckbox
            name={name}
            color="primary"
            checked={value}
            onChange={(e) => {
                
              onChange(convertToDefaultEventPara(name, e.target.checked));
            }}
          />
        }
        label={label}
      />
    </FormControl>
  );
};

export { CheckBox };
