import {getMonoid, Applicative, some, none} from 'fp-ts/Option'
import { getApplicativeMonoid } from 'fp-ts/lib/Applicative'
import { MonoidSum } from 'fp-ts/lib/number'
import {first} from 'fp-ts/Semigroup'

// const M = getApplicativeMonoid(Applicative)(MonoidSum)


// console.log(M.concat(some(1), none));
// console.log(M.concat(some(1), some(1)));

const M  = getMonoid<number>(first())
console.log(M.concat(some(1), none));

console.log(M.concat(some(1), some(1)));
