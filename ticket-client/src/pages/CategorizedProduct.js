import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Grid,
  Container,
  Link,
  Breadcrumbs,
  // makeStyles,
  CssBaseline,
} from "@material-ui/core";
import { ProductCard,  CategorizePanel } from "Components";
import { useActions } from "hooks/useActions";
import axios from "axios";
import { productApi } from "api/productApi";
import { useLocation } from "react-router";
import { GroupList } from "Composables/GroupList";

let g = {};
GroupList.forEach((d) => {
  g[d["path"]] = d["text"];
});

// const useStyles = makeStyles((theme) => {
//   return {
//     root: {
//       height: 180,
//     },
//     typography: {
//       padding: theme.spacing(2),
//     },
//     text: {
//       fontWeight: "200",
//     },
//   };
// });



const CategorizedProduct = () => {
  let { group } = useParams();
  const [products, setProducts] = useState([]);
  const [filtered_products, setFilteredProducts] = useState([]);
  const { batch_messages } = useActions();
  const location = useLocation();


  useEffect(() => {
    const fetch_product = async () => {
      try {
        // console.log('-----tag', group);
        const res = await axios.post(productApi.show_by_tags(group));
        setProducts(res.data);
      } catch (error) {
        if (error.response.data.errors)
          batch_messages(
            error.response.data.errors.map((d) => d.message),
            "error"
          );
      }
    };

    fetch_product();

    // console.log(products);
  }, [location]);
  const tag = location.pathname.split("/").slice(-1)[0];

  return (
    <Container>
      <Container>
        <Grid container item xs={12} spacing={2}>
          <Grid item xs={12}>
            <Breadcrumbs separator="›" aria-label="breadcrumb">
              <Link href="/">首頁</Link>
              <Link href={`/CategorizedProduct/${tag}`}>{g[tag]}</Link>
            </Breadcrumbs>
          </Grid>
          <Grid
            item
            container
            xs={12}
            md={2}
            alignItems="flex-start"
            direction="row"
            justifyContent="flex-start"
          >
            <Grid item container spacing={2}>
            <CategorizePanel setFilteredProducts={setFilteredProducts} products={products}/>
              
              {/* <Grid item></Grid> */}
            </Grid>
          </Grid>
          <Grid item container xs={12} md={10} spacing={2}>
            {filtered_products.map((d, i) => (
              <Grid item xs={12} sm={6} lg={4} key={i}>
                <ProductCard
                  product={d}
                  key={d.id}
                  // onClick={(e) => {
                  //   console.log("------id", d.id);
                  // }}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>
        <CssBaseline />
      </Container>
    </Container>
  );
};

export default CategorizedProduct;
