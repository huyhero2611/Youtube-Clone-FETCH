import React, { useState } from "react";
import PlayVideo from "../../components/PlayVideo/PlayVideo";
import { Grid } from "@material-ui/core";
import VideoListPopular from "../../components/VideoList/VideoListPopular";
import VideoPlayer from "react-player";
import "./Watch.css";
function Watch(props) {
  const videoId = props.match.params.videoId;
  const videoImg = props.location.data.videoImage;

  const [data, setData] = useState([]);
  return (
    <div className="watch">
      <Grid item className="lg-9 md-9 sm-9 watch__video" xs={9}>
        <VideoPlayer
          style={{ paddingLeft: "70px" }}
          width="1280px"
          height="720px"
          controls
          playing="true"
          url={`https://www.youtube.com/watch?v=${videoId}`}
        ></VideoPlayer>
        {/* <video
            controls
            width="1280px"
            height="720px"
            poster={videoImg}
            autoPlay="true"
            dataReactid=".0.1.1.0.0"
          >
            <source
              src={`https://www.youtube.com/watch?v=${videoId}`}
              type="video/mp4"
            />
          </video> */}
      </Grid>
      <Grid
        item
        className="lg-3 md-3 sm-3 watch__videos"
        xs={3}
        justify="center"
      >
        <div className="watch__videos--next">
          <p style={{}}>Tiếp theo</p>
        </div>
        <div className="watch__videos--list">
          <VideoListPopular videoId={videoId} />
        </div>
      </Grid>
    </div>
  );
}

export default Watch;
