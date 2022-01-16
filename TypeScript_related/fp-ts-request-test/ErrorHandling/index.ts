import {
  pipe,
  flow,
  constVoid,
  unsafeCoerce,
  absurd,
} from "fp-ts/lib/function";
import * as E from "fp-ts/Either";
import * as TE from "fp-ts/TaskEither";
import * as T from "fp-ts/Task";
import crypto from "crypto";
import axios from "axios";

export class MinLengthValidationError extends Error {
  public _tag: "PasswordMinLengthValidationError";
  public minLength: number;

  private constructor(minLength: number) {
    super(`password fails to meet min length requirement: ${minLength}`);
    this._tag = "PasswordMinLengthValidationError";
    this.minLength = minLength;
  }

  public static of(minLength: number): MinLengthValidationError {
    return new MinLengthValidationError(minLength);
  }
}

export class CapitalLetterMissingValidationError extends Error {
  public _tag: "CapitalLetterMissingValidationErrorError";
  private constructor() {
    super(`password is missing a capital letter`);
    this._tag = "CapitalLetterMissingValidationErrorError";
  }

  public static of(): CapitalLetterMissingValidationError {
    return new CapitalLetterMissingValidationError();
  }
}

export type PasswordValidationError =
  | MinLengthValidationError
  | CapitalLetterMissingValidationError;

export interface Password {
  _tag: "Password";
  value: string;
  isHased: boolean;
}

export function of(value: string): Password {
  return { _tag: "Password", value, isHased: false };
}

export function fromHashed(value: string): Password {
  return { _tag: "Password", value, isHased: true };
}

export type PasswordSpecification = {
  minLength?: number;
  capitalLetterRequired?: boolean;
};

export function validate({
  minLength = 0,
  capitalLetterRequired = false,
}: PasswordSpecification) {
  return (password: Password): E.Either<PasswordValidationError, Password> => {
    if (password.value.length < minLength)
      return E.left(MinLengthValidationError.of(minLength));
    if (capitalLetterRequired && !/[A-Z]/.test(password.value))
      return E.left(CapitalLetterMissingValidationError.of());
    return E.right(password);
  };
}

export type HashFun = (value: string) => string;

export function hash(hashFn: HashFun) {
  return (password: Password): Password => ({
    ...password,
    value: hashFn(password.value),
    isHased: true,
  });
}

const pipline = flow(
  of,
  validate({ minLength: 8, capitalLetterRequired: true }),
  E.map(hash((v) => crypto.createHash("md5").update(v).digest("hex")))
);
// console.log(pipe('Pewqewqip',pipline));

// ====================================================
pipe(
  TE.tryCatch(
    () => axios.get("https://httpstat.us/500"),
    (e) => e as Error
  ),
  TE.map((d) => d.data),
  TE.mapLeft((e) => e.message)
)().then(
  E.fold(
    (e) => console.log(e),

    (d) => console.log(d)
  )
);

// ====================================================
pipe(
  TE.tryCatch(
    () => axios.get("https://httpstat.us/200"),
    () => constVoid as never
  ),
  TE.map((d) => d.data),
  TE.fold(absurd, T.of)
);

// 今天的玩法，不應該形成TaskEither<Error, Either<t.Errors, t.Validation>>
//  應該是 TaskEither<Error, Response> -> TaskEither<Error, Response>
// 中間                Codec                           mapLeft                        搭配orElse+fold+TE.left
// declare a: Response -> Either<t.Errors, t.Validation> -> Either<Error, t.Validation> -> Response

declare function begin(): Promise<void>;
declare function commit(): Promise<void>;
declare function rollback(): Promise<void>;

let a = () =>
  TE.tryCatch(
    () => commit(),
    (err) => new Error(`Commit txn failed: ${err}`)
  );



let b = (e: Error):TE.TaskEither<Error, void> =>
  pipe(
    TE.tryCatch(
      () => rollback(),
      (error) => new Error(`Rollback txn failed: ${error}`)
    ),
    TE.fold<Error, void, E.Either<Error, void>>(    //搭配orElse+fold+TE.left
      (err) => TE.left(err),
      () => TE.left(e)
    )
  );
// T.Task<E.Either<Error, void>> === TE.TaskEither<Error, void>
const result = pipe(
  TE.tryCatch(
    () => begin(),
    (err) => new Error(`Begin txn failed: ${err}`)
  ),
  TE.chain(() =>
    TE.tryCatch(
      () => commit(),
      (err) => new Error(`Commit txn failed: ${err}`)
    )
  ),
  TE.orElse(b)
);
