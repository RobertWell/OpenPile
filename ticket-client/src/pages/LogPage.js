import React from "react";
import { LogIn, SignUp } from "../Components";
import { Switch, Route, useHistory } from "react-router-dom";
import {
  StylesProvider,
  createGenerateClassName,
} from "@material-ui/core/styles";
import { authApi } from "api/auth_api";
import { useDoRequest } from "hooks/useDoRequest";
import { useActions } from "hooks/useActions";

const generateClassName = createGenerateClassName({
  productionPrefix: "au",
});

const LogPage = () => {
  const history = useHistory();
  const { update_user } = useActions();

  const { doRequest: SignInHandler } = useDoRequest({
    url: authApi.signin(),
    method: "post",
    onSuccess: (data) => {
      update_user({ ...data, userId: data.email.split("@")[0] });
    },
  });
  const { doRequest: SignUpHander } = useDoRequest({
    url: authApi.signup(),
    method: "post",
    onSuccess: (data) => {
      update_user({ ...data, userId: data.email.split("@")[0] });
    },
  });

  return (
    <StylesProvider generateClassName={generateClassName}>
      <Switch>
        <Route path={"/auth/login"}>
          <LogIn
            onSignIn={async (values, callback) => {
              const data = await SignInHandler(values);
              if (callback && data.errors) callback(data.errors);
              else history.replace("/");
            }}
          />
        </Route>
        <Route path={"/auth/signup"}>
          <SignUp
            onSignUp={async (values, callback) => {
              const data = await SignUpHander(values);
              if (callback && data.errors) callback(data.errors);
              else history.replace("/");
            }}
          />
        </Route>
      </Switch>
    </StylesProvider>
  );
};

export default LogPage;
