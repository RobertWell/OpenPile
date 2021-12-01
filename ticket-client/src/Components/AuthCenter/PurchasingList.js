import React, { useState, useEffect } from "react";
import {
  Grid,
  makeStyles,
  Typography,
  Avatar,
  Collapse,
  useTheme,
  useMediaQuery,
} from "@material-ui/core";
import axios from "axios";
import { orderApi } from "api/order_api";
import { formatDistance, format } from "date-fns";
import { OrderShowMD } from "Components";

const useStyles = makeStyles((theme) => {
  return {
    Panel: {
      border: "1px grey solid",
      borderRadius: "10px",
      padding: "20px 10px !important",
      marginBottom: "10px",
      backgroundColor: "#e6e6e6",
    },
    Item: {
      backgroundColor: "white",
      marginBottom: "5px",
      border: `1px solid white`,
      borderRadius: "5px",
      "&:hover": {
        border: `1px solid  ${theme.palette.primary.main}`,
      },
    },
    Show: {
      borderTop: "1px solid",
      borderBottom: "1px solid",
      padding: "2px",
      "&>div:not(:first-child) .Panel": {
        borderTop: "0.5px solid grey",
      },
      "&>div:not(:first-child)>div": {
        paddingTop: "14px",
      },

      "& img": {
        border: "0.5px solid grey",
      },
    },
  };
});

const PurchasingList = () => {
  const classes = useStyles();
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const fetch_order = async () => {
      const resp = await axios.get(orderApi.show_complete());

      setOrders(resp.data);
    };
    fetch_order();
  }, []);
  
  const dev = process.env.NODE_ENV === "development";
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h6">
          訂單紀錄{" "}
          {dev ? (
            <span style={{ color: "red", fontSize: "10px" }}>
              (此處為測試版)
            </span>
          ) : null}
        </Typography>
      </Grid>
      <Grid item xs={12} className={classes.Panel}>
        {orders.length ? <OrderSnapPanel orders={orders} /> : null}
      </Grid>
    </Grid>
  );
};
const OrderSnapPanel = ({ orders }) => {
  // const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Grid container spacing={2} justifyContent="center">
      <Grid item container justifyContent="flex-start" xs={12} spacing={2}>
        <Grid item xs={12}>
          {matches ? null : <Header />}
        </Grid>
      </Grid>
      <Grid container item xs={12} spacing={2} alignItems="center">
        {orders.map((order) => (
          <OrderItem key={order.id} order={order} />
        ))}
      </Grid>
    </Grid>
  );
};
const OrderItem = ({ order }) => {
  const classes = useStyles();
  const [checked, setChecked] = useState(false);
  let time = new Date(order.expiresAt);
  let distance = formatDistance(time, new Date(), { addSuffix: true });
  const totalPrice = order.snapshots.reduce((pre, curr) => {
    return pre + curr.number * curr.price;
  }, 0);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));
  // console.log('---order', order);
  return (
    <>
      <Grid
        container
        item
        xs={12}
        className={classes.Item}
        onClick={() => {
          setChecked(!checked);
        }}
        direction={"row-reverse"}
      >
        <Grid item container justifyContent="flex-end" xs={12} md={2}>
          <Grid item>
            <Typography
              variant="subtitle1"
              style={{ fontSize: "10px", color: "grey" }}
            >
              {distance}
            </Typography>
          </Grid>
        </Grid>

        <Grid item xs={12} container className={classes.Show}>
          {order.snapshots.map((s) =>
            matches ? (
              <OrderShowMD key={s.id} snapshot={s} />
            ) : (
              <OrderShow key={s.id} snapshot={s} />
            )
          )}
        </Grid>
      </Grid>
      <Grid item container xs={12}>
        <Collapse in={checked}>
          <Grid item container>
            <Grid item>日期：</Grid>
            <Grid item>{format(time, "yyyy-MM-dd")}</Grid>
          </Grid>
          <Grid item container>
            <Grid item>總金額：</Grid>
            <Grid item>TWD$ {totalPrice}</Grid>
          </Grid>
          <Grid item container>
            <Grid item>手機號碼：</Grid>
            <Grid item>{order.phoneNumber}</Grid>
          </Grid>
          <Grid item container>
            <Grid item>地址：</Grid>
            <Grid item>{order.address}</Grid>
          </Grid>
        </Collapse>
      </Grid>
    </>
  );
};

const Header = () => {
  return (
    <Grid container item xs={10} alignItems="center">
      <Grid item xs={1}>
        <Typography>商品</Typography>
      </Grid>
      <Grid item xs={4}></Grid>
      <Grid item xs={2}>
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
    </Grid>
  );
};
const OrderShow = ({ snapshot }) => {
  return (
    <Grid container item spacing={2} alignItems="center">
      <Grid item xs={1}>
        <Avatar variant={"square"} sizes={"small"} src={snapshot.thumbnail} />
      </Grid>

      <Grid item xs={4}>
        <Typography>{snapshot.title}</Typography>
      </Grid>
      <Grid item xs={2}>
        <Typography>{snapshot.optionKey}</Typography>
      </Grid>
      <Grid item xs={1}>
        <Typography>{snapshot.number}</Typography>
      </Grid>
      <Grid item xs={2}>
        <Typography>{snapshot.price}</Typography>
      </Grid>
      <Grid item xs={2}>
        <Typography>{snapshot.number * snapshot.price}</Typography>
      </Grid>
    </Grid>
  );
};
export { PurchasingList };
