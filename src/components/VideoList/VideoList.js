import React, { useEffect, useState } from "react";
import VideoDetails from "../VideoDetails/VideoDetails";
import { Grid, Paper } from "@material-ui/core";

// test most popular
import { getMostPopularVideos } from "../../api/baseApi";

function VideoList(props) {
  const [data, setData] = useState([]);

  useEffect(() => {
    getMostPopularVideos().then((res) => {
      setData(res);
    });
  }, []);

  let listVideo = data.map((res) => {
    return (
      <Grid item xs={3} className="videolist-item">
        <VideoDetails
          viewCount={res.statistics.viewCount}
          title={res.snippet.title}
          image={res.snippet.thumbnails.medium.url}
          description={res.snippet.description}
          publishedAt={res.snippet.publishedAt}
        />
      </Grid>
    );
  });

  return (
    <Grid container spacing={3}>
      {listVideo}
    </Grid>
  );
}

export default VideoList;
