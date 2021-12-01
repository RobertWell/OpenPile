import React, { useState } from "react";
import { UnsplashSearchBar, UnsplashSearchOutput, BuildForm, FigurePanel } from "Components";
import {
  // Container,
  makeStyles,
  Paper,
  Collapse,
  Grid,
} from "@material-ui/core";
import axios from "axios";
import { unsplashApi } from "api/unsplash_api";
import { productApi } from "api/productApi";

const useStyles = makeStyles((theme) => ({
  root: {
    // margin: theme.spacing(0.5),
    width: "100%",
  },
  textField: {
    flexGrow: 1,
    width: "100%",
  },
  pageContent: {
    margin: theme.spacing(0),
    padding: theme.spacing(3),
  },
  pageHeader: {
    margin: theme.spacing(0),
    padding: theme.spacing(3),
    borderRadius: "10px 10px 0 0",
  },
  pageTail: {
    // margin: theme.spacing(0),
    // padding: theme.spacing(3),
    // borderRadius: "0 0 10px 10px",
  },
}));

const BuildProduct = () => {
  const classes = useStyles();

  const [hide, setHide] = useState(false);
  const [items, setItems] = useState([]);
  const [photos, setPhotos] = useState([]);
  // const [apportion, setApportion] = useState([]);
  const [selected, setSelected] = useState([]);
  const [candidates, setCandidates] = useState([]);
  const doRequest = async (input) => {
    try {
      let resp;
      if (input.length > 0) {
        resp = await axios.post(unsplashApi.search(), null, {
          params: {
            query: input,
          },
        });
      } else {
        resp = await axios.get(unsplashApi.get());
      }
      let { data } = resp;
      // console.log(data);
      setItems(data);
      setPhotos(
        data.map((d) => ({
          src: d.urls.thumb,
          width: d.width,
          height: d.height,
        }))
      );
      setCandidates(data.map((d) => getCandidates(d)));
      // setApportion(new Array(data.length).map((d) => false));
    } catch (e) {
      console.log("error: ", e);
    }
  };

  const postProduct = async (values) => {
    try {
      let resp = await axios.post(productApi.new(), values);
      console.log(resp.status);
    } catch (e) {
      console.log("--------------------e", e);
    }
  };
  const submitHandler = (input) => {
    if (photos.length === 0) {
      doRequest(input);
    } else {
      setPhotos([]);
      doRequest(input);
    }
  };

  const hideHandler = () => {
    setHide(!hide);
  };

  const getCandidates = (item) => {
    return {
      title: item.alt_description,
      options: [
        {
          id: item.id,
          name: item.alt_description,
          price: 1,
          thumbnail: item.urls.thumb,

          number: 1,
        },
      ],
      discount: 100,
      fullFigures: [item.urls.regular],
      short_description: item.alt_description,
      long_descrition: item.description,
      tags: item.categories,
      cover: item.urls.regular,
      ContentImg: [item.urls.regular],
    };
  };

  const submitProduct = async (values) => {
    let r = { ...values };
    let options = {};
    for (let i in values.options) {
      let temp = values.options[i];
      delete temp.id;
      options[temp.name] = temp;
    }
    r["options"] = options;
    console.log("----------------submitProduct", r);
    await postProduct(r);
  };

  return (
    <div>
      <Paper className={classes.pageHeader}>
        <UnsplashSearchBar
          submitHandler={submitHandler}
          hideHandler={hideHandler}
          hide={hide}
        />
      </Paper>
      <div>
        <Collapse in={!hide && photos.length > 0}>
          <UnsplashSearchOutput
            photos={photos}
            direction="row"
            selected={selected}
            setSelected={setSelected}
          />
        </Collapse>
      </div>
      <Paper>
        <Grid container spacing={2}>
          <Grid item container xs={8}>
            {selected.map((s, i) =>
              s ? (
                <BuildForm
                  key={i}
                  initialValues={candidates[i]}
                  submitProduct={submitProduct}
                />
              ) : null
            )}
          </Grid>
          <Grid item xs={4}>
            <FigurePanel products={items}/>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default BuildProduct;
