import { flow, pipe } from "fp-ts/lib/function";
import * as ID from "fp-ts/Identity";

const makeUrl = (x: string) => `http://lib.com/?${x}`;

const requestSync = (url: string) => "one\ntwo";

const handleResponse = (x: string) => x.split("\n")[0];

const func01 = (name: string): string => {
  const url = makeUrl(name);
  const resp = requestSync(url);
  return handleResponse(resp);
};

const func02 = (name: string): string => {
  return handleResponse(requestSync(makeUrl(name)));
};

const func03 = flow(makeUrl, requestSync, handleResponse);
//Flow 最多9個參數

//並行後結合的處理...?
const func04 = (name: string): string => {
  const url = makeUrl(name);
  const resp = requestSync(url);
  const result = handleResponse(resp);
  return `${url}: ${result}`;
};

const func05 = flow(
  makeUrl,
  (url) => ({ url, result: flow(requestSync, handleResponse)(url) }),
  ({ url, result }) => `${url}: ${result}`
);

const func07 = flow(
  makeUrl,
  ID.bindTo("url"),
  ID.bind(
    "result",
    flow((x) => x.url, requestSync, handleResponse)
  ),
  ID.map(({ url, result }) => `${url}: ${result}`)
);

