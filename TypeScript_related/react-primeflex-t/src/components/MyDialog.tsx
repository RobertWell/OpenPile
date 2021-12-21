import React, { ReactElement, useState } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";

interface Props {}

export default function MyDialog({}: Props): ReactElement {
  const [displayBasic, setDisplayBasic] = useState(false);
  const [position, setPosition] = useState("center");
  const onClick = (position: string | undefined = undefined) => {
    setDisplayBasic(true);
    if (position) {
      setPosition(position);
    }
  };
  const onHide = () => {
    setDisplayBasic(false);
  };
  const renderFooter = (name: string) => {
    return (
      <div>
        <Button
          label="No"
          icon="pi pi-times"
          onClick={() => onHide()}
          className="p-button-text"
        />
        <Button
          label="Yes"
          icon="pi pi-check"
          onClick={() => onHide()}
          autoFocus
        />
      </div>
    );
  };

  const CurrentState = () => {
    console.log(`CurrentState: ${displayBasic}`);

    return "current";
  };
  return (
    <div>
      <Button
        label="Show"
        icon="pi pi-external-link"
        onClick={() => onClick()}
      />
      <Dialog
        header="Header"
        visible={displayBasic}
        style={{ width: "50vw" }}
        footer={renderFooter("displayBasic")}
        onHide={() => onHide()}
      >
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </Dialog>
      <p>{CurrentState()}</p>
    </div>
  );
}
