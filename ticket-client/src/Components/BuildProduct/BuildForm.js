import React, {  useState } from "react";
import { useAppendableNestedForm, Form } from "hooks/useAppendableNestedForm";
import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";
import { deepCheck } from "Composables/deepCheck";
import { Button, Input, TextArea } from "../controls";
import CloseIcon from "@material-ui/icons/Close";
import {
  // Container,
  makeStyles,
  Avatar,
  Typography,
  Grid,
  // Box,
  ImageList,
  ImageListItem,
  // Divider,
  IconButton,
  InputAdornment,
  Chip,
} from "@material-ui/core";
import { addressCheck } from "Composables/addressCheck";
import { Price } from "Components";
const useStyles = makeStyles((theme) => ({
  Panel: {
    margin: theme.spacing(0),
    // padding: theme.spacing(3),
    // borderRadius: "0 0 10px 10px",
    border: "4px solid black",
    borderRadius: "10px",
    padding: "10px",
    marginBottom: "10px",
  },
  "@global": {
    a: {
      textDecoration: "none",
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },

  imageRoot: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
    outline: `solid ${theme.palette.primary.light} 3px`,
  },
  imageList: {
    flexWrap: "nowrap",
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: "translateZ(0)",
  },

  options: {
    // :not(:last-child)
    "&>*:not(:last-child)": {
      borderBottom: "solid black 1px",
      paddingBottom: "1px",
      marginBottom: "5px",
    },
  },
  option: {
    // marginBottom:"20px"
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  textArea: {
    width: "100%",
    resize: "vertical",
  },
  deleteIcon: {
    color: theme.palette.error.main,
  },
  addIcon: {
    color: theme.palette.primary.main,
  },
  section: {
    height: "100%",
  },
  tags: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(0.5),
    },
  },
  cover: {
    display: "block",
    outline: `solid ${theme.palette.primary.light} 3px`,
    width: "250px",
    height: "250px",
    objectFit: "cover",

    "&:hover": {
      outline: `solid ${theme.palette.primary.main} 5px`,
      outlineOffset: "-2px",
    },
  },
}));

const defaultInitialValues = {
  title: "",
  cover: "",
  options: {
    default: {
      price: 1,
      thumbnail: "",
      number: 1,
    },
  },
  discount: 0,
  fullFigures: [],
  short_description: "",
  long_descrition: "",
  tags: [],
  ContentImg: [],
};

const checkName = (valeus, temp) => {
  let t1 = {};
  let t2 = [];
  for (let k in valeus.options) {
    let check = valeus.options[k]["name"] in t1;
    t2.push(check);
    if (check) t2[t1[valeus.options[k]["name"]]] = check;
    else t1[valeus.options[k]["name"]] = k;
  }
  t2.forEach((t, i) => {
    temp[`options.${i}.name`] = t ? "名稱重複" : "";
  });
  return temp;
};

