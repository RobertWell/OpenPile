import * as React from "react";
import * as  ReactDOM from "react-dom";
import {Remotes} from "./Components/Remotes";

import "./index.css";

const App = () => (
    <div>
        <h1>Ts Host</h1>
        <Remotes/>
    </div>
);

ReactDOM.render(<App/>, document.getElementById("app"));
