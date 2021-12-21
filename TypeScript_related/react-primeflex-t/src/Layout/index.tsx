import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <>
      <div className="p-grid p-m-3">
        <div className="p-col">
          <div className="p-card p-p-5">
            {/* <p>Hello</p> */}
            <h3>Counter</h3>
            {/* {children} */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
