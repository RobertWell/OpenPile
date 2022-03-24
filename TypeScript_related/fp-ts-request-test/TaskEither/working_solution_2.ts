import * as t from "io-ts";
import * as E from "fp-ts/lib/Either";
import * as TE from "fp-ts/lib/TaskEither";
import * as T from "fp-ts/Task";
import { PathReporter, failure } from "io-ts/lib/PathReporter";
import { pipe, flow } from "fp-ts/lib/function";
import axios from "axios";
import * as D from "io-ts/Decoder";

const ProductCodec = t.intersection([
  t.type({
    code: t.number,
    description: t.string,
  }),
  t.partial({
    department: t.string,
  }),
]);

// const ProductCodec = t.interface({
//   code: t.number,
//   description: t.string,
// });
// const ProductCodec:Codec<{t:string}> = {
//   decode:()=>t.Validation({})
// }

// const ProductCodec = t.type({
//   price: t.number,
//   val: t.number,
// });
type Product = t.TypeOf<typeof ProductCodec>;

const enum ErrorType {
  Network,
  Parse,
}

interface AppError {
  type: ErrorType;
  message: string;
}

// 用t.Decoder解法完美容納了t.type 與t.intersection做出來的Decoder!!!

const decodeWith = <A>(decoder: t.Decoder<unknown, A>) =>
  flow(
    decoder.decode,
    E.mapLeft(
      (errors): AppError => ({
        type: ErrorType.Parse,
        message: failure(errors).join("\n"),
      })
    ),
    
    TE.fromEither
  );

const getFromUrl = <A>(url: string, codec: t.Decoder<unknown, A>) => {
  let task = TE.tryCatch(
    () => axios.get(url),
    (e) => e as Error
  );

  return pipe(
    task,
    TE.map((x) => x.data),
    // d=>d
    TE.mapLeft(({ message }) => ({ type: ErrorType.Network, message })),
    TE.chain(decodeWith(codec))
    // TE.chain(decodeWith(codec))
  );
};

const handleErrors = (appError: AppError): T.Task<string> => {
  switch (appError.type) {
    case ErrorType.Network:
      return T.of(`Network error: ${appError.message}`);
    case ErrorType.Parse:
      return T.of(`Parse error: ${appError.message}`);
  }
};

let a = getFromUrl("https://httpstat.us/200", ProductCodec);
