import { DELETE_USER, SET_USER, UPDATE_USER } from "redux/content";
import { authApi } from "api/auth_api";
import axios from "axios";

export const delete_user = (payload) => ({ type: DELETE_USER, payload });
export const set_user = (payload) => ({ type: SET_USER, payload });
export const update_user = (payload) => ({ type: UPDATE_USER, payload });

export const current_user = (onLogin, onLogout) => {
  return async (dispatch, getState) => {
    try {
      const res = await axios["get"](authApi.currentuser(), {});
      const { currentUser } = res.data;
      const { auth } = getState();
      // console.log("------------currentUser auth", currentUser);
      if (currentUser && !auth.email) {
        dispatch({
          type: SET_USER,
          payload: {
            userId: currentUser.email.split("@")[0],
            ...currentUser,
          },
        });
      } else if (!currentUser) {
        dispatch({
          type: DELETE_USER,
          payload: {},
        });
        if(onLogout) onLogout()
        return 
      }
      if(onLogin) onLogin()
    } catch (error) {
      // console.log("-----------error", error);
      dispatch({
        type: DELETE_USER,
        payload: {},
      });
      if(onLogout) onLogout()
    }
  };
};

export const sign_out = () => {
  return async () => {
    await axios["post"](authApi.signout(), {});
  };
};
