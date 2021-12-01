import React, { useState, useEffect } from "react";
import { Grid, Chip } from "@material-ui/core";
import { CustomedMenu } from "Components";
import { getAllSold } from "Composables/getSold";

const CategorizePanel = ({ setFilteredProducts, products }) => {
  const [order_index, setOrderIndex] = useState(-1);
  const [price_index, setPriceIndex] = useState(-1);
  //   const [group_index, setGroupIndex] = useState(-1);

  useEffect(() => {
    setFilteredProducts([...products]);
  }, [products]);

  useEffect(() => {
    let temp = [...products];

    temp = categorize_by_order({ products: temp, order_index });

    temp = categorize_by_price({ products: temp, price_index });
    setFilteredProducts([...temp]);
  }, [order_index, price_index]);



  const order_options = [
    { c: <span>最新</span>, text: "最新" },
    {
      c: (
        <span>
          價格 <span style={{ fontWeight: "200" }}>高-低</span>
        </span>
      ),
      text: "價格(高-低)",
    },
    {
      c: (
        <span>
          價格 <span style={{ fontWeight: "200" }}>低-高</span>
        </span>
      ),
      text: "價格(低-高)",
    },
    { c: <span>銷售量 </span>, text: "銷售量" },
  ];

  const price_options = [
    { c: <span>0-1000元</span>, text: "0-1000元" },
    { c: <span>1000-2000元</span>, text: "1000-2000元" },
    { c: <span>2000-3000元</span>, text: "2000-3000元" },
    { c: <span>{">="}3000元</span>, text: ">=3000元" },
  ];

  //   const group_options = [
  //     { c: <span>T-Shirt</span>, text: "T-Shirt" },
  //     { c: <span>牛仔褲</span>, text: "牛仔褲" },
  //     { c: <span>西裝</span>, text: "西裝" },
  //     { c: <span>洋裝</span>, text: "洋裝" },
  //     { c: <span>背包</span>, text: "背包" },
  //     { c: <span>鞋子</span>, text: "鞋子" },
  //   ];
  return (
    <>
      <Grid item xs={4} md={12}>
        <CustomedMenu
          text={"排序"}
          options={order_options.map((d) => d["c"])}
          selectedIndex={order_index}
          setSelectedIndex={setOrderIndex}
        />
      </Grid>
      <Grid item xs={4} md={12}>
        <CustomedMenu
          text={"價格"}
          options={price_options.map((d) => d["c"])}
          selectedIndex={price_index}
          setSelectedIndex={setPriceIndex}
        />
      </Grid>
      {/* <Grid item xs={4} md={12}>
        <CustomedMenu
          text={"產品分類"}
          options={group_options.map((d) => d["c"])}
          selectedIndex={group_index}
          setSelectedIndex={setGroupIndex}
        />
      </Grid> */}
      <Grid item container spacing={1}>
        {order_index > -1 ? (
          <Grid item>
            <Chip
              label={order_options[order_index]["text"]}
              //   onClick={handleClick}
              onDelete={() => {
                setOrderIndex(-1);
              }}
            />
          </Grid>
        ) : null}
        {price_index > -1 ? (
          <Grid item>
            <Chip
              label={price_options[price_index]["text"]}
              //   onClick={handleClick}
              onDelete={() => {
                setPriceIndex(-1);
              }}
            />
          </Grid>
        ) : null}
        {/* {group_index > -1 ? (
          <Grid item>
            <Chip
              label={group_options[group_index]["text"]}
              //   onClick={handleClick}
              onDelete={() => {
                setGroupIndex(-1);
              }}
            />
          </Grid>
        ) : null} */}
      </Grid>
    </>
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

const categorize_by_order = ({ products, order_index }) => {
  let comparator = () => 0;
  switch (order_index) {
    case 0:
      comparator = (a, b) => {
        let a1 = new Date(a["createAt"]).getTime();
        let b1 = new Date(b["createAt"]).getTime();
        return a1 - b1;
      };

      break;
    case 1:
      comparator = (a, b) => {
        let [, aMin] = getPrice(a.options);
        let [, bMin] = getPrice(b.options);
        return bMin - aMin;
      };

      break;
    case 2:
      comparator = (a, b) => {
        let [, aMin] = getPrice(a.options);
        let [, bMin] = getPrice(b.options);
        return aMin - bMin;
      };
      break;
    case 3:
      comparator = (a, b) => {
        let aSold = getAllSold(a.options, a.title);
        let bSold = getAllSold(b.options, b.title);

        
        return bSold - aSold;
      };
      break;
    default:
      break;
  }

  return products.sort(comparator);
};

const categorize_by_price = ({ products, price_index }) => {
  let filterer = (d) => d;
  switch (price_index) {
    case 0:
      filterer = (d) => {
        let [, dMin] = getPrice(d.options);

        return dMin < 1000;
      };

      break;
    case 1:
      filterer = (d) => {
        let [dMax, dMin] = getPrice(d.options);

        return dMax >= 1000 && dMin < 2000;
      };

      break;
    case 2:
      filterer = (d) => {
        let [dMax, dMin] = getPrice(d.options);

        return dMax >= 2000 && dMin < 3000;
      };

      break;
    case 3:
      filterer = (d) => {
        let [dMax, ] = getPrice(d.options);
        return dMax >= 3000;
      };
      break;
    default:
      break;
  }

  return products.filter(filterer);
};

export { CategorizePanel };
