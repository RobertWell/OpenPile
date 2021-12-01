import React from "react";
import { Tabs, Tab, makeStyles, Fade ,Grid} from "@material-ui/core";

const useStyle = makeStyles((theme) => {
  return {
    root: {
      minWidth: 70,
    },
    selected: {
      backgroundColor: "black",
      color: "white",
      fontWeight: 600,
      borderRadius: "10px 10px 0 0",
    },

    Tab: {
      "&:hover": {
        backgroundColor: "black",
        color: "white",
        fontWeight: 600,
        opacity: 1,
        borderRadius: "10px 10px 0 0",
      },
    },
  };
});

export const CustomTabs = ({ children, ...others }) => {
  return <Tabs {...others}>{children}</Tabs>;
};

export const CustomTab = ({ label, ...others }) => {
  const classes = useStyle();
  return (
    <Tab
      disableRipple={true}
      label={label}
      classes={{ selected: classes.selected, root: classes.root }}
      className={classes.Tab}
      {...others}
    />
  );
};

export const CustomTabber = ({ GroupList, open, value, setValue }) => {
  return (
    <>
      {open ? (
        <Grid item >
          <Fade in={open} timeout={300}>
            <CustomTabs
              value={value}
              onChange={(e, newValue) => setValue(newValue)}
              centered
            >
              {GroupList.map((i) => (
                <CustomTab label={i["text"]} key={i["text"]} />
              ))}
            </CustomTabs>
          </Fade>
        </Grid>
      ) : null}
    </>
  );
};

// export const CustomTabs = withStyles((theme) => ({
//   root: {
//          padding: '0',
//          margin:0,

//   },
//   //等同於TabIndicatorProps
//   indicator: {
//     display: 'flex',
//     justifyContent: 'center',
//     backgroundColor: 'transparent',
//     '& > span': {
//       maxWidth: 40,
//       width: '100%',
//       backgroundColor: '#635ee7',
//     },
//   },
// }))((props) => <Tabs {...props} TabIndicatorProps={{ children: <span /> }} />);

// export const CustomTab = withStyles((theme) => ({
//   root: {
//     textTransform: "none",
//     color: "black",
//     fontWeight: theme.typography.fontWeightRegular,
//     fontSize: theme.typography.pxToRem(15),
//     marginRight: theme.spacing(1),
//     "&:focus": {
//       opacity: 1,
//     },
//     padding: '0',
//     margin:0,
//     width: 150
//   },
// }))((props) => <Tab disableRipple {...props} />);
