import React from "react";
import "./App.css";
import MyDialog from "./components/MyDialog";
import MyInput from "./components/MyInput";
import Layout from "./Layout";

function App() {
  return (
    <div className="App">
      <Layout>
        <MyInput />
      </Layout>
        <div className="p-d-flex">Flex Container</div>
    </div>
  );
}

export default App;
