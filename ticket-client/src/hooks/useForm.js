import { useState } from "react";

export const useForm = (
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
    
    if (name in initial) setValues({ ...values, [name]: value });

    if (!lazy && validate && validateOnChange) validate({ [name]: value });
  };

  const resetForm = () => {
    setValues(initial);
    setErrors({});
  };

  return { values, errors, setErrors, setValues, handleValues, resetForm };
};

export const Form = ({ onSubmit, children, ...others }) => {
  return (
    <form {...others} onSubmit={onSubmit}>
      {children}
    </form>
  );
};
