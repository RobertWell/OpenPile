import {
  DELETE_TICKETS,
  ADD_TICKETS,
  SET_TICKETS,
  ADD_MESSAGE,
  DELETE_TICKET,
} from "redux/content";
import { useDoRequest } from "hooks/useDoRequest";
import { ticketApi } from "api/ticket_api";

// export const delete_tickets = (payload) => ({ type: DELETE_TICKETS, payload });
export const add_tickets = (payload) => ({ type: ADD_TICKETS, payload });
export const set_tickets = (payload) => ({ type: SET_TICKETS, payload });
export const delete_tickets = () => ({ type: DELETE_TICKETS });
export const delete_ticket_by_id = (ticketId) => ({
  type: DELETE_TICKET,
  payload: ticketId,
});
// const update_ticket=
export const fetch_tickets = (callback) => {
  return (dispatch) => {
    const { doRequest } = useDoRequest({
      url: ticketApi.show_all_tickets(),
      method: "get",
      onSuccess: (data) => {
        dispatch({
          type: SET_TICKETS,
          payload: data,
        });
        if (callback) callback();
      },
      onError: (error) => {
        console.log("error:", error);
        dispatch({
          type: ADD_MESSAGE,
          payload: {
            message: "更新購物車失敗",
            state: "error",
            key: new Date().getTime(),
          },
        });
      },
    });
    // console.log('========ticketApi.show_all_tickets()', ticketApi.show_all_tickets());
    doRequest();
  };
};

export const new_ticket = ({
  title,
  productId,
  creatorId,
  number,
  optionKey,
  options,
  tags,
}) => {
  return (dispatch) => {
    const { doRequest } = useDoRequest({
      url: ticketApi.new_ticket(),
      method: "post",
      body: {
        title,
        productId,
        creatorId,
        number,
        optionKey,
        options,
        tags,
      },
      onSuccess: (data) => {
        dispatch({
          type: ADD_TICKETS,
          payload: [data],
        });

        dispatch({
          type: ADD_MESSAGE,
          payload: {
            message: "已加入購物車",
            state: "success",
            key: new Date().getTime(),
          },
        });
      },
      onError: (error) => {
        if (error.errors[0].message === "Duplicate Ticket!")
          dispatch({
            type: ADD_MESSAGE,
            payload: {
              message: "購物車內已存在",
              state: "info",
              key: new Date().getTime(),
            },
          });
        else
          dispatch({
            type: ADD_MESSAGE,
            payload: {
              message: "加入購物車失敗",
              state: "error",
              key: new Date().getTime(),
            },
          });
      },
    });
    doRequest();
  };
};
export const direct_purchase = (
  { title, productId, creatorId, number, optionKey, options, tags },
  onSuccess,
  onError
) => {
  return (dispatch, getState) => {
    // const { auth, ticket } = getState();
    const { doRequest } = useDoRequest({
      url: ticketApi.new_ticket(),
      method: "post",
      body: {
        title,
        productId,
        creatorId,
        number,
        optionKey,
        options,
        tags,
      },
      onSuccess,
      onError,
    });
    doRequest();

  };
};