const BuildForm = ({ initialValues = defaultInitialValues, submitProduct }) => {
  const [lazy, setLazy] = useState(true);
  const classes = useStyles();

  const validate = (fieldValues = values) => {
    let temp = {};

    for (let key in fieldValues) {
      if ("cover" === key)
        temp.cover =
          typeof fieldValues.cover === "string" ? "" : "Type Invalid";
      if ("title" === key)
        temp.title =
          fieldValues.title.length > 0 && fieldValues.title.length <= 30
            ? ""
            : "請提供標題(長度介於1至30之間)";

      if ("discount" === key)
        temp.discount =
          parseFloat(fieldValues.discount) > 0 &&
          parseFloat(fieldValues.discount) <= 100
            ? ""
            : "折扣數值需>0且<=100";

      if ("options" === key) {
        if (Object.keys(fieldValues.options) === 0) {
          temp.options = "請提供options";
        } else {
          temp = checkName(values, temp);
          for (let k in fieldValues.options) {
            temp[`options.${k}.price`] =
              parseFloat(fieldValues.options[k]["price"]) > 0 ? "" : "價錢需>0";

            temp[`options.${k}.number`] =
              parseInt(fieldValues.options[k]["number"]) >= 0
                ? ""
                : "數量至少為0";
            temp[`options.${k}.thumbnail`] = addressCheck(
              fieldValues.options[k]["thumbnail"]
            )
              ? ""
              : "網址格式不對";
          }
        }
      }

      if (/^options.[^.]+.?(price|number|thumbnail|name)$/.test(key)) {
        let keys = key.split(".");

        if (keys[2] === "price")
          temp[key] = parseFloat(fieldValues[key]) > 0 ? "" : "價錢需>0";
        if (keys[2] === "number")
          temp[key] = parseInt(fieldValues[key]) >= 0 ? "" : "數量至少為0";
        if (keys[2] === "thumbnail")
          temp[key] = addressCheck(fieldValues[key]) ? "" : "網址格式不對";
        if (keys[2] === "name") temp = checkName(values, temp);
      }

      if (/^fullFigures.[0-9]+$/.test(key)) {
        // let keys = key.split(".");
        temp[key] = addressCheck(fieldValues[key]) ? "" : "網址格式有誤!";
      }

      if ("fullFigures" === key) {
        temp["fullFigures"] =
          Array.isArray(fieldValues.fullFigures) &&
          fieldValues.fullFigures.length > 0 &&
          fieldValues.fullFigures.length < 10
            ? ""
            : "圖片最多9張最少1張!";

        for (let i in fieldValues.fullFigures) {
          temp[`fullFigures.${i}`] = addressCheck(fieldValues.fullFigures[i])
            ? ""
            : "網址格式有誤!";
        }
      }
      if ("short_description" === key) {
        temp.short_description =
          fieldValues.short_description.length <= 30
            ? ""
            : "副標題不可多於30字";
      }
      if ("long_descrition" === key) {
        temp.long_descrition = "";
      }
      if ("tags" === key) {
        temp.tags = Array.isArray(fieldValues.tags) ? "" : "tags格式不對!";
      }
    }
    temp = { ...errors, ...temp, submit: "" };
    setErrors(temp);

    // console.log('-----------------',temp);
    if (fieldValues === values) return deepCheck(temp, "");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLazy(false);

    setErrors({ ...errors, submit: "" });

    if (validate()) {
      // console.log('---------key={i}',values);

      submitProduct(values);
    }
  };
  const { values, setValues, handleValues, errors, setErrors } =
    useAppendableNestedForm(initialValues, true, validate, lazy);

  const getDeleteOption = (index) => () => {
    values.options.splice(index, 1);
    setValues({ ...values });
  };

  const getAddOption = (index) => () => {
    values.options.splice(index, 0, {
      id: Math.random().toString(),
      name: "None",
      price: 1,
      thumbnail: "",
      number: 0,
    });
    setValues({ ...values });
  };

  const addFullFigure = () => {
    values.fullFigures.push("");
    setValues({ ...values });
  };
  const getDeleteFullFigure = (index) => () => {
    values.fullFigures.splice(index, 1);
    setValues({ ...values });
  };

  const addContentImg = () => {
    values.ContentImg.push("");
    setValues({ ...values });
  };

  const getDeleteContentImg = (index) => () => {
    values.ContentImg.splice(index, 1);
    setValues({ ...values });
  };

  const getDeleteTag = (index) => () => {
    values.tags.splice(index, 1);
    setValues({ ...values });
  };

  const addTag = (value) => {
    if (!values.tags.includes(value)) {
      values.tags.push(value);
      setValues({ ...values });
    }
  };

  const [newTag, setNewTag] = useState("");
  return (
    <Grid item container className={classes.Panel}>
      <Typography component="h3" variant="h5">
        產品建構
      </Typography>
      <Form className={classes.form} onSubmit={handleSubmit}>
        <Grid container spacing={4}>
          <Grid
            container
            spacing={4}
            style={{
              border: "solid 1px ",
              padding: "5px",
              margin: "10px 5px",
            }}
          >
            <Grid item xs={12} md={4} container spacing={1}>
              <Grid item xs={12}>
                <img src={values.cover} alt="Cover" className={classes.cover} />
              </Grid>
              <Grid item xs={12}>
                <div className={classes.imageRoot}>
                  <ImageList
                    cols={
                      values.fullFigures.length === 0
                        ? 0
                        : values.fullFigures.length === 1
                        ? 1
                        : 1.5
                    }
                    className={classes.imageList}
                  >
                    {values.fullFigures.map((d, i) => (
                      <ImageListItem key={i}>
                        <img src={d} alt={"FullFigures"} />
                      </ImageListItem>
                    ))}
                  </ImageList>
                </div>
              </Grid>

              <Grid container item xs={12}>
                <Grid item xs={10}>
                  <Typography component="h3" variant="h5">
                    相簿
                  </Typography>
                </Grid>
                <Grid item xs={2}>
                  <IconButton
                    className={classes.addIcon}
                    onClick={addFullFigure}
                  >
                    <AddIcon />
                  </IconButton>
                </Grid>
              </Grid>

              {values.fullFigures.map((f, i) => (
                <Grid container spacing={1} item xs={12} key={i}>
                  <Grid item xs={11}>
                    <Input
                      label={`圖片${i + 1}`}
                      name={`fullFigures.${i}`}
                      value={values[`fullFigures`][`${i}`]}
                      onChange={handleValues}
                      error={errors[`fullFigures.${i}`]}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={1}>
                    <IconButton
                      className={classes.deleteIcon}
                      onClick={getDeleteFullFigure(i)}
                    >
                      <RemoveIcon />
                    </IconButton>
                  </Grid>
                </Grid>
              ))}
            </Grid>

            <Grid
              container
              item
              xs={12}
              md={8}
              // direction="column"
              spacing={2}
              className={classes.section}
              justifyContent="flex-start"
              alignItems="flex-start"
            >
              <Grid item xs={12}>
                <Grid container spacing={2}>
                  <Grid item xs={8}>
                    <Input
                      label="請輸入產品名"
                      name="title"
                      value={values.title}
                      onChange={handleValues}
                      error={errors.title}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <Input
                      label="折扣"
                      name="discount"
                      value={values.discount}
                      onChange={({ target: { name, value } }) => {
                        handleValues({
                          target: { name, value: parseInt(value) },
                        });
                      }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">%</InputAdornment>
                        ),
                        inputProps: { min: 1, max: 100 },
                      }}
                      type="number"
                      error={errors.discount}
                      fullWidth
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Input
                  label="產品封面圖"
                  value={values.cover}
                  onChange={handleValues}
                  name="cover"
                  error={errors.cover}
                  fullWidth
                />
              </Grid>

              <Grid item xs={12}>
                <Typography variant="subtitle1">選項</Typography>
              </Grid>

              <Grid
                item
                xs={12}
                container
                spacing={5}
                // className={classes.section}
                justifyContent="center"
                alignItems="flex-start"
              >
                {/* <Grid item xs={12}> */}
                {values.options.map((k, index) => (
                  <RenderedOption
                    // className={classes.option}
                    k={k}
                    values={values}
                    handleValues={handleValues}
                    errors={errors}
                    key={index}
                    index={index}
                    deleteOption={getDeleteOption(index)}
                    addOption={getAddOption(index)}
                    discount={values.discount}
                  />
                ))}
                {/* </Grid> */}
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Input
              label={"副標題"}
              name="short_description"
              value={values.short_description}
              onChange={handleValues}
              fullWidth
              error={errors["short_description"]}
              helperText="副標題不可多餘30字"
            />
          </Grid>
          <Grid item xs={12}>
            <Typography>文字內容：</Typography>
          </Grid>
          <Grid item xs={12}>
            <TextArea
              label="詳細內容："
              // fullWidth
              className={classes.textArea}
              minRows={3}
              name="long_descrition"
              onChange={handleValues}
            />
          </Grid>

          <Grid item xs={12} container alignItems="center">
            <Grid item>
              <Typography>內容圖片：</Typography>
            </Grid>
            <Grid item>
              <IconButton className={classes.addIcon} onClick={addContentImg}>
                <AddIcon />
              </IconButton>
            </Grid>
          </Grid>
          <Grid item xs={4} container spacing={2}>
            {values.ContentImg.map((item, index) => (
              <Grid item key={index}>
                <Input
                  label={`圖片${index + 1}`}
                  value={item}
                  name={`ContentImg.${index}`}
                  onChange={handleValues}
                  InputProps={{
                    endAdornment: (
                      <IconButton
                        className={classes.deleteIcon}
                        onClick={getDeleteContentImg(index)}
                      >
                        <CloseIcon />
                      </IconButton>
                    ),
                  }}
                />
              </Grid>
            ))}
          </Grid>
          <Grid xs={12} item />
          <Grid xs={12} item>
            {values.ContentImg.map((item, index) => (
              <img
                key={index}
                src={item}
                alt={`Content${index}`}
                style={{ width: "100%" }}
              />
            ))}
          </Grid>

          <Grid xs={12} item container>
            <Grid item xs={8}>
              <Input
                value={newTag}
                onChange={(e) => {
                  setNewTag(e.target.value);
                }}
                size="small"
              />
              <Button
                style={{ fontSize: "12px" }}
                size="small"
                onClick={() => {
                  addTag(newTag);
                }}
                text="Add Tag"
              />
            </Grid>
            <Grid item></Grid>

            <div className={classes.tags}>
              {values.tags.map((t, i) => (
                <Grid item>
                  <Chip
                    key={i}
                    label={t}
                    // deleteIcon={<DoneIcon />}
                    onDelete={getDeleteTag(i)}
                  />
                </Grid>
              ))}
            </div>
          </Grid>

          <Grid item xs={12}>
            <Button
              text="Submit"
              type="Submit"
              fullWidth
              className={classes.submit}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography color="error">{errors["submit"]}</Typography>
          </Grid>
        </Grid>
      </Form>
    </Grid>
  );
};

