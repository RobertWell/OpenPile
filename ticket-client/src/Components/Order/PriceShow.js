import { Grid,Typography  } from "@material-ui/core";
import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt";


export const PriceShow = ({totalPrice, pay, rate}) => {
    return (
      <>

        <Grid item xs={6} container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="body1">費用: </Typography>
          </Grid>
          <Grid item>
            <Typography variant="body1">TWD$ {totalPrice} </Typography>{" "}
          </Grid>
          <Grid item>
            <ArrowRightAltIcon />
          </Grid>
          <Grid item>
            <Typography variant="body1">USD$ {pay}</Typography>
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="subtitle2" style={{ color: "grey" }}>
            當前匯率: {rate}
          </Typography>
        </Grid>
      </>
    );
  };