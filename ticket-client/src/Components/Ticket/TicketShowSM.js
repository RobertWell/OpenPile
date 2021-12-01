import React, { useState } from "react";
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
  Drawer,
  Link,
  IconButton,
  InputBase,

} from "@material-ui/core";
import ArrowLeftIcon from "@material-ui/icons/ArrowLeft";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import ClearIcon from "@material-ui/icons/Clear";
import { useActions } from "hooks/useActions";
const useStyles = makeStyles((theme) => {
  return {
    root: ({  remains }) => ({
      backgroundColor: remains > 0 ? "inherit" : "#CDCDCD",
    }),
    title: ({ upSM, remains }) => {
      return {
        fontSize: upSM ? "20px" : "18px",
        color: remains > 0 ? "inherit" : "grey",
      };
    },
    subtitle: ({ upSM, remains }) => {
      return {
        fontSize: upSM ? "16px" : "8px",
        color: remains > 0 ? "inherit" : "grey",
      };
    },
    select: {
      fontSize: "12px",
    },
    button: {
      minWidth: "8px",
    },
    large: ({ upSM }) => ({
      width: upSM ? theme.spacing(9) : theme.spacing(7),
      height: upSM ? theme.spacing(9) : theme.spacing(7),
    }),
    Extralarge: {
      width: "100px",
      height: "100px",
    },
    divider: {
      content: "' '",
      height: "10px",
    },
    middle: {
      flexGrow: 1,
    },
    link: {
      textDecoration: "none",
      color: "inherit",
      "&:hover": {
        textDecoration: "none",
        color: "inherit",
      },
    },
    img: ({ remains }) => ({
      filter: remains > 0 ? "inherit" : "grayscale(100%)",
    }),
    container: {
      padding: theme.spacing(3),
    },
    headImg: {
      width: theme.spacing(10),
      height: theme.spacing(10),
    },
    optionButton: {
      color: "black",
      borderRadius: "0",
    },
    optionButtonSelected: {
      color: "red",
      border: "1px red solid",
    },
    paper: {
      width: "auto",
    },
    inputStyle: {
      align: "center",
      textAlign: "center",
      "& input": {
        textAlign: "center",
      },
    },
  };
});

