import React, { useState } from "react";
import {
  Grid,
  Typography,
  makeStyles,
  TextField,
  Button,
} from "@material-ui/core";
import { useSelector } from "react-redux";
import { useForm } from "hooks/useForm";
import { PhoneInputMask } from "Components";
import { Input } from "../controls";
import axios from "axios";
import { useActions } from "hooks/useActions";
import { authApi } from "api/auth_api";

const useStyles = makeStyles(() => {
  return {
    Panel: {
      border: "1px grey solid",
      borderRadius: "10px",
      padding: "20px 10px !important",
      marginBottom: "10px",
    },
  };
});
const IdentityDetail = () => {
  const classes = useStyles();
  const auth = useSelector((state) => state.auth);
  const [lazy, setLazy] = useState(true);
  const initialValue = {
    name: auth.name,
    nickname: auth.nickname,
    phone: auth.phone,
    address: auth.address,
  };
  const { update_user, batch_messages } = useActions();

  const validate = (fieldValues = values) => {
    let temp = {};

    if ("name" in fieldValues)
      temp.name = fieldValues.name.length > 0 ? "" : "姓名不可為空";
    if ("nickname" in fieldValues)
      temp.nickname = fieldValues.nickname.length > 0 ? "" : "暱稱不可為空";
    if ("phone" in fieldValues)
      temp.phone =
        !fieldValues.phone ||
        !fieldValues.phone.startsWith("09") ||
        fieldValues.phone.length !== 12
          ? "手機號碼格式有誤"
          : "";
    if ("address" in fieldValues)
      temp.address = fieldValues.address.length > 0 ? "" : "地址不可為空";

    temp = { ...errors, ...temp, submit: "" };
    setErrors(temp);


    if (fieldValues === values)
      return Object.values(temp).every((d) => d === "");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLazy(false);

    setErrors({ ...errors, submit: "" });

    if (validate()) {
      axios
        .post(authApi.update(), { ...values })
        .then((resp) => {
          update_user(resp.data);
          batch_messages(["資料已變更"]);

        })
        .catch((error) => {

          batch_messages(
            [...e.response.data.errors.map((d) => d.message)],
            "error"
          );
        });


    }
  };
  const { values, errors, setErrors, handleValues } = useForm(
    initialValue,
    true,
    validate,
    lazy
  );

  const isSame = Object.keys(values).every(
    (k) => values[k] === initialValue[k]
  );

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h6">會員資料</Typography>
      </Grid>
      <Grid item xs={12} className={classes.Panel}>
        <Grid container spacing={5}>
          <Grid item container spacing={2} alignItems="flex-start">
            <Grid item xs={12} md={2}>
              <Typography variant="body1">E-mail: </Typography>
              <Typography
                variant="subtitle1"
                component="p"
                style={{ color: "grey" }}
              >
                (不可修改)
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                helperText=" "
                disabled
                variant="outlined"
                size="small"
                value={auth.email}
              />
            </Grid>
            <Grid item xs={12} md={2}>
              <Typography variant="body1">姓名: </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Input
                // label={"副標題"}
                name="name"
                value={values.name}
                onChange={handleValues}
                fullWidth
                error={errors["name"]}
                // helperText="姓名不可為空"
                size="small"
              />
            </Grid>
          </Grid>
          <Grid item container spacing={2} alignItems="flex-start">
            <Grid item xs={12} md={2}>
              <Typography variant="body1">暱稱: </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Input
                // label={"副標題"}
                name="nickname"
                value={values.nickname}
                onChange={handleValues}
                fullWidth
                error={errors["nickname"]}
                // helperText="暱稱不可為空"
                size="small"
              />
            </Grid>
            <Grid item xs={12} md={2}>
              <Typography variant="body1">手機: </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Input
                // label={"副標題"}
                name="phone"
                value={values.phone}
                onChange={handleValues}
                fullWidth
                error={errors["phone"]}
                InputProps={{
                  inputComponent: PhoneInputMask,
                }}
                size="small"
              />
            </Grid>
          </Grid>
          <Grid item container spacing={2} alignItems="flex-start">
            <Grid item xs={12} md={2}>
              <Typography variant="body1">常用收件地址: </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Input
                // label={"副標題"}
                name="address"
                value={values.address}
                onChange={handleValues}
                fullWidth
                error={errors["address"]}
                size="small"
                // helperText="地址不可為空"
              />
            </Grid>
          </Grid>

          <Grid item>
            <Button disabled={isSame} onClick={handleSubmit} variant="outlined">
              儲存變更
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export { IdentityDetail };
