import React, { useState } from "react";
import { makeStyles, Button } from "@material-ui/core";
import { Grid, Typography } from "@material-ui/core";
import { useForm } from "hooks/useForm";
import axios from "axios";
import { useSelector } from "react-redux";
import { Input } from "../controls";
import { authApi } from "api/auth_api";
import { useActions } from "hooks/useActions";
import { useHistory } from "react-router";
const useStyles = makeStyles(() => {
  return {
    Panel: {
      border: "1px grey solid",
      borderRadius: "10px",
      padding: "20px 10px !important",
      marginBottom: "10px",
      // backgroundColor: "#e6e6e6",
    },
  };
});

const ChangePassword = () => {
  const classes = useStyles();
  const auth = useSelector((state) => state.auth);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h6">變更密碼</Typography>
      </Grid>
      <Grid item className={classes.Panel}>
        <Grid item container xs={12} md={6}>
          {auth.email ? <PasswordForm email={auth.email} /> : null}
        </Grid>
      </Grid>
    </Grid>
  );
};

const PasswordForm = ({ email }) => {
  const initialValue = {
    email,
    password: "",
    new_password: "",
    newPasswordConfirmed: "",
  };
  const [lazy, setLazy] = useState(true);
  const validate = (fieldValues = values) => {
    let temp = {};

    if ("email" in fieldValues)
      temp.email = fieldValues.email.length > 0 ? "" : "Email不可為空";
    if ("password" in fieldValues)
      temp.password = fieldValues.password.length > 0 ? "" : "密碼不可為空";

    if ("new_password" in fieldValues)
      temp.new_password = /^((?=\S*?[a-zA-Z])(?=\S*?[0-9]).{7,20})\S$/.test(
        fieldValues.new_password
      )
        ? ""
        : "密碼需含至少一個英文字母與一個數字，長度至少8位最多20位";
    if ("newPasswordConfirmed" in fieldValues)
      temp.newPasswordConfirmed =
        fieldValues.newPasswordConfirmed === fieldValues.new_password
          ? ""
          : "密碼不正確";

    temp = { ...errors, ...temp, submit: "" };
    setErrors(temp);


    if (fieldValues === values)
      return Object.values(temp).every((d) => d === "");
  };
  const { values, errors, setErrors, handleValues, resetForm } = useForm(
    initialValue,
    true,
    validate,
    lazy
  );
  const history = useHistory();
  const { batch_messages } = useActions();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLazy(false);

    setErrors({ ...errors, submit: "" });
    if (validate()) {

      try {
        await axios.post(authApi.change_password(), { ...values });
        batch_messages(["密碼修改成功"], "success");
        resetForm();
        history.push("/");
      } catch (e) {

        batch_messages([...e.response.data.errors.map(d=>d.message)], "error");
      }

    }
  };
  return (
    <Grid container item spacing={2}>
      <Grid item xs={12}>
        <Input
          disabled
          label={"Email"}
          name="email"
          value={values.email}
          onChange={handleValues}
          fullWidth
          error={errors["email"]}
          // helperText="姓名不可為空"
          size="small"
        />
      </Grid>
      <Grid item xs={12}>
        <Input
          label={"密碼"}
          name="password"
          value={values.password}
          onChange={handleValues}
          fullWidth
          error={errors["password"]}
          // helperText="姓名不可為空"
          size="small"
          type="password"
        />
      </Grid>
      <Grid item xs={12}>
        <Input
          label={"新密碼"}
          name="new_password"
          value={values.new_password}
          onChange={handleValues}
          fullWidth
          error={errors["new_password"]}
          // helperText="姓名不可為空"
          size="small"
          type="password"
        />
      </Grid>
      <Grid item xs={12}>
        <Input
          label={"新密碼確認"}
          name="newPasswordConfirmed"
          value={values.newPasswordConfirmed}
          onChange={handleValues}
          fullWidth
          error={errors["newPasswordConfirmed"]}
          // helperText="姓名不可為空"
          size="small"
          type="password"
        />
      </Grid>
      <Grid container item justifyContent="flex-end" xs={12}>
        <Grid item>
          <Button onClick={handleSubmit} variant="outlined">
            儲存變更
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export { ChangePassword };
