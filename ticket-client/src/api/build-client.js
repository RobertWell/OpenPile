import axios from "axios";

const buildClient = ({ req }) => {
  if (typeof window === "undefined") {
    // console.log(req.headers);
    // console.log('----------------------------------process.env.INNERT_BASE_URL:', process.env.INNERT_BASE_URL);
    return axios.create({
      // baseURL:'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/',
      baseURL: process.env.INNER_BASE_URL,
      headers: req.headers,
    });
  } else {
    return axios.create({
      baseURL: "/",
    });
  }
};

export  {buildClient};
