import { Either, left, right, chain } from 'fp-ts/Either'
import { pipe } from 'fp-ts/function'
const minLength = (s: string): Either<string, string> =>
  s.length >= 6 ? right(s) : left('at least 6 characters')

const oneCapital = (s: string): Either<string, string> =>
  /[A-Z]/g.test(s) ? right(s) : left('at least one capital letter')

const oneNumber = (s: string): Either<string, string> =>
  /[0-9]/g.test(s) ? right(s) : left('at least one number')




const validatePassword = (s: string): Either<string, string> =>
  pipe(
    minLength(s),
    chain(oneCapital),
    chain(oneNumber)
  )


  import { NonEmptyArray } from 'fp-ts/NonEmptyArray'
import { mapLeft } from 'fp-ts/Either'

function lift<E, A>(check: (a: A) => Either<E, A>): (a: A) => Either<NonEmptyArray<E>, A> {
  return a =>
    pipe(
      check(a),
      mapLeft(a => [a])
    )
}

const minLengthV = lift(minLength)
const oneCapitalV = lift(oneCapital)
const oneNumberV = lift(oneNumber)





