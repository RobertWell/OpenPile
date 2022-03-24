import { pipe } from "fp-ts/function";
import * as t from "io-ts";

const select =
  <A, K extends keyof A>(_fields: ReadonlyArray<K>) =>
  <O, I>(_model: t.Type<A, O, I>): Promise<ReadonlyArray<{ [_ in K]: A[_] }>> =>
    Promise.resolve([]);

const UserCodec = t.intersection([
  t.type({
    email: t.string,
    firstName: t.string,
    lastName: t.string,
  }),
  t.partial({
    maidenName: t.string,
    country: t.string,
    state: t.string,
    bio: t.string,
  }),
]);

type User = t.TypeOf<typeof UserCodec>;

const result = pipe(
  {
    email: "sdsa",
    firstName: "sdsa",
    lastName: "sdsa",
  },
  UserCodec.decode,
  d=>{
      
  }

);