const RenderedOption = ({
  k,
  index,
  handleValues,
  errors,
  deleteOption,
  addOption,
  discount,
}) => {
  const classes = useStyles();
  const [oriPrice, setOriPrice] = useState(
    getOriPrice(k["price"], discount, 0)
  );

  // const [editName, setEditName] = useState(false);
  // console.log(errors);
  return     <Grid container spacing={2} alignItems="center">
      <Grid item>
        <Avatar
          className={classes.large}
          variant="square"
          src={k["thumbnail"]}
          alt={`${k}_thumbnail`}
        />
      </Grid>
      <Grid item container xs={4}>
        {/* {editName ? ( */}
        <Input
          size="small"
          label="分類名稱"
          value={k["name"]}
          name={`options.${index}.name`}
          onChange={handleValues}
          error={errors[`options.${index}.name`]}
          helperText="名稱不可重複"
        />
      </Grid>
      <Grid item xs={12}>
        <Input
          style={{ fontSize: "9px" }}
          label="縮圖"
          name={`options.${index}.thumbnail`}
          value={k["thumbnail"]}
          onChange={handleValues}
          error={errors[`options.${index}.thumbnail`]}
          fullWidth
          margin="dense"
          size="small"
        />
      </Grid>
      <Grid item xs={2}>
        <Input
          label="數量"
          name={`options.${index}.number`}
          value={k["number"]}
          onChange={({ target: { name, value } }) => {
            handleValues({
              target: { name, value: parseInt(value) },
            });
          }}
          error={errors[`options.${index}.number`]}
          fullWidth
          type="number"
          helperText="需為整數且>0"
        />
      </Grid>
      <Grid item xs={3}>
        <Input
          label="原價"
          name={`options.${index}.price`}
          value={oriPrice}
          onChange={({ target: { name, value } }) => {
            handleValues({
              target: { name, value: OriPrice2Price(value, discount, 0) },
            });
            setOriPrice(value);
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">NT$</InputAdornment>
            ),
          }}
          error={errors[`options.${index}.price`]}
          fullWidth
          type="number"
          helperText="需>0"
        />
      </Grid>
      <Grid item xs={3}>
        <Input
          label="定價"
          name={`options.${index}.price`}
          value={k["price"]}
          onChange={({ target: { name, value } }) => {
            handleValues({
              target: { name, value: parseInt(value) },
            });
            setOriPrice(getOriPrice(value, discount, 0));
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">NT$</InputAdornment>
            ),
          }}
          error={errors[`options.${index}.price`]}
          fullWidth
          type="number"
          helperText="需>0"
        />
      </Grid>
      <Grid item xs={1}>
        <IconButton onClick={addOption} className={classes.addIcon}>
          <AddIcon />
        </IconButton>
      </Grid>
      <Grid item xs={1}>
        <IconButton onClick={deleteOption} className={classes.deleteIcon}>
          <RemoveIcon />
        </IconButton>
      </Grid>
      <Grid
        item
        xs={12}
        style={{ border: "2px solid red", borderRadius: "10px" }}
      >
        <Price price={k["price"]} discount={discount} />
      </Grid>
    </Grid>
  ;
};

const getOriPrice = (price, discount, decimal) => {
  return parseFloat((price / discount) * 100).toFixed(decimal);
};

const OriPrice2Price = (price, discount, decimal) => {
  return parseFloat((price * discount) / 100).toFixed(decimal);
};
export { BuildForm };
