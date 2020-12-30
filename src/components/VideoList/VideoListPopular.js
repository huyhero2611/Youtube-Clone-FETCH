import React, { useEffect, useState } from "react";
import VideoDetails from "../VideoDetails/VideoDetails";
import "./VideoList.css";
import {
  getMostPopularVideos,
  SearchRequest,
  GetChannel,
  getVideoDetails,
} from "../../api/baseApi";

function VideoList(props) {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (window.location.pathname.includes("result")) {
      SearchRequest(props.inputSearch).then(async (res) => {
        new Promise(async (resolutionFunc, rejectionFunc) => {
          for (let data of res) {
            const channelId = data.snippet.channelId;
            const videoId = data.id.videoId;
            // console.log("video id", data.id.videoId);
            const video = await getVideoDetails(videoId);
            // console.log("video", video[0].statistics.viewCount);
            data.viewCount = video[0].statistics.viewCount;
            const channel = await GetChannel(channelId);
            // console.log("channel", channel);
            data.channelImage =
              channel.data.items[0].snippet.thumbnails.default.url;
          }
          resolutionFunc(res);
        }).then((data) => {
          setData(data);
        });
      });
    } else {
      getMostPopularVideos().then(async (res) => {
        new Promise(async (resolutionFunc, rejectionFunc) => {
          for (let data of res) {
            const channelId = data.snippet.channelId;
            // console.log("channelid", data.snippet.channelId);
            const videoId = data.id;
            // console.log("video id", data.id);
            const video = await getVideoDetails(videoId);
            // console.log("video", video[0].statistics.viewCount);
            data.viewCount = video[0].statistics.viewCount;
            const channel = await GetChannel(channelId);
            console.log(
              "channel",
              channel.data.items[0].snippet.thumbnails.default.url
            );
            data.channelImage =
              channel.data.items[0].snippet.thumbnails.default.url;
          }
          resolutionFunc(res);
        }).then((data) => {
          setData(data);
        });
      });
    }
  }, [window.location.pathname]);
  let listVideo = data.map((res) => {
    return (
      <VideoDetails
        viewCount={res.viewCount}
        title={res.snippet.title}
        image={res.snippet.thumbnails.medium.url}
        imageLarge={`https://i.ytimg.com/vi/${res.id}/maxresdefault.jpg`}
        description={res.snippet.description}
        publishedAt={res.snippet.publishedAt}
        channelTitle={res.snippet.channelTitle}
        channelId={res.snippet.channelId}
        videoId={res.id}
        channelImage={res.channelImage}
      />
    );
    // return window.location.pathname.includes("result") ? (
    //   <VideoDetails
    //     viewCount={res.viewCount}
    //     title={res.snippet.title}
    //     image={res.snippet.thumbnails.medium.url}
    //     imageLarge={`https://i.ytimg.com/vi/${res.id}/maxresdefault.jpg`}
    //     description={res.snippet.description}
    //     publishedAt={res.snippet.publishedAt}
    //     channelTitle={res.snippet.channelTitle}
    //     channelId={res.snippet.channelId}
    //     videoId={res.id}
    //     channelImage={res.channelImage}
    //   />
    // ) : (
    //   <VideoDetails
    //     viewCount={res.statistics.viewCount}
    //     title={res.snippet.title}
    //     image={res.snippet.thumbnails.medium.url}
    //     imageLarge={`https://i.ytimg.com/vi/${res.id}/maxresdefault.jpg`}
    //     description={res.snippet.description}
    //     publishedAt={res.snippet.publishedAt}
    //     channelTitle={res.snippet.channelTitle}
    //     channelId={res.snippet.channelId}
    //     videoId={res.id}
    //     channelImage={res.channelImage}
    //   />
    // );
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
