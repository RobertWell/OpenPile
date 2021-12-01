import React from "react";
import {
  FormControl,
  InputLabel,
  FormHelperText,
  Select as MuiSelect,
} from "@material-ui/core";

const Select = ({ name, label, value, onChange, options, error = null }) => {

  return (
    <FormControl
      variant="outlined"
      htmlFor={label}
      {...(error && { error: true })}
    >
      <InputLabel>{label}</InputLabel>
      <MuiSelect
        label={label}
        value={value}
        onChange={onChange}
        native
        inputProps={{
          name,
          id: label,
        }}
      >
        <option value="" aria-label="None" />
        {options.map((d) => (
          <option key={d.id} value={d.id}>
            {d.title}
          </option>
        ))}
      </MuiSelect>
      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
};

export { Select };
