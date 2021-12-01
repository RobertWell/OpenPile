import React, { useState, useEffect } from "react";
import { productApi } from "api/productApi";

import { useActions } from "hooks/useActions";

import axios from "axios";



const useGetProduct = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { batch_messages } = useActions();
  useEffect(() => {
    setLoading(true);
    const fetch_product = async () => {
      try {
        const res = await axios.get(productApi.get());
        setProducts(res.data);
      } catch (error) {
        if (error.response.data.errors)
          batch_messages(
            error.response.data.errors.map((d) => d.message),
            "error"
          );
      }

          setLoading(false);
    };

    fetch_product();

    // console.log(products);
  }, []);
  return {
    products,
    loading,
  };
};

export { useGetProduct };
