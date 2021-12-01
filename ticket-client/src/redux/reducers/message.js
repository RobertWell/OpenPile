import { ADD_MESSAGE, POP_MESSAGE, BATCH_MESSAGES } from "redux/content";

const initialState = [];

export default function messageReducer(prestate = initialState, action) {
  const { type, payload } = action;
    // console.log("--------payload??",type,  payload);
  switch (type) {
    case ADD_MESSAGE:
      return [...prestate, payload];
    case POP_MESSAGE:
      prestate = prestate.splice(1);
      return [...prestate];
    case BATCH_MESSAGES:
      return [...prestate, ...payload];
    default:
      return prestate;
  }
}
