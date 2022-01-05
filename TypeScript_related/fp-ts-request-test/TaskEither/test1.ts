import * as t from "io-ts";
import * as E from "fp-ts/lib/Either";
import * as TE from "fp-ts/lib/TaskEither";
import { PathReporter, failure } from "io-ts/lib/PathReporter";
import { pipe } from "fp-ts/lib/function";
import axios from "axios";
const rawData: string = JSON.stringify({
  price: 10,
  val: 2.4,
});

const ProductCodec = t.interface({
  price: t.number,
  val: t.number,
});

type Product = t.TypeOf<typeof ProductCodec>;

function get(url: string): TE.TaskEither<Error, string> {
  return TE.tryCatch(
    () => fetch(url).then((res) => res.text()),
    (reason) => new Error(String(reason))
  );
}

let a = get("sdsadsa");

const isAuth: () => TE.TaskEither<Error, boolean> = () => {
  return TE.tryCatch(
    () => Promise.resolve(false),
    (reason) => new Error(String(reason))
  );
};
const getProduct: () => TE.TaskEither<Error, Product> = () => {
  return TE.tryCatch(
    () => Promise.resolve(rawData).then(JSON.parse),
    (reason) => new Error(String(reason))
  );
};

const tryGetProfile: (
  ma: boolean
) => TE.TaskEither<Error, E.Either<false, Product>> = (authed) => {
  let a = pipe(getProduct(), TE.map(E.right));
  let b = TE.right(E.left<false, Product>(false));
  return authed ? a : b;
};

const result: TE.TaskEither<Error, E.Either<false, Product>> = pipe(
  isAuth(),
  TE.chain((d) => tryGetProfile(d))
);

result().then(
  E.fold(
    (e) => console.log("-----e", e),
    (r) => console.log("-------r", r)
  )
);


