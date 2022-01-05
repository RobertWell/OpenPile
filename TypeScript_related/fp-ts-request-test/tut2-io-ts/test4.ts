import * as t from 'io-ts'
import * as E from 'fp-ts/Either'

const result: E.Either<t.Errors, number> = t.number.decode(123)

// declare function fold<E, A, B>(
//     onLeft: (e: E) => B,
//     onRight: (a: A) => B,
//   ): (e: E.Either<E, A>) => B


declare function left<E = never, A = never>(e: E): E.Either<E, A>

declare function right<E = never, A = never>(a: A): E.Either<E, A>

const aRight: E.Either<never, number> = right(123)

const aLeft: E.Either<string, never> = left('some error message')


