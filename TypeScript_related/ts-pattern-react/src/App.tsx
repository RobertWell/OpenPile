import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { match, select, when, not, __ } from "ts-pattern";

type state =
  | { status: "loading" }
  | { status: "success"; data: string }
  | { status: "error" };

function m(s: state) {
  match<state>(s)
    .with({ status: "loading" }, () => <p>Loading...</p>)
    .with({ status: "success" }, ({ data }) => <p>{data}</p>)
    .with({ status: "error" }, () => <p>Oops, an error occured</p>)
    .exhaustive();
}

function App() {
  let fetchState: state = { status: "success", data: "string" };

  m(fetchState);

  // .exhaustive()
  return <div className="App"></div>;
}

export default App;
