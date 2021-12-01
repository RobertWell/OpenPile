import React from "react";
import { PriceShow } from "Components";
import { Grid,Typography  } from "@material-ui/core";
const PaymentSuccess = ({ order, totalPrice, pay, rate }) => {
    
  return (
    <Grid container spacing={2} item>
      <PriceShow totalPrice={totalPrice} pay={pay} rate={rate} />
      <Grid item xs={12}>
          <Typography variant={'h6'}>訂單已完成! </Typography>
          <Typography variant='subtitle1' style={{color:'red', fontWeight:"15"}}>※此為測試版 </Typography>
      </Grid>
    </Grid>
  );
};

export { PaymentSuccess };
