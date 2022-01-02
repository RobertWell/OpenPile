import * as t from "io-ts";
import { PathReporter } from "io-ts/lib/PathReporter";
const officeCodec = t.type({
  img: t.string,
  city: t.string,
  employeeCount: t.number,
});

// interface Office {
//   img: string;
//   city: string;
//   employeeCount: number;
// }
type Office = t.TypeOf<typeof officeCodec>;

const office = officeCodec.decode(
  JSON.parse('{"img": "sdads", "city": "dsa","employeeCount":123 }')
); //In normal ts: Unsustanable data provided makes awkard result!

// const office: Office = JSON.parse('{"img": "sdads", "city": "dsa"}');  //不使用io-ts，型別都未必正確.....nullable???

// console.log(office);

const report = PathReporter.report(office);
console.log(report);
