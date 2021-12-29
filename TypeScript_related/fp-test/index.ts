import { pipe, flow } from "fp-ts/lib/function";
import * as O from "fp-ts/lib/Option";
import * as A from "fp-ts/lib/Array";
import { flatten } from "fp-ts/lib/Array";
import { Either, left, right, chain, map } from "fp-ts/lib/Either";

const add10 = (num: number): number => {
  return num + 10;
};

function double(num: number): number {
  return num * 2;
}

// const result  = pipe(3, add10, double, toString)
// console.log(result);

// const r = flow(add10,double,toString)(3)

const arr: number[] = [1];

const safeFirstElement: O.Option<number> = A.head(arr);

const firstElementDouble = pipe(
  safeFirstElement,
  O.map((value) => value * 2)
  // flatten
);

// console.log(firstElementDouble );

const twoDimensionArr: number[][] = [
  [1, 2, 3],
  [4, 5, 6],
];
const result = flatten(twoDimensionArr);

// console.log(result);

const flattenTest = pipe(O.some(2), O.fromNullable, O.flatten);

// console.log(flattenTest);

const doubleIfEvenElseNone = (n: number) =>
  n % 2 === 0 ? O.some(2 * n) : O.none;

const increaseIfEven = (n: number) => (n % 2 === 0 ? O.some(n + 1) : O.none);

const optionEven = O.some(2);
const optionOdd = O.some(3);

// console.log(O.chain(doubleIfEvenElseNone)(optionEven));

const odd = pipe(optionOdd, O.chain(doubleIfEvenElseNone));

// type Either<E,A> = Left<E> | Right<A>

// type ErrorType = "invalid name" | "invalid password" | "others";
// type InvalidName = "invalid name"

enum ErrorType {
  InvalidName = "Invalid Name",
  InvalidPassword = "Invalid Password",
  Others = "Others",
}

type UserInfo = {
  name: string;
  password: string;
  age?: number;
};

function ValidateName(user: UserInfo): Either<ErrorType, UserInfo> {
  return user.name.length > 3 ? right(user) : left(ErrorType.InvalidName);
}

function ValidPassword(user: UserInfo): Either<ErrorType, UserInfo> {
  return user.password.length > 3
    ? right(user)
    : left(ErrorType.InvalidPassword);
}

function SayHello(user: UserInfo) {
  return user.name
}

const a = pipe(
  {name:"Andy", password: "ds"},
  ValidPassword,
  chain(ValidateName),
  map(SayHello)
)

console.log(a);
