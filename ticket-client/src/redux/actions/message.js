import { ADD_MESSAGE, POP_MESSAGE, BATCH_MESSAGES } from "redux/content";

export const add_message = (payload) => ({ type: ADD_MESSAGE, payload });
export const pop_message = () => ({ type: POP_MESSAGE });

export const batch_messages = (messages, state) => {
  
  let temp = [];
  for (let message of messages) {
    temp.push({
      message,
      state,
      key: new Date().getTime(),
    });
  }
//   console.log(temp);
  return { type: BATCH_MESSAGES, payload: temp };

};
