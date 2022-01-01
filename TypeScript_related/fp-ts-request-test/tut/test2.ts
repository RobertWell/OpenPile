import { invokeDoSequentialRequest, safeFetch } from "./requestResponse";


//r為得到Either Obj, 
// let a = safeFetch(
//   "https://jsonplaceholder.typicode.com/users",
//   "fetch failed"
// )().then((r) => console.log(r));

let a = invokeDoSequentialRequest()