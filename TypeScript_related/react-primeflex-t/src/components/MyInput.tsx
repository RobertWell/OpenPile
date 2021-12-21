import React, {
  useState,
  useRef,
  MutableRefObject,
  MouseEventHandler,
} from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";

interface Props {}

const getButtonClick = (ref: MutableRefObject<any>) => (text: string) => {
  if (text) {
    ref.current.show({
      severity: "info",
      summary: "Success",
      detail: text,
      life: 2000,
    });
  } else {
    ref.current.show({
      severity: "error",
      summary: "Error",
      detail: "Value is required",
      life: 2000,
    });
  }
};

const MyInput = () => {
  const [text, setText] = useState("");
  const toastRef = useRef(null);

  return (
    <div>
      <header>
        <InputText
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
        />
        <p>{text}</p>
        <Toast ref={toastRef} />
        <Button
          type="button"
          label="Submit"
          icon="pi pi-check"
          onClick={() => {
            getButtonClick(toastRef)(text);
          }}
        />
      </header>
    </div>
  );
};

export default MyInput;
