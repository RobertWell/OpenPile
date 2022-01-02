import { pipe } from "fp-ts/function";
import * as D from "io-ts/Decoder";
import * as t from "io-ts";
import * as E from "fp-ts/Either";


interface VersionBrand {
    readonly Version: unique symbol; // use `unique symbol` here to ensure uniqueness across modules / packages
  }
export const TypeVersion = t.brand(
    t.string, // a codec representing the type to be refined
    (value: string): value is t.Branded<string, VersionBrand> =>
      /^\d+\.\d+\.\d+$/.test(value), // a custom type guard using the build-in helper `Branded`
    'Version' // the name must match the readonly field in the brand
  );
  

export const TypeMyStructIn = t.type({
    version: t.string,
  });
  
  export const TypeMyStruct = t.intersection([
    TypeMyStructIn,
    t.type({
      version: TypeVersion,
    }),
  ]);
  
  export type Version = t.TypeOf<typeof TypeVersion>;
  export type MyStruct = t.TypeOf<typeof TypeMyStruct>;
  export type MyStructIn = t.TypeOf<typeof TypeMyStructIn>;
  
  export function callFunction(data: MyStructIn): boolean {
    // type check
    const validation = TypeMyStruct.decode(data);
    return E.isRight(validation);
  }