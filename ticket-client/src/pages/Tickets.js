import React, { useEffect, useState } from "react";
import {
  Container,
  Paper,
  Grid,
  makeStyles,
  Typography,
  Checkbox,
  Button,
  useTheme,
  useMediaQuery,
} from "@material-ui/core";
import { useActions } from "hooks/useActions";
import { useSelector } from "react-redux";
import { TicketShow, TicketShowSM } from "Components";
import { ticketApi } from "api/ticket_api";
import axios from "axios";
import { orderApi } from "api/order_api";
import { useHistory } from "react-router";

const useStyles = makeStyles(() => {
  return {
    root: {
      marginTop: "150px",
    },
    panel: {
      "& > *": {
        marginBottom: "10px",
      },
    },
  };
});

function Tickets() {
  const classes = useStyles();
  const tickets = useSelector((state) => state.ticket);
  const auth = useSelector((state) => state.auth);
  const { set_tickets, batch_messages, add_message } = useActions();
  const history = useHistory();
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));
  const [pause, setPause] = useState(false);

  const setCancel = (index) => async () => {
    const Ticket = tickets[index];
    try {
      await axios.delete(ticketApi.delete_ticket(Ticket.id));
      // console.log(resp);
      let temp = tickets;
      temp.splice(index, 1);
      set_tickets(temp);
      let temp_selected = selected;
      temp_selected.splice(index, 1);
      setSelected([...temp_selected]);
    } catch (error) {
      if (error.response.data)
        batch_messages(
          error.response.data.errors.map((d) => d.message),
          "error"
        );
    }
  };
  const [selected, setSelected] = useState(Array.from(tickets, () => false));

  useEffect(() => {
    setSelected(Array.from(tickets, () => false));
  }, [tickets.length, history]);

  const changeSelection = (index, setSelected) => (value) => {
    selected[index] = value;
    setSelected([...selected]);
  };

  const update_ticket_byIndex = (index) => (ticket) => {
    let temp = tickets;
    temp[index] = ticket;
    set_tickets([...temp]);
  };
  const allSelected = selected.reduce((pre, curr, i) => {
    if (pre && curr) return pre && curr;
    const Ticket = tickets[i];
    const remains = Ticket["options"][Ticket["optionKey"]]["number"];
    return pre && remains <= 0;
  }, true);
  // useEffect(() => {
  //   const getAllSelected = () => {
  //     if (selected.length <= 0) return false;
  //     for (let i = 0; i < selected.length; i++) {
  //       const Ticket = tickets[i];
  //       const remains = Ticket["options"][Ticket["optionKey"]]["number"];
  //       if (remains > 0 && !selected[i]) return false;
  //     }
  //     return true;
  //   };
  //   allSelected=getAllSelected()
  // }, [selected]);

  const changeNumber = (index) => async (newNumber, number, setNumber) => {
    const update_ticket = update_ticket_byIndex(index);
    const Ticket = tickets[index];
    const preNumber = number;

    setNumber(newNumber);
    try {
      if (newNumber > 0) {
        const resp = await axios.put(ticketApi.update_ticket(Ticket.id), {
          number: newNumber,
          optionKey: Ticket.optionKey,
        });

        update_ticket(resp.data);
        setPause(false);
      } else {
        batch_messages(["數量不可小於等於0"], "error");
        setPause(true);
      }
    } catch (error) {
      if (error.response.data.errors) {
        let message = error.response.data.errors.map((d) => d.message)[0];
        if (message === "In Valid number") {
          batch_messages(["數字不可為0或超過剩餘數量"], "error");
        } else {
          batch_messages(
            error.response.data.errors.map((d) => d.message),
            "error"
          );
        }
      }

      setNumber(preNumber);
    }
  };

  const changeOption =
    (index) => async (newOptionKey, optionKey, setOptionKey, setNumber) => {
      const Ticket = tickets[index];
      const preOptionKey = optionKey;
      setOptionKey(newOptionKey);
      const update_ticket = update_ticket_byIndex(index);
      setNumber(1);
      try {
        const resp = await axios.put(ticketApi.update_ticket(Ticket.id), {
          number: 1,
          optionKey: newOptionKey,
        });

        update_ticket(resp.data);
      } catch (error) {
        batch_messages(
          error.response.data.errors.map((d) => d.message),
          "error"
        );
        setOptionKey(preOptionKey);
      }
    };

  const onBlur = (number, setNumber) => {
    if (number <= "0") {
      batch_messages(["數量不可小於等於0"], "error");
      changeNumber(1, number, setNumber);
      setNumber(1);
    }
  };

  const create_order = async () => {
    if (selected.length) {
      let temp = [];
      selected.forEach((d, index) => {
        if (d) temp.push(tickets[index].id);
      });
      if (!pause && temp.length > 0) {
        try {
          const resp = await axios.post(orderApi.new(), {
            ticketId: temp,
            address: auth.address ? auth.address : "",
            phoneNumber: auth.phoneNumber ? auth.phoneNumber : "",
          });

          history.push(`/order/${resp.data.id}`);
        } catch (error) {
          batch_messages(
            error.response.data.errors.map((d) => d.message),
            "error"
          );
        }
      }
    } else {
      add_message({
        message: "未選擇商品",
        state: "info",
        key: new Date().getTime(),
      });
    }
  };

  const selectAll = (e) => {
    let temp = [];

    if (e.target.checked) {
      for (let i = 0; i < selected.length; i++) {
        // console.log(selected[i]);

        const Ticket = tickets[i];
        const remains = Ticket["options"][Ticket["optionKey"]]["number"];
        if (remains > 0) temp.push(true);
        else temp.push(false);
      }

      // temp = selected.map((d) => true);
    } else temp = selected.map((d) => false);

    setSelected([...temp]);
  };
  // console.log("--------selected", selected);

  return (
    <Container className={classes.root}>
      <Paper>
        <Container>
          <Grid
            container
            className={classes.panel}
            justifyContent="center"
            alignItems="center"
            alignContent="center"
          >
            <Grid
              container
              spacing={3}
              item
              xs={12}
              style={{ borderBottom: "solid grey 1px" }}
            >
              <Grid
                item
                xs={12}
                container
                spacing={2}
                justifyContent={matchesSM ? "flex-start" : "space-between"}
                alignItems="center"
              >
                <Grid item>
                  <Checkbox checked={allSelected} onChange={selectAll} />
                </Grid>
                <Grid item container xs={4} spacing={2} alignItems={"center"}>
                  <Grid item xs={matchesSM ? 10 : 3}>
                    <Typography>商品</Typography>
                  </Grid>
                </Grid>
                {matchesSM ? null : (
                  <>
                    <Grid item xs={1}>
                      <Typography></Typography>
                    </Grid>
                    <Grid item xs={2}>
                      <Typography>剩餘數量</Typography>
                    </Grid>
                    <Grid item xs={1}>
                      <Typography>單價</Typography>
                    </Grid>
                    <Grid item xs={1}>
                      <Typography>數量</Typography>
                    </Grid>
                    <Grid item xs={1}>
                      <Typography>總計</Typography>
                    </Grid>
                    <Grid item xs={1}>
                      <Typography>操作</Typography>
                    </Grid>
                  </>
                )}
              </Grid>
              {tickets.map((t, index) =>
                matchesSM ? (
                  <TicketShowSM
                    Ticket={t}
                    key={t.id}
                    cancel={setCancel(index)}
                    setSelected={changeSelection(index, setSelected)}
                    selected={selected[index]}
                    changeNumber={changeNumber(index)}
                    changeOption={changeOption(index)}
                    onBlur={onBlur}
                  />
                ) : (
                  <TicketShow
                    Ticket={t}
                    key={t.id}
                    cancel={setCancel(index)}
                    setSelected={changeSelection(index, setSelected)}
                    selected={selected[index]}
                    changeNumber={changeNumber(index)}
                    changeOption={changeOption(index)}
                    onBlur={onBlur}
                    // update_ticket={update_ticket_byIndex(index)}
                  />
                )
              )}
            </Grid>

            <Grid
              item
              container
              xs={12}
              alignItems="center"
              justifyContent="flex-end"
              spacing={2}
            >
              <Grid item>
                <Typography>
                  總價: $
                  {tickets.reduce(
                    (pre, curr, index) =>
                      selected[index] *
                        curr.number *
                        curr["options"][curr["optionKey"]]["price"] +
                      pre,
                    0
                  )}
                </Typography>
              </Grid>
              <Grid item style={{ marginRight: "50px" }}>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={create_order}
                >
                  購買
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Paper>
    </Container>
  );
}

// Tickets.propTypes = {};

export default Tickets;
