import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { orderApi } from "api/order_api";
import {
  Grid,
  Container,
  Paper,
  Typography,
  TextField,
  makeStyles,
  Button,
  useTheme,
  useMediaQuery,
} from "@material-ui/core";
import {
  OrderShow,
  PhoneInputMask,
  Payment,
  PaymentSuccess,
  Progress,
  OrderShowMD,
} from "Components";
import { useHistory } from "react-router";
import useTimer from "hooks/useTimer";
import { useActions } from "hooks/useActions";
import { Switch, Route, Redirect, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
const useStyle = makeStyles(() => {
  return {
    items: {
      borderTop: "solid grey 1px",
      borderBottom: "solid grey 1px",
      marginBottom: "10px",
    },
    panel: {},
  };
});

const Order = () => {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const history = useHistory();
  let { id: OrderId } = useParams();
  useEffect(() => {
    fetch_order(OrderId);
    // console.log('-----OrderId', OrderId);
  }, [location, OrderId]);

  const { batch_messages } = useActions();

  const fetch_order = async (id) => {
    try {
      const resp = await axios.get(orderApi.show(id));
      setOrder(resp.data);
      setLoading(false);
    } catch (error) {
      batch_messages(
        error.response.data.errors.map((d) => d.message),
        "error"
      );
      history.push("/");
    }
  };

  return order && !loading ? (
    <OrderPanel order={order} setLoading={setLoading} />
  ) : (
    <Progress />
  );
};

const OrderPanel = ({ order, setLoading }) => {
  const { timeLeft } = useTimer(new Date(order.expiresAt));
  const classes = useStyle();
  const location = useLocation();
  const OrderId = order.id;
  const { batch_messages } = useActions();
  const auth = useSelector((state) => state.auth);
  const [form, setForm] = useState({
    phone: order.phoneNumber || auth.phone,
    address: order.address || auth.address,
  });
  const [lazy, setLazy] = useState(true);
  const [errors, setErrors] = useState({});
  const history = useHistory();
  // console.log(order);
  const theme = useTheme();
  const upMD = useMediaQuery(theme.breakpoints.up("md"));

  useEffect(() => {
    if (timeLeft < 0 && !location.pathname.endsWith("payment_success"))
      order_expired();
  }, [timeLeft, location]);

  let totalPrice = order
    ? order.snapshots.reduce((pre, curr) => {
        return pre + curr.number * curr.price;
      }, 0)
    : 0;
  const rate = parseFloat(
    (order.ExchangeRate["TWD"] / order.ExchangeRate["USD"]).toFixed(4)
  );
  const pay = parseFloat((parseFloat(totalPrice) / rate).toFixed(2));

  const varify = (value = form) => {
    // if (lazy) return true;

    let temp = { ...errors };
    if ("phone" in value)
      temp["phone"] =
        !value.phone ||
        !value.phone.startsWith("09") ||
        value.phone.length !== 12
          ? "手機號碼格式有誤"
          : "";

    if ("address" in value)
      temp["address"] = !value.address ? "請輸入地址" : "";

    setErrors({ ...temp });
    if (value === form) {
      return Object.values(temp).every((d) => d === "");
    }
  };

  const changePhone = (e) => {
    let p = e.target.value;
    // console.log(p);
    setForm({ ...form, phone: p });
    if (!lazy) varify({ phone: p });
  };
  const changeAddress = (e) => {
    let p = e.target.value;
    setForm({ ...form, address: p });
    if (!lazy) varify({ address: p });
  };

  const order_expired = () => {
    batch_messages(["訂單已逾期"], "error");
    setTimeout(() => {
      history.push(`/`);
    }, 1500);
  };

  const submit = async () => {
    setLazy(false);
    setLoading(true);
    if (varify() && timeLeft >= 0) {
      try {
        const resp = await axios.put(orderApi.update(OrderId), {
          address: form.address,
          phoneNumber: form.phone,
          charge: 0,
        });
        if (resp.data.status === "awaiting:payment") {
          history.push(`/order/${resp.data.id}/payment`);
          setLoading(false);
        } else {
          order_expired();
        }
      } catch (error) {
        // console.log('-------error', error.response.data);
        if (
          error.response.data.errors[0].message === "Order Already Cannceled"
        ) {
          order_expired();
        } else {
          setLoading(false);
        }
      }
    } else {
      order_expired();
    }
  };
  // console.log(order);
  return (
    <Container>
      <Paper>
        <Container>
          <Grid container spacing={2}>
            {order ? <TimerShow timeLeft={timeLeft} /> : null}
            <Header />
            <Grid
              container
              item
              xs={12}
              spacing={2}
              alignItems="center"
              className={classes.items}
            >
              {upMD
                ? order
                  ? order.snapshots.map((s) => (
                      <OrderShow key={s.id} snapshot={s} />
                    ))
                  : null
                : order
                ? order.snapshots.map((s) => (
                    <OrderShowMD key={s.id} snapshot={s} />
                  ))
                : null}
            </Grid>
            <Grid container item spacing={2} xs={12} alignItems="center">
              <Grid item xs={12} container justifyContent="flex-end">
                <Grid item xs={4}>
                  <Typography>總計: TWD$ {totalPrice}</Typography>
                </Grid>
              </Grid>
            </Grid>
            <Switch>
              <Route path="/order/:id/payment">
                {order && order.status === "awaiting:payment" ? (
                  <Payment
                    order={order}
                    totalPrice={totalPrice}
                    pay={pay}
                    rate={rate}
                    setLoading={setLoading}
                  />
                ) : null}
              </Route>
              <Route path="/order/:id/payment_success">
                {order ? (
                  <PaymentSuccess
                    order={order}
                    totalPrice={totalPrice}
                    pay={pay}
                    rate={rate}
                  />
                ) : null}
              </Route>
              <Route path="/order/:id">
                <OrderDetail
                  changePhone={changePhone}
                  changeAddress={changeAddress}
                  form={form}
                  errors={errors}
                  lazy={lazy}
                  submit={submit}
                />
              </Route>
              <Redirect to="/" />
            </Switch>
          </Grid>
        </Container>
      </Paper>
    </Container>
  );
};

const TimerShow = ({ timeLeft }) => {
  // const { timeLeft } = useTimer(new Date(order.expiresAt));
  return <p>Time left to pay: {Math.round(timeLeft / 1000)} seconds </p>;
};

const Header = () => {
  const theme = useTheme();
  const upMD = useMediaQuery(theme.breakpoints.up("md"));
  return (
    <Grid container item xs={12} spacing={2} alignItems="center">
      <Grid item xs={12}>
        <Typography variant={"h4"} component="h4">
          訂單
        </Typography>
      </Grid>
      <Grid item xs={upMD ? 12 : 1}>
        <Typography>商品</Typography>
      </Grid>
      <Grid item xs={3}></Grid>
      {upMD ? (
        <>
          <Grid item xs={1}>
            <Typography>選項</Typography>
          </Grid>
          <Grid item xs={1}>
            <Typography>數量</Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography>單價</Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography>總價</Typography>
          </Grid>
        </>
      ) : null}
    </Grid>
  );
};

const OrderDetail = ({
  changePhone,
  changeAddress,
  form,
  errors,
  lazy,
  submit,
}) => {
  return (
    <Grid container item spacing={2} xs={12} alignItems="center">
      <Grid item xs={12}>
        <Typography>購買人資料: </Typography>
      </Grid>
      <Grid item xs={4}>
        <Typography variant="body1">手機</Typography>
      </Grid>
      <Grid item xs={8}>
        <TextField
          value={form["phone"]}
          onChange={changePhone}
          error={!lazy && errors["phone"] !== ""}
          helperText={errors["phone"]}
          InputProps={{
            inputComponent: PhoneInputMask,
          }}
        />
      </Grid>
      <Grid item xs={4}>
        <Typography variant="body1">地址</Typography>
      </Grid>
      <Grid item xs={8}>
        <TextField
          onChange={changeAddress}
          value={form["address"]}
          required
          error={!lazy && errors["address"] !== ""}
          helperText={errors["address"]}
        />
      </Grid>
      <Grid
        item
        xs={12}
        container
        alignItems="center"
        justifyContent="flex-end"
      >
        <Grid item>
          <Button variant="outlined" onClick={submit}>
            訂購
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};
export default Order;
