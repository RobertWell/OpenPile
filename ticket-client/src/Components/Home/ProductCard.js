import React from "react";
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Typography,
  makeStyles,
  Grid,
  CardActionArea,
} from "@material-ui/core";
import { getAllSold } from "Composables/getSold";
const useStyles = makeStyles((theme) => {
  return {
    root: {
    },
    cover: ({ discount }) => {
      return {
        "&:after": discount
          ? {
              position: "absolute",
              content: '"特價中"',
              // top: 0,
              alignItems:"center",
              // height:"30px",
              bottom:'10px',
              right:'-80px',
              width: "200px",
              transform: "rotate(-0.125turn)",
              background: "red",
              color:'white',
              opacity: "0.7",
              // textAlign: "center",
              justifyContent:"center",
              display: 'flex',
            }
          : '',
      }
    },

    media: {
      height: 0,
      paddingTop: "56.25%", // 16:9
    },

    content: {
      display: "flex",
      alignItems: "center",
      paddingLeft: theme.spacing(1),
      paddingBottom: theme.spacing(1),
    },
  };
});
const ProductCard = ({ product }) => {
  const discount = product.tags.includes("discount");
  
  const classes = useStyles({ discount });
  const [maxPrice, minPrice] = getPrice(product.options);
  const sold = getAllSold(product.options, product.title);

  return (
    <Card className={classes.root}>
      <CardActionArea href={`/product/${product.id}`}>
        <div style={{ overflow: "hidden", position: "relative" }}>
          <div className={classes.cover}>
            <CardMedia
              className={classes.media}
              image={product.cover}
              title={product.title}
            />
          </div>
        </div>

        <CardHeader title={product.title} />
        <CardContent className={classes.content}>
          <Grid container justifyContent="space-between">
            <Grid item>
              <Typography>
                ${" "}
                {maxPrice === minPrice ? maxPrice : `${minPrice} - ${maxPrice}`}{" "}
                元
              </Typography>
            </Grid>
            <Grid item>
              <Typography>已售出: {sold}</Typography>
            </Grid>
          </Grid>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

const getPrice = (options) => {
  let min = Number.MAX_SAFE_INTEGER,
    max = Number.MIN_SAFE_INTEGER;
  //   console.log("-----", options);
  for (let option in options) {
    min = options[option].price < min ? options[option].price : min;
    max = options[option].price > max ? options[option].price : max;
  }

  return [max, min];
};

export { ProductCard };
