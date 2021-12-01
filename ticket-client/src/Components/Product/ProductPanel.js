import React from "react";
import {
  makeStyles,
  Grid,
  Select,
  Typography,
  FormControl,
  InputLabel,
  Avatar,
  TextField,
  Button,
} from "@material-ui/core";

import { Price, ShoppingCart } from "Components";
import { getSold } from "Composables/getSold";

const useStyles = makeStyles((theme) => {
  return {
    root: {
      height: "100%",
    },
    progress: {
      display: "flex",
      "& > * + *": {
        marginLeft: theme.spacing(2),
      },
      padding: theme.spacing(2),
    },
    media: {
      height: 0,
      paddingTop: "56.25%", // 16:9
    },

    Header: {
      padding: "10px 10px 40px 10px",
      // paddingBottom:"40px",
    },
    large: {
      width: theme.spacing(7),
      height: theme.spacing(7),
    },
  };
});
export const ProductPanel = ({
  product,
  option,
  setOption,
  setNumber,
  number,
  purchase,
  addCargo,
}) => {
  const classes = useStyles();
  const max =
    product.options[option]["number"] - product.options[option]["sold"] > 0
      ? product.options[option]["number"] - product.options[option]["sold"]
      : 0;
  const singleOption = Object.keys(product.options).length <= 1;
  const remains = max;

  return (
    <Grid
      container
      spacing={3}
      justifyContent="space-between"
      direction="row"
      alignItems="center"
    >
      <Grid item xs={12}>
        <Typography component="h4" variant="h4">
          {product.title}
        </Typography>
        <Typography variant="subtitle1">{product.short_description}</Typography>
      </Grid>
      {product.long_descrition ? (
            <Grid item xs={9}>
              <Typography style={{ fontSize: "14px", color: "grey" }}>
                {product.long_descrition}
              </Typography>
            </Grid>
          ) : null}
      <Grid item xs={4}>
        <Avatar
          className={classes.large}
          variant="square"
          src={product.options[option]["thumbnail"]}
          alt={`${option}_thumbnail`}
        />
      </Grid>
      <Grid item xs={8}>
        {singleOption ? (
          <Typography>{Object.keys(product.options)[0]}</Typography>
        ) : (
          <FormControl id="select-label">
            <InputLabel id="select-label">選項</InputLabel>
            {/* 非原生版的有bug，會影響版面 */}
            <Select
              native={true}
              // labelId="select-label"
              value={option}
              onChange={(e) => {
                setOption(e.target.value);
              }}
            >
              {Object.keys(product.options).map((k) => (
                <option key={k} value={k}>
                  {k}
                </option>
              ))}
            </Select>
          </FormControl>
        )}
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Typography>
              已售出: {getSold(product.options, option, product.title)}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography>庫存：{remains}</Typography>
          </Grid>

          <Grid item xs={12}>
            <Price
              price={product.options[option]["price"]}
              discount={product.discount}
            />
          </Grid>

          {max <= 0 ? (
            <Grid item xs={12}>
              <Typography variant="body1" style={{color:'grey'}}>已售罄</Typography>
            </Grid>
          ) : (
            <>
              <Grid item xs={12}>
                <TextField
                  label="數量"
                  type="number"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  InputProps={{ inputProps: { min: 0, max } }}
                  onChange={(e) => {
                    const {
                      target: { value },
                    } = e;
                    if (parseInt(value) <= max) setNumber(value);
                  }}
                  value={number}
                />
              </Grid>

              <Grid item container spacing={2}>
                <Grid item>
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    disableElevation
                    onClick={purchase}
                  >
                    直接購買
                  </Button>
                </Grid>
                <Grid item>
                  <ShoppingCart onClick={addCargo} />
                </Grid>
              </Grid>
            </>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ProductPanel;
