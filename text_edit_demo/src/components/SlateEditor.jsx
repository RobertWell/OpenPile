import React, { useState, useMemo } from "react";
import { createEditor } from "slate";
import { Slate, Editable, withReact } from "slate-react";
// import "./styles.css";

export default function SlateEditor() {
  const editor = useMemo(() => withReact(createEditor()), []);
  const [value, setValue] = useState([
    {
      type: "paragraph",
      children: [{ text: "We have some base content." }]
    }
  ]);
  return (
    <div className="App">
      <h1>React Editors</h1 >
      <h2>Start editing to see Slate in action!</h2>
      <Slate
        editor={editor}
        value={value}
        onChange={(newValue) => setValue(newValue)}
      >
        <Editable style={{ border: "1px solid black" }}/>
      </Slate>
      {/* {JSON.stringify(value)} */}
    </div>
  );
}