import React, { useState, useEffect } from "react";
import axios from "axios";
import { prerenderApi } from "api/prerender_api";


const useStart = () => {
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(true);

  const [startPayload, setStartPayload] = useState({
    gallary: [],
    tags: [],
  });

  const callPrerender = async () => {
    try {
      const resp = await axios.get(prerenderApi.get());
      setStartPayload(resp.data);
    } catch (e) {}
    setLoading(false);


  };


  useEffect(() => {
    if (refresh) {
      callPrerender();
      setRefresh(false);
      setTimeout(() => {
        setRefresh(true);
      }, 24 * 60 * 60 * 1000);
    }
  }, []);

  return { loading, startPayload };
};

export { useStart };
