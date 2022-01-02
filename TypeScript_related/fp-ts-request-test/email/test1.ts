import * as t from "io-ts";
import * as E from "fp-ts/lib/Either";
import { pipe } from "fp-ts/lib/function";
import { PathReporter } from "io-ts/lib/PathReporter";
interface EmailBrand {
  readonly Email: unique symbol;
}

const EmailCodec = t.brand(
  t.string,
  (s: string): s is t.Branded<string, EmailBrand> =>
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(
      s
    ),
  "Email"
);

type Email = t.TypeOf<typeof EmailCodec>;

const anything = "dssadsadsa";



function api() {
    return Promise.resolve(anything)
      .then((data) => EmailCodec.decode(data))
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


// pipe(
//   Email.decode(anything),
//   E.fold(
//     (error) => {
//       console.log(error);
//     },
//     (r) => {
//       console.log(r);
//     }
//   )
// );
api().then(
    (r) => console.log(r),
    (e) => console.log(e)
  );
  