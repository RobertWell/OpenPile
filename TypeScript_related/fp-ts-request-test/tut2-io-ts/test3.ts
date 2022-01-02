import * as t from "io-ts";
import * as E from "fp-ts/lib/Either";
import { PathReporter } from "io-ts/lib/PathReporter";
import { pipe } from "fp-ts/lib/function";
const rawData: string = JSON.stringify({
  price: "10",
  val: "2.4",
});

const ProductCodec = t.interface({
  price: t.number,
  val: t.number,
});

type Product = t.TypeOf<typeof ProductCodec>;

function api() {
  return Promise.resolve(JSON.parse(rawData))
    .then((data) => ProductCodec.decode(data))
    .then((result) =>
      pipe(
        result,
        E.fold(
          (errors) => Promise.reject(PathReporter.report(result)),
          (data) => Promise.resolve(data)
        )
      )
    );
}

api().then(
  (r) => console.log(r),
  (e) => console.log(e)
);
