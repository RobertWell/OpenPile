import React from "react";
import { Grid } from "@material-ui/core";
import { Typography, makeStyles, Button } from "@material-ui/core";
import axios from "axios";
import StripeCheckout from "react-stripe-checkout";
import { useDoRequest } from "hooks/useDoRequest";
import { paymentApi } from "api/payment_api";
import { useHistory } from "react-router";

import { useSelector } from "react-redux";
import { PriceShow } from "Components";
import { ticketApi } from "api/ticket_api";
import { useActions } from "hooks/useActions";
const useStyle = makeStyles(() => {
  return {
    panel: {
      //   borderTop: "solid grey 1px",
      borderBottom: "solid grey 1px",
      marginBottom: "10px",
    },
  };
});

const Payment = ({ order, totalPrice, pay, rate, setLoading }) => {
  // console.log(order.snapshots.map(d=>d.ticket));
  const history = useHistory();
  const auth = useSelector((state) => state.auth);
  const {batch_messages}=useActions()
  const { doRequest } = useDoRequest({
    url: paymentApi.new(),
    method: "post",
    body: {
      orderId: order.id,
    },
    onSuccess: () => {
      let ticketIds = order.snapshots.map((d) => d.ticket);
      // console.log("-------ticketIds", ticketIds);
      try {
        axios
          .put(ticketApi.batch_delete_tickets(), { ticketIds })
          .then((results) => {
            // console.log("--------results", results);
            setLoading(false);
            history.push(`/order/${order.id}/payment_success`);
          });
      } catch (error) {
        batch_messages(
          error.response.data.errors.map((d) => d.message),
          "error"
        );
        history.push(`/order/${order.id}/payment_success`);
      }
    },
    onError: (error) => {
      // console.log("-----error", error);
      batch_messages(
        error.response.data.errors.map((d) => d.message),
        "error"
      );
    },
  });

  return (
    <Grid container item spacing={2} xs={12}>
      <OrderDetailShow order={order} />
      <Grid item container xs={12}>
        <PriceShow totalPrice={totalPrice} pay={pay} rate={rate} />
        <Grid item xs={12} style={{ marginTop: "20px" }}>
          <Typography style={{ color: "red" }}>※此處為測試版</Typography>
          <Typography style={{ color: "red" }}>
            ※請使用測試用信用卡號
          </Typography>
          <Typography style={{ color: "red" }}>
            ※如: 4242 4242 4242 4242{" "}
          </Typography>
          <Typography style={{ color: "red" }}>
            ※與合規範的有效日期(50年內)與驗證碼({">="}3位數){" "}
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          container
          alignItems="center"
          justifyContent="center"
        >
          <Grid item>
            <StripeCheckout
              token={({ id }) => {
                setLoading(true);
                doRequest({ token: id });
              }}
              stripeKey="pk_test_51JHPMUISiz5vsFddQVbdpG3PR92rYjgrx4IR8bDa3Ehd0dyvI9K710Og3KnTZ1MTvfpOkhCFA58FUSee0YbQvx5h00mDSKiiG5"
              amount={pay * 100}
              email={auth.email}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

const OrderDetailShow = ({ order }) => {
  const classes = useStyle();
  return (
    <Grid
      container
      item
      spacing={2}
      xs={12}
      alignItems="center"
      className={classes.panel}
    >
      <Grid item xs={12}>
        <Typography>購買人資料: </Typography>
      </Grid>
      <Grid item xs={4}>
        <Typography variant="body1">手機</Typography>
      </Grid>
      <Grid item xs={8}>
        <Typography variant="body1">{order["phoneNumber"]}</Typography>
      </Grid>
      <Grid item xs={4}>
        <Typography variant="body1">地址</Typography>
      </Grid>
      <Grid item xs={8}>
        <Typography variant="body1">{order["address"]}</Typography>
      </Grid>
      <Grid item container justifyContent="flex-end">
        <Grid item>
          <Button
            variant="outlined"
            color="primary"
            href={`/order/${order.id}`}
          >
            修改
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export { Payment };
