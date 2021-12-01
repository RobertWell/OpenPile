import React from "react";

import { Grid, Container } from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
import { makeStyles } from "@material-ui/styles";
import Slider from "react-slick";
import { ProductCard, GallaryImg, LoadingCard } from "Components";
import { useActions } from "hooks/useActions";
import { useStart } from "hooks/useStart";
import { useGetProduct } from "hooks/useGetProduct";

const useStyles = makeStyles((theme) => ({
  root: {
    // maxWidth: 345,
    // background:'black'
    width: "100%",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: "red",
  },
  mediaHead: {
    // height: "500px",
    backgroundPosition: "0 80%",
    // width:'100%'
  },
  img: {
    left: "50%",
    transform: " translateX(-50%)  translateY(-50%)",
    width: "100%",
    position: "absolute",
  },
  range: {
    // height: "600px",
    // margin: "0 auto",
    // overflow: "hidden",
    // position: "relative",
    // display: 'flex',
    // flexWrap: 'wrap',
    // minWidth: 300,
    // width: '100%',
  },
}));

const Home = () => {
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
    arrows:false
  };

  const { batch_messages } = useActions();
  const { loading, startPayload } = useStart();
  const { products, loading: productLoading } = useGetProduct();

  return (
    <div>
      <Grid container  justifyContent='center' >
        <Grid item xs={12}>
            {loading ? (
              <Skeleton height={118} />
            ) : (
              // <div>123</div>
              <Slider {...settings} style={{minWidth:0}}>
                {startPayload["gallary"].map((d, i) => (
                  <GallaryImg product={d} href={`/product/${d.id}`} key={i}/>
                ))}
              </Slider>
            )}
        </Grid>
        <Grid item container xs={12} spacing={2} justifyContent='center' style={{marginTop:"30px"}}>
          {productLoading ? (
            <LoadingCard />
          ) : (
            products.map((d, i) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={i}>
                <ProductCard
                  product={d}
                  key={d.id}
                />
              </Grid>
            ))
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default Home;
