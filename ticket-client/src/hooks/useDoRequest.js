import axios from 'axios'
export const useDoRequest=({ url, method, body, onSuccess, onError })=>{
    const doRequest = async (props) => {
      try {
        const res = await axios[method](url, { ...body, ...props });
        if (onSuccess) onSuccess(res.data);
        return res.data;
      } catch (error) {
        if(onError) onError(error.response.data)
        return error.response.data
        
      }
    };
  
    return {  doRequest };
}