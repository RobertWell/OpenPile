import React from "react";
import { Redirect, Route } from "react-router-dom";

const ProtectedRoute = ({ allow, redirect, children, ...rest }) => {
  return (
    // <Route path={path}>

    <Route
      {...rest}
      render={() => (allow ? children : <Redirect to={redirect} />)}
    />

    // <>
    //   {allow ? (
    //     <Route path={path}>{children}</Route>
    //   ) : (
    //     <Redirect to={redirect} />
    //   )}
    // </>
    // </Route>
  );
};

export { ProtectedRoute };
