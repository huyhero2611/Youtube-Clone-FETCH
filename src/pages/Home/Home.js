import React, { useState, useEffect } from "react";
import VideoListPopular from "../../components/VideoList/VideoListPopular";
import { Grid } from "@material-ui/core";
import NavBar from "../../components/NavBar/NavBar";
import "./Home.css";
import { getMostPopularVideos } from "../../api/baseApi";

function Home() {
  return (
    <div className="home">
      <Grid container>
        <Grid item className="lg-2 md-2 sm-2 home__navbar" xs={2}>
          <NavBar />
        </Grid>
        <Grid
          item
          className="lg-10 md-10 sm-10 home__content"
          xs={10}
          justify="space-around"
        >
          <VideoListPopular />
        </Grid>
      </Grid>
    </div>
  );
}

export default Home;
