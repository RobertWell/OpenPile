import * as TE from "fp-ts/lib/TaskEither";
import * as E from "fp-ts/lib/Either";
import { flow } from "fp-ts/lib/function";
import { pipe } from "fp-ts/lib/function";
import axios from "axios";

const safeGet = (url: string): TE.TaskEither<Error, Response> =>
  TE.tryCatch(
    () => axios.get(url),
    (reason) => new Error(String(reason))
  );

const processResponce = flow((x: Response): E.Either<Error, Response> => {
  return x.status === 200 ? E.right(x) : E.left(Error(x.statusText));
}, TE.fromEither);


export const httpGet = (url: string): TE.TaskEither<Error, unknown> =>
  pipe(safeGet(url), TE.chain(processResponce));

httpGet("https://jsonplaceholder.typicode.com/users")().then((r) =>
  console.log(r)
);
