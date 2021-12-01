import React, { useState } from "react";

import {
  Container,
  makeStyles,
  Avatar,
  Typography,
  Grid,
  Box,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { Link } from "react-router-dom";
import { Input, Button } from "../controls";
import { useForm, Form } from "hooks/useForm";
import { translateError } from "Composables/translateError";
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link to="/">Your Website</Link> {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  "@global": {
    a: {
      textDecoration: "none",
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const initialValues = {
  email: "",
  password: "",
  password_confirm: "",
};
const SignUp = ({ onSignUp }) => {
  const classes = useStyles();
  const [lazy, setLazy] = useState(true);
  const [message, setMessage] = useState(null);
  const validate = (fieldValues = values) => {
    let temp = {};
    if ("email" in fieldValues)
      temp.email = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(
        fieldValues.email
      )
        ? ""
        : "Email格式不正確。";

    if ("password" in fieldValues) {
      temp.password = /^((?=\S*?[a-zA-Z])(?=\S*?[0-9]).{7,20})\S$/.test(
        fieldValues.password
      )
        ? ""
        : "密碼需含至少一個英文字母與一個數字，長度至少8位最多20位";
    }
    if ("password_confirm" in fieldValues) {
      temp.password_confirm =
        values.password === fieldValues.password_confirm ? "" : "密碼不正確";
    }
    setErrors({ ...errors, ...temp });
    if (fieldValues === values)
      return Object.values(temp).every((x) => x === "");
  };
  const { values,  handleValues, errors, setErrors, resetForm } =
    useForm(initialValues, true, validate, lazy);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLazy(false);
    if (validate())
      onSignUp(values, (error) => {
        if (error)
          setMessage(
            <>
              {error.map((e) => (
                <Typography color="error" key={e.message}>
                  {translateError(e.message)}
                </Typography>
              ))}
            </>
          );
        else resetForm();
      });
  };
  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          註冊會員
        </Typography>
        <Form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Input
                label="請輸入帳號(Email)"
                name="email"
                value={values.email}
                onChange={handleValues}
                error={errors.email}
                fullWidth
                autoComplete="username"
                
              />
            </Grid>
            <Grid item xs={12}>
              <Input
                label="請輸入密碼"
                name="password"
                value={values.password}
                onChange={handleValues}
                error={errors.password}
                type="password"
                fullWidth
                autoComplete="new-password"
                helperText="密碼需含至少一個英文字母與一個數字，長度至少8位最多20位"
              />
            </Grid>
            <Grid item xs={12}>
              <Input
                label="請再次輸入密碼"
                name="password_confirm"
                value={values.password_confirm}
                onChange={handleValues}
                error={errors.password_confirm}
                fullWidth
                type="password"
                autoComplete="new-password"
              />
            </Grid>
            {message}
            <Grid item xs={12}>
              <Button
                text="Submit"
                type="Submit"
                fullWidth
                className={classes.submit}
              />
            </Grid>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link className={classes.a} to="/auth/login">
                  已擁有會員帳號? 請登入會員
                </Link>
              </Grid>
            </Grid>
          </Grid>
        </Form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
};

export { SignUp };
