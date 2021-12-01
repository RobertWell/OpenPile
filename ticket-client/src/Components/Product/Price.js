import React from "react";
import {
  Grid,
  Typography,
} from "@material-ui/core";


  export const Price = ({ discount, price }) => {
    return discount && discount !== 100 ? (
      <div>
        <Grid container alignItems="center" spacing={5}>
          <Grid item>
            <Typography
              style={{
                fontSize: "24px",
                color: "#d0011b",
                fontWeight: "bold",
              }}
            >
              $ {price}
            </Typography>
          </Grid>
          <Grid item>
            <Typography
              style={{
                fontSize: "12px",
                color: "white",
                backgroundColor: "#d0011b",
                fontWeight: "bold",
                padding: "2px",
              }}
            >
              {parseFloat(discount / 10).toFixed(1)}折
            </Typography>
          </Grid>
        </Grid>
  
        <Typography
          style={{ fontSize: "10px", color: "grey", marginBottom: "5px" }}
        >
          <span style={{ textDecoration: "line-through" }}>
            $ {parseInt((price / discount) * 100)}
          </span>
        </Typography>
      </div>
    ) : (
      <Typography
        style={{
          fontSize: "24px",
          color: "#d0011b",
          fontWeight: "bold",
        }}
      >
        $ {price}
      </Typography>
    );
  };
  