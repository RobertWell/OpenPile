import * as t from "io-ts";

class Table<A, O, I> extends t.Type<A, O, I> {
  constructor(model: t.Type<A, O, I>) {
    super("TableIo", model.is, model.validate, model.encode);
  }
  // extend t.Type with your operations
  select<K extends keyof A>(
    _fields: ReadonlyArray<K>
  ): Promise<ReadonlyArray<{ [_ in K]: A[_] }>> {
    return Promise.resolve([]);
  }
}

export const TableIo = <A, O, I>(model: t.Type<A, O, I>): Table<A, O, I> =>
  new Table(model);

const UserTable = TableIo(
  t.intersection([
    t.type({
      email: t.string,
      firstName: t.string,
      lastName: t.string,
    }),
    t.partial({
      maidenName: t.string,
      country: t.string,
      state: t.string,
      bio: t.string,
    }),
  ])
);




// const result: Promise<readonly {
//     firstName: string;
//     lastName: string;
//     country?: string | undefined;
// }[]>
const result = UserTable.select(['firstName', 'lastName', 'country'])

result.then(r=>{
    console.log(r);
    
}).catch(e=>{
    console.log(e);
    
})