import React, { useEffect } from "react";
import axios, { AxiosResponse } from "axios";
import { tryCatch, map } from "fp-ts/lib/TaskEither";
import { Task } from "fp-ts/lib/Task";
import { pipe } from "fp-ts/lib/function";
import * as TE from "fp-ts/lib/TaskEither";
interface Props {}

const getFailedTask = async () => {
  return axios.get("https://sss");
};
const a = pipe(
  TE.tryCatch(
    () => getFailedTask(),
    (reason) => {
        console.log(reason);
        
        return new Error(`${reason}`)
    }
  ),
  TE.map((resp) => resp.data)
);

const b = async () => {
  const ok = await a();
  console.log(ok);
  
};

// (async () => {
//     const ok = await pipe(
//       TE.tryCatch(
//         () => getFailedTask(),
//         (reason) => new Error(`${reason}`),
//       ),
//       TE.map((resp) => resp.data),
//     )()

//     console.log(ok)
//     // { _tag: 'Right', right: { code: 200, description: 'OK' } }
//   })()

const TestComponent = (props: Props) => {
  useEffect(() => {
    // tryCatch(
    //     getErrorRequest,
    //    (reason)=>{
    //        console.log(reason);

    //    }
    // )
    b();

    return () => {};
  }, []);
  return <div>TestComponent</div>;
};

export default TestComponent;
