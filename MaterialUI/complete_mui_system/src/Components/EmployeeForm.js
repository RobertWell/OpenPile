import React from "react";
import { Grid, makeStyles } from "@material-ui/core";
import { useForm, Form } from "../hooks/useForm";
import {
  Input,
  RadioGroup,
  Select,
  CheckBox,
  DatePicker,
  Button,
} from "./controls";
import {
  getDepartmentCollection,
  insertEmployee,
} from "../Services/employeeService";
import { useEffect } from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiFormControl-root": {
      width: "80%",
      margin: theme.spacing(1),
    },
  },
}));

const initialValues = {
  id: "",
  email: "",
  fullName: "",
  mobile: "",
  city: "",
  gender: "mail",
  departmentId: "",
  hireDate: new Date(),
  isPermanent: false,
};

const genderItems = [
  { id: "male", title: "Male" },
  { id: "female", title: "Female" },
  { id: "others", title: "Others" },
];

const EmployeeForm = ({ addOrEdit, recordForEdit }) => {
  const classes = useStyles();



  const validate = (fieldValues = values) => {
    let temp = {};
    if ("fullName" in fieldValues)
      temp.fullName = fieldValues.fullName ? "" : "This. Field is required.";
    if ("departmentId" in fieldValues)
      temp.departmentId = fieldValues.departmentId
        ? ""
        : "This. Field is required.";
    if ("city" in fieldValues)
      temp.city = fieldValues.city ? "" : "This. Field is required.";
    if ("mobile" in fieldValues)
      temp.mobile =
        fieldValues.mobile.length > 9 ? "" : "Minimun 10 numbers required.";
    if ("email" in fieldValues)
      temp.email = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(
        fieldValues.email
      )
        ? ""
        : "Email is not valid.";

    setErrors(temp);
    if (fieldValues === values)
      return Object.values(temp).every((x) => x === "");
  };

  const { values, setValues,handleValues, errors, setErrors, resetForm } = useForm(
    initialValues,
    true,
    validate
  );


  useEffect(() => {
    if (!recordForEdit) return
    setValues({...recordForEdit})
  }, [recordForEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) addOrEdit(values, resetForm);
  };
  return (
    <Form className={classes.root} onSubmit={handleSubmit}>
      <Grid container>
        <Grid item xs={6}>
          <Input
            label="Full Name"
            name="fullName"
            value={values.fullName}
            onChange={handleValues}
            error={errors.fullName}
          />
          <Input
            label="Email"
            name="email"
            value={values.email}
            onChange={handleValues}
            error={errors.email}
          />
          <Input
            label="Mobile"
            name="mobile"
            value={values.mobile}
            onChange={handleValues}
            error={errors.mobile}
          />
          <Input
            label="City"
            name="city"
            value={values.city}
            onChange={handleValues}
            error={errors.city}
          />
        </Grid>

        <Grid item xs={6}>
          <RadioGroup
            items={genderItems}
            value={values.gender}
            onChange={handleValues}
            label="Gender"
            name="gender"
          />
          <Select
            name="departmentId"
            label="Department"
            value={values.departmentId}
            onChange={handleValues}
            options={getDepartmentCollection()}
            error={errors.departmentId}
          />
          <CheckBox
            name="isPermanent"
            value={values.isPermanent}
            onChange={handleValues}
            label="Is Permanent?"
          />
          <DatePicker
            name="hireDate"
            value={values.hireDate}
            onChange={handleValues}
            label="Hire Date"
          />
          <div>
            <Button text="Submit" type="Submit" />
            <Button text="Reset" color="default" onClick={() => resetForm()} />
          </div>
        </Grid>
      </Grid>
    </Form>
  );
};

export default EmployeeForm;
