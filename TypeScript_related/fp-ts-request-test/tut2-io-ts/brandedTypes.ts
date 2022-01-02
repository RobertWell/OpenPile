import { pipe } from "fp-ts/function";
import * as D from "io-ts/Decoder";
import * as t from "io-ts";
import * as E from "fp-ts/Either";

const MyInputStruct = D.struct({
  version: D.string,
});

interface VersionBrand {
  readonly Version: unique symbol;
}

const isVersionString = (
  value: string
): value is t.Branded<string, VersionBrand> => /^\d+\.\d+\.\d+$/.test(value);

const VersionType = pipe(D.string, D.refine(isVersionString, "Version"));

const MyStruct = pipe(
  MyInputStruct,
  D.parse(({ version }) =>
    pipe(
      VersionType.decode(version),
      E.map((ver) => ({
        version: ver,
      }))
    )
  )
);




// function useVersion(version: VersionBrand ) {
//   // Does something with the branded type
// }

// function main (args: unknown) {
//   pipe(
//     MyStruct.decode(args) // accepts unknown
//     // Map is called on Right only and passes Lefts along so you can
//     // focus in on specifically what to do if validation succeeded
//     E.map(({ version }) => useVersion(version)),

//     // later on maybe handle Left
//     E.fold(
//       (l: t.Errors): void => console.error(l),
//       (r) => {},
//     ),
//   ),
// }