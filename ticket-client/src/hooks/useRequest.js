import axios from "axios";
import { useState } from "react";
import { Typography } from "@material-ui/core";

const useRequest = ({ url, method, body, onSuccess }) => {
  const [errors, setErrors] = useState(null);

  const doRequest = async (props) => {
    try {
      setErrors(null);
      const res = await axios[method](url, { ...body, ...props });
      // console.log(res);
      if (onSuccess) onSuccess(res.data);
      return res.data;
    } catch (error) {
      // console.log('---------------error', error);
      setErrors(
        <div>
          {error.response.data.errors.map((err) => (
            <Typography color="error" key={err.message}>
              {err.message}
            </Typography>
          ))}

          {/* <h4>Oooops...</h4>
          <ul className="my-0">
            {error.response.data.errors.map((err) => (
              <li key={err.message}>{err.message}</li>
            ))}
          </ul> */}
        </div>
      );
      return error.response.data
      
    }
  };

  return { errors, doRequest };
};

export default useRequest;
