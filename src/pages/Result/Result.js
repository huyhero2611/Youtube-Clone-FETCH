import React, { useEffect, useState } from "react";
import { searchRequest, getVideoDetails } from "../../api/baseApi";
import { Grid } from "@material-ui/core";
import Navbar from "../../components/NavBar/NavBar";
import VideoList from "../../components/VideoList/VideoList";
import "./Result.css";

function Result(props) {
  const inputSearch = props.match.params.inputSearch;

  return (
    <div className="result">
      <Grid container>
        <Grid item className="lg-2 md-2 sm-2" xs={2}>
          <Navbar />
        </Grid>
        <Grid
          item
          className="lg-8 md-8 sm-8 result__content"
          xs={8}
          justify="center"
        >
          <VideoList inputSearch={inputSearch} />
        </Grid>
      </Grid>
    </div>
  );
}

export default Result;
