import axios from "axios";
import { pipe } from "fp-ts/lib/function";
import * as TE from "fp-ts/lib/TaskEither";
import * as O from "fp-ts/Option";
import { flatten } from "fp-ts/lib/Array";
import { flow } from "fp-ts/function";
import {  either as E  } from "fp-ts/lib";

(async () => {
  const ok = await pipe(
    TE.tryCatch(
      () => axios.get("https://httpstat.us/200"),
      (reason) => {
        new Error(`${reason}`);
      }
    ),
    TE.map((resp) => resp.data)
  )();
  console.log(ok);
})();

// const ok =  pipe(
//     TE.tryCatch(
//       () => axios.get("https://httpstat.us/200"),
//       (reason) => {
//         new Error(`${reason}`);
//       }
//     ),
//     TE.map((resp) => resp.data)
//   )();
//   console.log(ok);

interface response  { code: number, description: string }

(async () => {
  const result = await pipe(
    TE.tryCatch(
      () => axios.get<response>("https://httpstat.us/500"),
      (reason) => new Error(`${reason}`)
    ),
    TE.map((resp) => resp.data)
  )();

  const r = pipe(
    result, 
    E.fold(
        (error) => error.message,
        resp=>resp.description
      )
  )

  console.log(r);
})();



