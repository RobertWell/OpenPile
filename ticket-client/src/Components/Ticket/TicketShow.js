import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Avatar,
  Grid,
  Checkbox,
  Typography,
  makeStyles,
  useTheme,
  useMediaQuery,
  Button,
  TextField,
  Link,
} from "@material-ui/core";
import { OptionsShow } from "Components";
const useStyles = makeStyles(() => {
  return {
    root: ({ matchesSM, remains }) => ({
      backgroundColor: remains > 0 ? "inherit" : "#CDCDCD",
    }),
    title: ({ matchesSM }) => {
      return {
        fontSize: matchesSM ? "10px" : "16px",
      };
    },
    subtitle: ({ matchesSM, remains }) => {
      return {
        fontSize: matchesSM ? "8px" : "16px",
        color: remains > 0 ? "inherit" : "grey",
      };
    },
    select: {
      fontSize: "12px",
    },
    button: {
      minWidth: "10px",
    },
    link: {
      textDecoration: "none",
      color: "inherit",
      "&:hover": {
        textDecoration: "none",
        color: "inherit",
      },
    },
    img: {
      filter: "grayscale(100%)",
    },

  };
});

function TicketShow({
  Ticket,
  cancel,
  setSelected,
  selected,
  changeNumber,
  changeOption,
  onBlur,
}) {
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));
  // const matchesMD = useMediaQuery(theme.breakpoints.down("md"));
  const isMultipleOptnios = Object.keys(Ticket.options).length > 1;
  const [number, setNumber] = useState(Ticket.number);
  const [optionKey, setOptionKey] = useState(Ticket.optionKey);
  const remains = Ticket["options"][Ticket["optionKey"]]["number"];
  // console.log("------Ticket", Ticket);
  const classes = useStyles({ matchesSM, remains });
  // const changeOption = (option) => {
  //   setOptionKey(option);
  // };

  return (
    <Grid
      container
      item
      xs={12}
      spacing={1}
      justifyContent="space-between"
      alignItems="center"
      className={classes.root}
    >
      <Grid item>
        <Checkbox
          checked={remains > 0 && selected}
          disabled={remains <= 0}
          onChange={(e) => {
            setSelected(e.target.checked);
          }}
        />
      </Grid>
      <Grid item container xs={4} spacing={2} alignItems="center">
        <Grid item>
          <Avatar
            variant={"square"}
            sizes={matchesSM ? "small" : "large"}
            src={Ticket.options[Ticket.optionKey]["thumbnail"]}
            classes={{ root: remains > 0 ? "none" : classes.img }}
          />
        </Grid>
        <Grid item>
          <Typography variant={"body1"} className={classes.subtitle}>
            <Link
              href={`/product/${Ticket.productId}`}
              className={classes.link}
            >
              {Ticket.title}
            </Link>
          </Typography>
        </Grid>
      </Grid>
      <Grid item xs={1}>
        {isMultipleOptnios ? (
          <OptionsShow
            opetionKey={optionKey}
            options={Ticket.options}
            setOption={(newOptionKey) =>
              changeOption(newOptionKey, optionKey, setOptionKey, setNumber)
            }
          />
        ) : (
          <Typography className={classes.subtitle}>{optionKey}</Typography>
        )}
      </Grid>

      <Grid item xs={1}>
        <Typography className={classes.subtitle}>
          {Ticket.options[Ticket.optionKey]["number"]}
        </Typography>
      </Grid>
      <Grid item xs={1}>
        <Typography className={classes.subtitle}>
          ${Ticket.options[Ticket.optionKey]["price"]}
        </Typography>
      </Grid>

      <Grid item className={classes.subtitle} xs={1}>
        {remains ? (
          <TextField
            value={number}
            type="number"
            size="small"
            onChange={(e) => changeNumber(e.target.value, number, setNumber)}
            inputProps={{
              min: 1,
              max: Ticket.options[Ticket.optionKey]["number"],
            }}
            onBlur={() => onBlur(number, setNumber)}
          />
        ) : (
          <Typography className={classes.subtitle}>已售罄</Typography>
        )}
      </Grid>
      <Grid item className={classes.subtitle} xs={1}>
        ${Ticket.options[Ticket.optionKey]["price"] * number}
      </Grid>
      <Grid item xs={1}>
        <Button
          className={classes.button}
          size="small"
          variant="outlined"
          onClick={cancel}
        >
          刪除
        </Button>
      </Grid>
    </Grid>
  );
}

TicketShow.propTypes = {
  Ticket: PropTypes.object,
};

export { TicketShow };
