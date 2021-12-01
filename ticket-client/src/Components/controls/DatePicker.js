import React from "react";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';

const DatePicker = ({ name, label, value, onChange }) => {
  const convertToDefaultEventPara = (name, value) => ({
    target: {
      name,
      value,
    },
  });
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        disableToolbar
        variant="inline"
        inputVariant="outlined"
        label={label}
        format="MMM/dd/yyyy"
        name={name}
        value={value}
        onChange={date=>onChange(convertToDefaultEventPara(name, date))}
      />
    </MuiPickersUtilsProvider>
  );
};

export {DatePicker};
