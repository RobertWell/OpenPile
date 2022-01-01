import { getMonoid } from "fp-ts/lib/Array";
import {
  Monoid,
  struct as MonoidStruct,
  min as MonoidMin,
  max as MonoidMax,
  concatAll
} from "fp-ts/lib/Monoid";
import {  MonoidAny, SemigroupAny } from "fp-ts/lib/boolean";
import { max, min, Semigroup, struct } from "fp-ts/lib/Semigroup";
import { pipe } from "fp-ts/lib/function";
import { contramap } from "fp-ts/lib/Ord";
import * as S from "fp-ts/string";
import * as N from "fp-ts/number";

const ordString = S.Ord;
const ordNumber = N.Ord;

type Customer = {
  name: string;
  favoriteThings: Array<string>;
  registeredAt: number;
  lastUpdatedAt: number;
  hasMadePurchase: boolean;
};

export const semigroupCustomer: Semigroup<Customer> = struct({
  name: max(
    pipe(
      ordNumber,
      contramap((s: string) => s.length)
    )
  ),
  favoriteThings: getMonoid<string>(),
  registeredAt: min(ordNumber),
  lastUpdatedAt: max(ordNumber),
  hasMadePurchase: SemigroupAny,
});

const { concat: combineCustomers } = semigroupCustomer;

const mergeCustomerRecords = combineCustomers(
  {
    name: "Robert",
    favoriteThings: ["Sleep", "Drink"],
    registeredAt: 123123,
    lastUpdatedAt: 2232323,
    hasMadePurchase: false,
  },
  {
    name: "Robert1",
    favoriteThings: ["Sleep2", "Drink3"],
    registeredAt: 123124,
    lastUpdatedAt: 22323212,
    hasMadePurchase: true,
  }
);

// console.log(mergeCustomerRecords);

const longestStringMonoid: Monoid<string> = {
  concat: (x, y) => (x.length > y.length ? x : y),
  empty: "",
};

export const monoidCustomer: Monoid<Customer> = MonoidStruct({
  // keep the longer name
  name: longestStringMonoid, // getJoinSemigroup(ordNumber).concat(1, 2) -> 2
  // accumulate favorite things
  favoriteThings: getMonoid<string>(),
  // keep the least recent date
  registeredAt: MonoidMin(N.Bounded), // getMeetSemigroup(ordNumber).concat(1, 2) -> 1
  // keep the most recent date
  lastUpdatedAt: MonoidMax(N.Bounded),
  // mark as true if any purchases were ever made between joining customer records
  hasMadePurchase: MonoidAny,
});

const mergedCustomerRecords = [
  {
    name: "Robert",
    favoriteThings: ["Sleep", "Drink"],
    registeredAt: new Date(1998, 6, 23).getTime(),
    lastUpdatedAt: new Date(2001, 6, 23).getTime(),
    hasMadePurchase: false,
  },
  {
    name: "Robert1",
    favoriteThings: ["Sleep2", "Drink3"],
    registeredAt: new Date(1990, 6, 23).getTime(),
    lastUpdatedAt: new Date(1998, 6, 23).getTime(),
    hasMadePurchase: false,
  },
  {
    name: "Robert1",
    favoriteThings: ["Sleep2", "Drink3"],
    registeredAt: new Date(2001, 6, 23).getTime(),
    lastUpdatedAt: new Date(2021, 6, 23).getTime(),
    hasMadePurchase: true,
  },
];

const {concat:mergeCustomerRecordsInMonoid} = monoidCustomer


const AllCustomerRecords = concatAll(monoidCustomer)(mergedCustomerRecords)

console.log(JSON.stringify(AllCustomerRecords, null, 2));