const TicketShowSM = ({
  Ticket,
  cancel,
  setSelected,
  selected,
  changeNumber,
  changeOption,
  onBlur,
}) => {
  const theme = useTheme();
  const upSM = useMediaQuery(theme.breakpoints.up("sm"));
  const upMD = useMediaQuery(theme.breakpoints.up("md"));


  const isMultipleOptnios = Object.keys(Ticket.options).length > 1;
  const [number, setNumber] = useState(Ticket.number);
  const [optionKey, setOptionKey] = useState(Ticket.optionKey);
  const { batch_messages } = useActions();

  const remains = Ticket.options[optionKey]["number"];
  const classes = useStyles({ upSM, upMD, remains });
  return (
    <Grid
      container
      item
      alignItems="center"
      justifyContent="space-between"
      className={classes.root}
    >
      <Grid item>
        <Checkbox
          checked={selected}
          onChange={(e) => {
            if (remains > 0) setSelected(e.target.checked);
          }}
          size="small"
          disabled={remains <= 0}
        />
      </Grid>
      <Grid item xs={8}>
        <Typography variant={"body1"} className={classes.title}>
          <Link href={`/product/${Ticket.productId}`} className={classes.link}>
            {Ticket.title}
          </Link>
        </Typography>
      </Grid>
      <Grid item className={classes.middle} />
      <Grid item xs={2}>
        <Button
          className={classes.button}
          size="small"
          // dense={true}
          // variant="outlined"
          onClick={cancel}
        >
          <ClearIcon />
        </Button>
      </Grid>

      <Grid container item xs={12} justifyContent="flex-end">
        <Grid item xs={3}>
          <Avatar
            variant={"square"}
            src={Ticket.options[Ticket.optionKey]["thumbnail"]}
            className={`${classes.large} ${classes.img}`}
          />
        </Grid>

        <Grid
          item
          xs={8}
          container
          alignItems="center"
          justifyContent="space-between"
          // spacing={1}
        >
          <Grid item xs={12}>
            {isMultipleOptnios ? (
              <OptionDrawer
                title={Ticket.title}
                optionKey={optionKey}
                options={Ticket.options}
                setOption={(newOptionKey) =>
                  changeOption(newOptionKey, optionKey, setOptionKey, setNumber)
                }
                label={`選項: ${optionKey} (${remains})`}
                number={number}
                changeNumber={changeNumber}
                setNumber={setNumber}
              />
            ) : (
              <Typography
                className={classes.subtitle}
              >{`${optionKey} (${Ticket.options[optionKey]["number"]})`}</Typography>
            )}
          </Grid>

          <Grid item className={classes.subtitle} xs={3}>
            {remains > 0 ? (
              <TextField
                // label="數量"
                value={number}
                type="number"
                size="small"
                onChange={(e) =>
                  changeNumber(e.target.value, number, setNumber)
                }
                inputProps={{
                  min: 1,
                  max: Ticket.options[Ticket.optionKey]["number"],
                }}
                onBlur={() => {
                  onBlur(number, setNumber);
                }}
              />
            ) : (
              <Typography className={classes.subtitle}>已售罄</Typography>
            )}
          </Grid>
          <Grid item xs={6}>
            <Typography className={classes.subtitle} align="center">
              ${Ticket.options[Ticket.optionKey]["price"]}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

const OptionDrawer = ({
  options,
  setOption,
  optionKey,
  label,
  title,
  number,
  changeNumber,
  setNumber,
}) => {
  const remains = options[optionKey]["number"];
  const classes = useStyles({ remains });
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        style={{ background: "#f8fcdc" }}
        size="small"
        className={classes.button}
        onClick={() => setOpen(!open)}
      >
        {label}
      </Button>
      <Drawer
        open={open}
        anchor={"bottom"}
        onClose={() => setOpen(false)}
        docked
      >
        <Grid
          container
          className={classes.container}
          alignItems="center"
          justifyContent="center"
        >
          <Grid item xs={4}>
            <Avatar
              src={options[optionKey]["thumbnail"]}
              variant={"square"}
              className={`${classes.Extralarge} ${classes.img}`}
            />
          </Grid>
          <Grid item container xs={8} direction="column">
            <Grid item>
              <Typography>價錢： $ {options[optionKey]["price"]}</Typography>
            </Grid>
            <Grid item>
              <Typography>商品數量: {options[optionKey]["number"]}</Typography>
            </Grid>
          </Grid>
          <Grid
            item
            xs={12}
            style={{
              borderBottom: "1px solid lightgrey",
              marginTop: "10px",
              marginBottom: "10px",
            }}
          />
          <Grid item>{title}</Grid>
          <Grid
            item
            xs={12}
            style={{
              borderBottom: "1px solid lightgrey",
              marginTop: "10px",
              marginBottom: "10px",
            }}
          />

          <Grid item xs={12} style={{marginBottom:"10px"}}>
            <Typography>選項：</Typography>
          </Grid>
          <Grid item container spacing={2}>
            {Object.keys(options).map((d) => {
              const selected = optionKey === d;

              return (
                <Grid item key={d}>
                  <Button
                    variant="outlined"
                    onClick={(e) => {
                      setOption(d);
                      // setOpen(false);
                    }}
                    disabled={options[d]["number"] <= 0}
                    className={`${
                      selected ? classes.optionButtonSelected : ""
                    } ${classes.optionButton}`}
                  >
                    {d}
                  </Button>
                </Grid>
              );
            })}
          </Grid>
          <Grid
            item
            xs={12}
            style={{
              borderBottom: "1px solid lightgrey",
              marginTop: "10px",
              marginBottom: "10px",
            }}
          />
          <Grid item xs={3}>
            <Typography>數量：</Typography>
          </Grid>
          <Grid item xs={9}>
            <IconButton
              onClick={(e) => {
                changeNumber(number - 1, number, setNumber);
              }}
              disabled={number - 1 <= 0}
            >
              <ArrowLeftIcon />
            </IconButton>
            <InputBase
              value={number}
              style={{ width: "50%", textAlign: "center" }}
              onChange={(e) => {
                changeNumber(e.target.value, number, setNumber);
              }}
              className={classes.inputStyle}
            />
            <IconButton
              onClick={(e) => {
                changeNumber(number + 1, number, setNumber);
              }}
              disabled={number + 1 > remains}
            >
              <ArrowRightIcon />
            </IconButton>
          </Grid>
          <Grid
            item
            xs={12}
            style={{
              borderBottom: "1px solid lightgrey",
              marginTop: "10px",
              marginBottom: "10px",
            }}
          />
          <Grid item xs={12} style={{ margin: "10px" }}>
            <Button
              variant="outlined"
              onClick={() => setOpen(false)}
              fullWidth
              color="primary"
            >
              確定
            </Button>
          </Grid>
        </Grid>
      </Drawer>
    </>
  );
};

export { TicketShowSM };
