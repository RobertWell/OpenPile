import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { isTesting } from "./common/inTesting";
import { isMock } from "./common/isMock";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";

import server from "./mirage_server/server";

if (isMock() || isTesting()) {
  server();
  // console.log(process.env);
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
