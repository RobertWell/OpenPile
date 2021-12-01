import React from "react";
import { TextField } from "@material-ui/core";
const Input = ({
  name,
  label,
  value,
  onChange,
  error = null,
  helperText = null,
  ...others
}) => {
  return (
    <TextField
      variant="outlined"
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      {...others}
      {...(error && { error: true, helperText: error })}
      {...(!error && { error: false, helperText })}
    />
  );
};

export { Input };
