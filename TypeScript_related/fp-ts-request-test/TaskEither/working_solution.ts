import axios from "axios";
import { pipe } from "fp-ts/lib/function";
import * as TE from "fp-ts/TaskEither";
import * as T from "fp-ts/Task";
import * as E from "fp-ts/Either";
interface response {
  code: number;
  description: string;
}
const hello = TE.tryCatch(
  () => axios.get<response>("https://httpstat.us/200"),
  (reason) => new Error(`${reason}`)
);

const a = pipe(
  hello,
  TE.map((resp) => resp.data)
);

// Fold: 需要return type 一致!
a().then(
  E.fold(
    (error) => console.log(error),
    (resp) => console.log(resp)
  )
);
