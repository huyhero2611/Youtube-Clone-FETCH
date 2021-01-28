import React, { useEffect, memo, useState } from "react";
import { searchRequest, getVideoDetails } from "../../api/baseApi";
import { Grid } from "@material-ui/core";
import Navbar from "../../components/NavBar/NavBar";
import VideoList from "../../components/VideoList/VideoList";
import "./Result.css";

function Result(props) {
  const inputSearch = props.match.params.inputSearch;
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    window.addEventListener(
      "resize",
      () => {
        setIsMobile(window.innerWidth < 1280);
      },
      false
    );
  }, [isMobile]);

  return (
    <div className="result">
      <Grid container>
        <Grid
          item
          className={isMobile ? " lg-1 md-1 sm-1" : "lg-2 md-2 sm-2"}
          xs={isMobile ? 1 : 2}
        >
          <Navbar />
        </Grid>
        <Grid
          item
          className={isMobile ? " lg-9 md-9 sm-9" : "lg-8 md-8 sm-8"}
          xs={isMobile ? null : 8}
          justify="center"
          style={{ padding: "10px" }}
        >
          <VideoList inputSearch={inputSearch} />
        </Grid>
      </Grid>
    </div>
  );
}

export default memo(Result);
