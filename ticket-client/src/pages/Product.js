import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useDoRequest } from "hooks/useDoRequest";
import { productApi } from "api/productApi";
import {
  Paper,
  CircularProgress,
  Container,
  makeStyles,
  Grid,
} from "@material-ui/core";

import { ProductShow } from "Components";
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
      // marginBottom:"20px"
      // paddingBottom:"40px",
    },
    large: {
      width: theme.spacing(7),
      height: theme.spacing(7),
    },
  };
});

const Product = () => {
  const classes = useStyles();
  const [product, setProduct] = useState(null);
  // console.log('--------product', product);
  let { id } = useParams();
  const { doRequest: getProduct } = useDoRequest({
    url: productApi.show(id),
    method: "get",
    onSuccess: (data) => {
      setProduct(data);
    },
  });
  useState(async () => {
    await getProduct();
  }, []);

  return (
    <Container>
      <Paper className={classes.root}>
        {product ? (
          <Grid className={classes.Header}>
            <ProductShow product={product} />
          </Grid>
        ) : (
          <div className={classes.progress}>
            <CircularProgress style={{ margin: "auto" }} />
          </div>
        )}
      </Paper>
    </Container>
  );
};

export default Product;
