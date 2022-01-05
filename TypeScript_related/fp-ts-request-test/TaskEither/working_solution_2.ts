import * as t from "io-ts";
import * as E from "fp-ts/lib/Either";
import * as TE from "fp-ts/lib/TaskEither";
import { PathReporter, failure } from "io-ts/lib/PathReporter";
import { pipe } from "fp-ts/lib/function";
import axios from "axios";
import * as D from "io-ts/Decoder";

const ProductCodec = t.interface({
  code: t.number,
  description: t.string,
});

// const ProductCodec = t.type({
//   price: t.number,
//   val: t.number,
// });
type Product = t.TypeOf<typeof ProductCodec>;

//概念是對的!
const safeFetch = <T extends t.Props>(
  url: string,
  msg: string,
  codec: t.TypeC<T>
): TE.TaskEither<Error, E.Either<t.Errors, T>> => {
  let getUrl: TE.TaskEither<Error, T> = TE.tryCatch(
    () => axios.get(url).then((resp) => Promise.resolve(resp.data)),
    () => new Error(String(msg))
  );

  let checkType: (ma: any) => E.Either<t.Errors, T> = (data) => {
    return pipe(
      codec.decode(data),
      E.fold(
        (d) => E.left(d),
        (r: T) => E.right(r) //痛點!
      )
    );
  };
  return pipe(getUrl, TE.map(checkType));
};

let getHttpStat = safeFetch("https://httpstat.us/200", "dsadsa", ProductCodec);

// getHttpStat()
//   .then(
//     E.fold(
//       (error) => console.log(error),
//       (data) => console.log(data)
//     )
//   )
//   .catch((e) => {
//     console.log('-----------TaskEither',e);
//   });

//此方式可以pipe重新排列!

//拆tryEither，可當作Promise使用!

let b = async () => {
  try {
    let a = await getHttpStat();
    pipe(
      a,
      E.fold(
        (error) => console.log(error),
        (data) => console.log(data)
      )
    )
  } catch (e) {
    console.log(e);
  }
};

b()