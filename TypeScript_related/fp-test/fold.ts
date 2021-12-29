import {
  Either,
  left,
  right,
  chain,
  map,
  mapLeft,
  fold,
} from "fp-ts/lib/Either";
import { flow } from "fp-ts/function";
// import { mapLeft } from "fp-ts/lib/EitherT";

interface Person {
  name: string;
}

function ValidateName(name: string): Either<string, string> {
  return /[a-zA-z]/.test(name) ? right(name) : left("invalid name");
}

const makeError = (message: string) => new Error(message);

const makeUser = flow(
  ValidateName,
  map((name): Person => ({ name })),
  mapLeft(makeError)
);

const main = flow(
  makeUser,
  fold(
    (error) => error.message,
    ({ name }) => `Hi, my name is ${name}`
  )
);


console.log(main("!"));
