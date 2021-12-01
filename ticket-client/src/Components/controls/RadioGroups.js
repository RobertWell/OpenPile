import React from "react";
import {
  FormControl,
  FormLabel,
  RadioGroup as Group,
  Radio,
  FormControlLabel,
} from "@material-ui/core";

const RadioGroup = (props) => {
  const { value, label, name, onChange, items } = props;
  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">{label}</FormLabel>
      <Group name={name} value={value} onChange={onChange} row>
        {items.map((item) => (
          <FormControlLabel
            key={item.id}
            value={item.id}
            control={<Radio />}
            label={item.title}
          />
        ))}
      </Group>
    </FormControl>
  );
};

export { RadioGroup };
