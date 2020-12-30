import React, { useEffect, useState } from "react";
import VideoDetails from "../VideoDetails/VideoDetails";
import "./VideoList.css";
import {
  getMostPopularVideos,
  getVideoDetails,
  SearchRequest,
} from "../../api/baseApi";

function VideoList(props) {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (window.location.pathname.includes("result")) {
      console.log("input search", props.inputSearch);
      SearchRequest(props.inputSearch).then((res) => {
        setData(res);
      });
    } else {
      getMostPopularVideos().then((res) => {
        setData(res);
      });
    }
  }, []);
  let listVideo = data.map((res) => {
    return (
      <VideoDetails
        // viewCount={res.statistics.viewCount}
        title={res.snippet.title}
        image={res.snippet.thumbnails.medium.url}
        imageLarge={`https://i.ytimg.com/vi/${res.id}/maxresdefault.jpg`}
        description={res.snippet.description}
        publishedAt={res.snippet.publishedAt}
        channelTitle={res.snippet.channelTitle}
        channelId={res.snippet.channelId}
        videoId={res.id}
      />
    );
  });

  return (
    <div
      className={
        window.location.pathname.includes("result")
          ? "videolist__result"
          : "videolist"
      }
    >
      {listVideo}
    </div>
  );
}

export default VideoList;
