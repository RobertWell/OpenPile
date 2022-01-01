import { Semigroup } from "fp-ts/Semigroup";

interface Monoid<A> extends Semigroup<A> {
  readonly empty: A;
}
