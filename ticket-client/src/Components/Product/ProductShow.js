import React, { useState } from "react";
import { makeStyles, Grid, CardMedia } from "@material-ui/core";
import Slider from "react-slick";
import { ProductPanel, ProductContent } from "Components";
import { useActions } from "hooks/useActions";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

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
      paddingTop: "80%", // 16:9
    },

    large: {
      width: theme.spacing(7),
      height: theme.spacing(7),
    },
    Content: {
      marginTop: "20px",
    },
  };
});

export const ProductShow = ({ product }) => {
  const classes = useStyles();
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 500,
    autoplaySpeed: 5000,
    cssEase: "linear",
    lazyLoad: true,
    arrows: false,
  };
  const [option, setOption] = useState(Object.keys(product.options)[0]);
  const [number, setNumber] = useState(1);

  const { new_ticket, direct_purchase, batch_messages, fetch_tickets } =
    useActions();
  const auth = useSelector((state) => state.auth);
  // const {add_message} =useActions()
  const history = useHistory();
  const purchase = (e) => {
    // console.log("=======purchase");
    if (auth.id) {
      direct_purchase(
        {
          title: product.title,
          productId: product.id,
          creatorId: product.creatorId,
          number,
          optionKey: option,
          options: product.options,
          tags: product.tags,
        },
        () => {
          fetch_tickets(() => {
            history.push("/ticket");
          });
        },
        (data) => {
          const messages = data.errors.map((d) => d.message);
          if (messages[0] === "Duplicate Ticket!") history.push("/ticket");
          else batch_messages(messages, "error");
        }
      );
    } else {
      history.push("/auth/login");
    }
  };
  // console.log('--------product', product);
  const addCargo = (e) => {
    if (auth.id) {
      new_ticket({
        title: product.title,
        productId: product.id,
        creatorId: product.creatorId,
        number,
        optionKey: option,
        options: product.options,
        tags: product.tags,
      });
    } else {
      history.push("/auth/login");
    }
  };
  return (
    <Grid container spacing={4}>
      <Grid item xs={12} md={8}>
        <Slider {...settings}>
          {product.fullFigures.map((item, i) => (
            <CardMedia
              className={classes.media}
              image={item}
              title="full image"
              key={i}
              // className={classes.img}
            />
          ))}
        </Slider>
      </Grid>
      <Grid item xs={12} md={4}>
        <ProductPanel
          product={product}
          option={option}
          setOption={setOption}
          setNumber={setNumber}
          number={number}
          purchase={purchase}
          addCargo={addCargo}
        />
      </Grid>
      <Grid item xs={12} className={classes.Content}>
        <ProductContent ContentImg={product.ContentImg} />
      </Grid>
    </Grid>
  );
};
