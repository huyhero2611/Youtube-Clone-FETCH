import React, { useEffect, useState } from "react";
import VideoDetails from "../VideoDetails/VideoDetails";
import { Grid, Paper } from "@material-ui/core";
import "./VideoList.css";

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
      <VideoDetails
        viewCount={res.statistics.viewCount}
        title={res.snippet.title}
        image={res.snippet.thumbnails.medium.url}
        description={res.snippet.description}
        publishedAt={res.snippet.publishedAt}
        channelTitle={res.snippet.channelTitle}
        videoId={res.id}
      />
    );
  });

  return <div className="videolist">{listVideo}</div>;
}

export default VideoList;
