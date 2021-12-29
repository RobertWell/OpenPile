import { pipe } from "fp-ts/function";
import * as O from "fp-ts/Option";
import { either as E } from "fp-ts";
import { flow } from "fp-ts/function";


let obj = {
  state: {
    value: "test",
  },
};

function calculate(input: { value: string | null }) {
  console.log("input");
  return input?.value;
}


const a = pipe(
    obj.state,
    O.fromNullable,
    O.map(calculate)

)

console.log(a);


