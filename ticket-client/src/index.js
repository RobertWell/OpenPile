import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import createReduxPersist from "./redux/store";

const DevMode = ({ children }) => {
  
  return (
    <>
      {false ? (
        <React.StrictMode>{children}</React.StrictMode>
      ) : (
        <>{children}</>
      )}
    </>
  );
};

const { store, persistor } = createReduxPersist();
ReactDOM.render(
  <DevMode>
    <Provider store={store}>
      <PersistGate loader={null} persistor={persistor}>
        <Router>
          <App />
        </Router>
      </PersistGate>
    </Provider>
  </DevMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
