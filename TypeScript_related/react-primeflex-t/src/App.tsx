import React, { useState, useRef, FormEvent } from "react";

import { InputText } from "primereact/inputtext";
// import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import PrimeReact from "primereact/api";
import Layout from "./components/Layout";
import "./App.scss";
import { Button } from "antd";
import logo from "./logo.svg";
import Typography from "@material-ui/core/Typography";
import FlexLayout from "./components/FlexLayout";
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
      <Layout>
        <div>
          <Typography paragraph>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Rhoncus
            dolor purus non enim praesent elementum facilisis leo vel. Risus at
            ultrices mi tempus imperdiet. Semper risus in hendrerit gravida
            rutrum quisque non tellus. Convallis convallis tellus id interdum
            velit laoreet id donec ultrices. Odio morbi quis commodo odio aenean
            sed adipiscing. Amet nisl suscipit adipiscing bibendum est ultricies
            integer quis. Cursus euismod quis viverra nibh cras. Metus vulputate
            eu scelerisque felis imperdiet proin fermentum leo. Mauris commodo
            quis imperdiet massa tincidunt. Cras tincidunt lobortis feugiat
            vivamus at augue. At augue eget arcu dictum varius duis at
            consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem
            donec massa sapien faucibus et molestie ac.
          </Typography>
          <Typography paragraph>
            Consequat mauris nunc congue nisi vitae suscipit. Fringilla est
            ullamcorper eget nulla facilisi etiam dignissim diam. Pulvinar
            elementum integer enim neque volutpat ac tincidunt. Ornare
            suspendisse sed nisi lacus sed viverra tellus. Purus sit amet
            volutpat consequat mauris. Elementum eu facilisis sed odio morbi.
            Euismod lacinia at quis risus sed vulputate odio. Morbi tincidunt
            ornare massa eget egestas purus viverra accumsan in. In hendrerit
            gravida rutrum quisque non tellus orci ac. Pellentesque nec nam
            aliquam sem et tortor. Habitant morbi tristique senectus et.
            Adipiscing elit duis tristique sollicitudin nibh sit. Ornare aenean
            euismod elementum nisi quis eleifend. Commodo viverra maecenas
            accumsan lacus vel facilisis. Nulla posuere sollicitudin aliquam
            ultrices sagittis orci a.
          </Typography>
        </div>
      </Layout>
      {/* <Layout>
       
      </Layout> */}

      {/* <Toast ref={toastRef} /> 
      <form className="p-d-flex p-jc-center p-mt-6" onSubmit={onFormSubmit}>
        <InputText value={text} onChange={(e) => setText(e.target.value)} />
        <Button
          type="submit"
          label="Submit"
          icon="pi pi-check"
          className="p-ml-2"
        />
      </form>  */}
    </div>
  );
}

export default App;
