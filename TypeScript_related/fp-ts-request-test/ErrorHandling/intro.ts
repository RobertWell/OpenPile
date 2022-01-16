import { pipe } from "fp-ts/lib/function";
import * as E from "fp-ts/Either";
import { isLeft, isRight } from "fp-ts/Either";
type Transaction = unknown;
type Balance = unknown;
type StatementError =
  | "invalid bank account"
  | "missing account number"
  | "malformed header"
  | "transaction can't be zeroes";

interface Statement {
  readonly transactions: Transaction[];
}

declare function parseBankStatement(
  rawStatement: string
): E.Either<StatementError, Statement>;

declare function validateTransactions(
  transactions: Transaction[]
): E.Either<StatementError, Transaction[]>;

declare function buildBalance(transactions: Transaction[]): Balance;

const balanceFromRawStatement = (
  rawStatement: string
): E.Either<StatementError, Balance> =>
  pipe(
    rawStatement,
    parseBankStatement,
    E.map((s) => s.transactions),
    E.chain(validateTransactions),
    E.map(buildBalance)
  );

//   -----------------------------------------------------

const goodValue: E.Either<Error, string> = E.right("Good");
const badValue: E.Either<Error, string> = E.left(new Error("Bad"));

const betterValue = pipe(
  goodValue,
  E.map((d) => `${d} is better`)
);

const worseValue: E.Either<Error, string> = pipe(
  goodValue,
  E.chain((e) => E.left(new Error(`Nothing can be ${e} in 2020`)))
);

const crypticError: E.Either<number, string> = pipe(
  worseValue,
  E.mapLeft((e) => e.message.length)
);
// let b = () => E.right("Back to 2015")
// let a = E.alt(b)

//  E.alt: 若有Error跳至Left，會被扳回E.Right("Back to 2015")。此方式不會碰到Left Error(直接忽視)
const improvedValue = pipe(
  worseValue,
  E.alt(() => E.right("Back to 2015"))
);

//E.map: 無法改變left/right位置，除非出會error會跳left
//E.mapLeft: 只會map到left的部分(但也跳不到right)，反而會形成E.Either<E.Either<never, string>, string>
//E.orElse: 可以用E.right 跳回Right
const optimisticValue = pipe(
  badValue,
  E.orElse<Error, string, Error>((e) =>
    E.right(`${e.message}. But there's always 2021`)
  ),
  (d) => d,
  E.fold(
    (e) => console.log(e),
    (d) => console.log(d)
  )
);

const safeParseJson = (str: string): E.Either<Error, unknown> => {
  return E.tryCatch<Error, unknown>(
    () => JSON.parse(str),
    (err) =>
      err instanceof Error
        ? err
        : new Error("Unexpected error when parsing json")
  );
};

//同fold?!
let a = <T>(E: E.Either<Error, T>) => {
  if (isLeft(E)) {
    console.log("------------------is Left", E);
  } else {
    console.log("------------------is right", E);
  }
};

// pipe(
//     safeParseJson("["),
//     (d) => a(d)
// );


// 將left匯流成與Right同樣的東西，然後丟出一個return(相當於讀出Error)
const mehValue = pipe(
  worseValue,
  E.getOrElse((err) => `I used to be ${err}. Now I'm free`)
);
