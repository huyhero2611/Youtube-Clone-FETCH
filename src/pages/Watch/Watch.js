import React, { useState } from "react";
import PlayVideo from "../../components/PlayVideo/PlayVideo";
import { Grid } from "@material-ui/core";
import VideoList from "../../components/VideoList/VideoListPopular";

function Watch(props) {
  const videoId = props.match.params.videoId;
  const videoImg = props.location.data.videoImage;

  const [data, setData] = useState([]);
  return (
    <div className="watch">
      <Grid container>
        <Grid item className="lg-8 md-8 sm-8 watch__video" xs={8}>
          <PlayVideo videoId={videoId} videoImg={videoImg} />
        </Grid>
        {/* <Grid
          item
          className="lg-4 md-4 sm-4 watch__list"
          xs={4}
          justify="center"
        >
          <VideoList watchData={data} />
        </Grid> */}
      </Grid>
    </div>
  );
}

export default Watch;
