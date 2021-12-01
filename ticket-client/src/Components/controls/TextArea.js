import React from "react";
import { TextareaAutosize } from "@material-ui/core";
const TextArea = ({
  name,
  label,
  value,
  onChange,
  error = null,
  helperText = null,
  ...others
}) => {
  return (
    <TextareaAutosize
      //   variant="outlined"
      aria-label={label}
      name={name}
      value={value}
      onChange={onChange}
      {...others}
      // {...(error && { error: true, helperText: error })}
      // {...(!error && { error: false, helperText })}
    />
  );
};

export { TextArea };
