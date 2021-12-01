import {
  DELETE_TICKETS,
  ADD_TICKETS,
  SET_TICKETS,
  DELETE_TICKET,
} from "redux/content";

const initialState = [];

export default function ticketReducer(prestate = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case ADD_TICKETS:
      return [...prestate, ...payload];
    case DELETE_TICKET:
      let temp = prestate.filter((t) => t.id !== payload);
      return [...temp];
    case DELETE_TICKETS:
      return [];
    case SET_TICKETS:
      return [...payload];
    default:
      return prestate;
  }
}
