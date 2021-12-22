import React, { useState, useRef, FormEvent } from "react";

import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import PrimeReact from "primereact/api";

import "./App.css";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";

import logo from "./logo.svg";

function App() {
  PrimeReact.ripple = true;

  const [text, setText] = useState<string>("");
  const toastRef = useRef<Toast>(null);

  const onFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    if (text) {
      toastRef.current!.show({ severity: "info", summary: text, life: 3000 });
    }

    // clear
    setText("");

    e.preventDefault();
  };

  return (
    <div className="App">
      <div className="card">
        <div className="line-height-3 card-container blue-container">
          <div
            className="overflow-auto surface-overlay p-3 border-blue-500 border-2 border-round"
            style={{ height: "100px" }}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum
            dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim
            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat.
          </div>
        </div>
      </div>

      <div className="card">
        <div
          className="card-container yellow-container overflow-hidden"
          style={{ height: "250px" }}
        >
          <div
            className="relative bg-yellow-500 border-round border-1 border-yellow-500"
            style={{ height: "200px" }}
          >
            <div className="absolute top-0 left-0 px-4 py-3 w-full font-bold">
              Fixed
            </div>
            <div
              className="absolute overflow-auto surface-overlay mt-6 p-4 line-height-3"
              style={{ height: "150px" }}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Vitae
              sapien pellentesque habitant morbi tristique senectus et netus.
              Vitae proin sagittis nisl rhoncus mattis. Maecenas pharetra
              convallis posuere morbi leo urna molestie. At in tellus integer
              feugiat scelerisque. Adipiscing elit duis tristique sollicitudin
              nibh sit amet commodo. Luctus accumsan tortor posuere ac ut. Lorem
              ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua. Vitae sapien
              pellentesque habitant morbi tristique senectus et netus. Vitae
              proin sagittis nisl rhoncus mattis. Maecenas pharetra convallis
              posuere morbi leo urna molestie. At in tellus integer feugiat
              scelerisque. Adipiscing elit duis tristique sollicitudin nibh sit
              amet commodo. Luctus accumsan tortor posuere ac ut. Lorem ipsum
              dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Vitae sapien
              pellentesque habitant morbi tristique senectus et netus. Vitae
              proin sagittis nisl rhoncus mattis. Maecenas pharetra convallis
              posuere morbi leo urna molestie. At in tellus integer feugiat
              scelerisque. Adipiscing elit duis tristique sollicitudin nibh sit
              amet commodo. Luctus accumsan tortor posuere ac ut. Lorem ipsum
              dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Vitae sapien
              pellentesque habitant morbi tristique senectus et netus. Vitae
              proin sagittis nisl rhoncus mattis. Maecenas pharetra convallis
              posuere morbi leo urna molestie. At in tellus integer feugiat
              scelerisque. Adipiscing elit duis tristique sollicitudin nibh sit
              amet commodo. Luctus accumsan tortor posuere ac ut.
            </div>
          </div>
        </div>
      </div>
      <div className="card">
        <div className="flex flex-wrap align-items-center justify-content-center card-container">
          <div className="surface-overlay border-round border-1 p-3 m-3 w-16rem h-16rem flex align-items-center justify-content-center">
            <p className="lowercase">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.{" "}
            </p>
          </div>
          <div className="surface-overlay border-round border-1 p-3 m-3 w-16rem h-16rem flex align-items-center justify-content-center">
            <p className="uppercase">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.{" "}
            </p>
          </div>
          <div className="surface-overlay border-round border-1 p-3 m-3 w-16rem h-16rem flex align-items-center justify-content-center">
            <p className="capitalize">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.{" "}
            </p>
          </div>
        </div>
      </div>
      {/* <Toast ref={toastRef} />

      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>

      <form className="p-d-flex p-jc-center p-mt-6" onSubmit={onFormSubmit}>
        <InputText value={text} onChange={(e) => setText(e.target.value)} />
        <Button
          type="submit"
          label="Submit"
          icon="pi pi-check"
          className="p-ml-2"
        />
      </form> */}
    </div>
  );
}

export default App;
