import { useState } from "react";

const parsePayload = (key_string, values, v) => {
  let keys = key_string.split(".");
  let newValeus = values;
  let temp = newValeus;
  // console.log("------------keys", keys);
  let i = 0;
  while (i < keys.length) {
    if (typeof temp === "object" && keys[i] in temp) {
      if (i === keys.length - 1) temp[keys[i]] = v;
      else temp = temp[keys[i]];
    } else return { checkIn: false, newValeus };

    i++;
  }
  // console.log("---------temp", newValeus);
  return { checkIn: true, newValeus };
};

export const useAppendableNestedForm = (
  initialValues,
  validateOnChange = false,
  validate,
  lazy = false
) => {
  const initial = initialValues;

  // console.log(initial);
  const [values, setValues] = useState(initial);
  const [errors, setErrors] = useState({});

  const handleValues = (e) => {
    const { name, value } = e.target;
    // console.log('--------------name', name, value);
    const { checkIn, newValeus } = parsePayload(name, values, value);

    if (checkIn) setValues({ ...newValeus });

    if (!lazy && validate && validateOnChange) validate({ [name]: value });
  };

  const resetForm = () => {
    setValues(initial);
    setErrors({});
  };

  return { values, errors, setValues, setErrors, handleValues, resetForm };
};

export const Form = ({ onSubmit, children, ...others }) => {
  return (
    <form {...others} onSubmit={onSubmit}>
      {children}
    </form>
  );
};
