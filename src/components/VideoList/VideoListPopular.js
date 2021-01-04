import React, { useEffect, useState } from "react";
import VideoDetails from "../VideoDetails/VideoDetails";
import "./VideoList.css";
import {
  getMostPopularVideos,
  SearchRequest,
  GetChannel,
  getVideoDetails,
  GetRelatedToVideo,
} from "../../api/baseApi";

function VideoList(props) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    if (window.location.pathname.includes("result")) {
      SearchRequest(props.inputSearch).then(async (res) => {
        new Promise(async (resolutionFunc, rejectionFunc) => {
          for (let data of res) {
            const channelId = data.snippet.channelId;
            const videoId = data.id.videoId;
            const video = await getVideoDetails(videoId);
            data.viewCount = video[0].statistics.viewCount;
            const channel = await GetChannel(channelId);
            data.channelImage =
              channel.data.items[0].snippet.thumbnails.default.url;
            data.id = data.id.videoId;
          }
          resolutionFunc(res);
        }).then((data) => {
          if (mounted) {
            setLoading(false);
          }
          setData(data);
        });
      });
    } else if (window.location.pathname.includes("watch")) {
      console.log("get", GetRelatedToVideo(props.videoId));
      GetRelatedToVideo(props.videoId).then((res) => {
        console.log("res", res);
        new Promise(async (resolutionFunc, rejectionFunc) => {
          let array = [];
          for (let i = 0; i < res.length; i++) {
            if (res[i].snippet == undefined) {
              res.splice(res.indexOf(res[i]), 1);
              i--;
            } else {
              const channelId = res[i].snippet.channelId;
              const videoId = res[i].id.videoId;
              const video = await getVideoDetails(videoId);
              res[i].viewCount = video[0].statistics.viewCount;
              const channel = await GetChannel(channelId);
              res[i].channelImage =
                channel.data.items[0].snippet.thumbnails.default.url;
              res[i].id = res[i].id.videoId;
            }
          }
          resolutionFunc(res);
        }).then((data) => {
          if (mounted) {
            setLoading(false);
          }
          console.log("data", data);
          setData(data);
        });
      });
    } else {
      getMostPopularVideos().then(async (res) => {
        new Promise(async (resolutionFunc, rejectionFunc) => {
          for (let data of res) {
            const channelId = data.snippet.channelId;
            const videoId = data.id;
            const video = await getVideoDetails(videoId);
            data.viewCount = video[0].statistics.viewCount;
            const channel = await GetChannel(channelId);
            data.channelImage =
              channel.data.items[0].snippet.thumbnails.default.url;
          }
          resolutionFunc(res);
        }).then((data) => {
          if (mounted) {
            setLoading(false);
          }
          setData(data);
        });
      });
    }

    return function cleanup() {
      mounted = false;
    };
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
        videoId={res.id}
        channelImage={res.channelImage}
      />
    );
  });

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div
          className={
            window.location.pathname.includes("result")
              ? "videolist__result"
              : window.location.pathname.includes("watch")
              ? "videolist__watch"
              : "videolist"
          }
        >
          {listVideo}
        </div>
      )}
    </div>
  );
}

export default VideoList;
