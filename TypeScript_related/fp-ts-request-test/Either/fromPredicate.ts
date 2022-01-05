// example of seperated functional composition
import { either as E } from "fp-ts";
import { flow } from "fp-ts/function";

interface Person {
  name: string;
}

const regexLetters = /[a-zA-z]/;

// (name: string) => Either<string, string>
const validateName = E.fromPredicate(
  /[a-zA-z]/.test,
  (name) => `"${name}" is not a valid name!`
);

const makeError = (message: string) => new Error(message);
const error = (message) => new Error(message);
// (name: string) => Either<Error, Person>
const makeUser = flow(
  validateName,
  E.map((name): Person => ({ name })),
  E.mapLeft(error)
);
