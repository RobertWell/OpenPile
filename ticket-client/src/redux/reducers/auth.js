import { DELETE_USER, SET_USER, UPDATE_USER } from "redux/content";

const initialState = {
  userId: undefined,
  userEmail: undefined,
  id:undefined
};

export default function authReducer(prestate = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_USER:
      return { ...payload };
    case UPDATE_USER:
      return { ...prestate, ...payload };
    case DELETE_USER:
      return initialState;
    default:
      return prestate;
  }
}
