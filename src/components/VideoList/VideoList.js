import React, { useEffect, useState } from "react";
import VideoDetails from "../VideoDetails/VideoDetails";
import "./VideoList.css";
import Loading from "../../assets/loading7.gif";
import LoadingHome from "../../assets/loading-home.png";
import LoadingWatch from "../../assets/test-loading.png";
import {
  getMostPopularVideos,
  searchRequest,
  getChannel,
  getVideoDetails,
  getRelatedToVideo,
} from "../../api/baseApi";

function VideoList(props) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    if (window.location.pathname.includes("result")) {
      searchRequest(props.inputSearch).then(async (res) => {
        new Promise(async (resolutionFunc, rejectionFunc) => {
          for (let data of res) {
            const channelId = data.snippet.channelId;
            const videoId = data.id.videoId;
            const video = await getVideoDetails(videoId);
            // console.log("video", video);
            if (video[0].liveStreamingDetails !== undefined) {
              data.viewLiveCount =
                video[0].liveStreamingDetails.concurrentViewers;
              // console.log("ok");
            } else {
              data.viewLiveCount = -1;
            }
            data.duration = video[0].contentDetails.duration;
            data.viewCount = video[0].statistics.viewCount;
            const channel = await getChannel(channelId);
            data.channelImage =
              channel.data.items[0].snippet.thumbnails.default.url;
            data.id = data.id.videoId;
          }
          // console.log("show", res);
          resolutionFunc(res);
        }).then((data) => {
          if (mounted) {
            setLoading(false);
          }
          setData(data);
        });
      });
    } else if (window.location.pathname.includes("watch")) {
      getRelatedToVideo(props.videoId).then((res) => {
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
              res[i].duration = video[0].contentDetails.duration;
              res[i].viewCount = video[0].statistics.viewCount;
              const channel = await getChannel(channelId);
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
          setData(data);
        });
      });
    } else {
      getMostPopularVideos().then(async (res) => {
        new Promise(async (resolutionFunc, rejectionFunc) => {
          for (let data of res) {
            data.duration = data.contentDetails.duration;
            const channelId = data.snippet.channelId;
            const videoId = data.id;
            const video = await getVideoDetails(videoId);
            data.viewCount = video[0].statistics.viewCount;
            const channel = await getChannel(channelId);
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
        duration={res.duration}
        viewCount={res.viewCount}
        title={res.snippet.title}
        image={res.snippet.thumbnails.medium.url}
        // imageLarge={`https://i.ytimg.com/vi/${res.id}/maxresdefault.jpg`}
        description={res.snippet.description}
        publishedAt={res.snippet.publishedAt}
        channelTitle={res.snippet.channelTitle}
        videoId={res.id}
        channelImage={res.channelImage}
        liveBroadcastContent={res.snippet.liveBroadcastContent}
        viewLiveCount={res.viewLiveCount}
      />
    );
  });

  return (
    <div>
      {loading ? (
        <>
          {window.location.pathname.includes("watch") ? (
            <img
              style={{
                position: "relative",
                top: "100%",
              }}
              src={LoadingWatch}
            />
          ) : window.location.pathname.includes("result") ? (
            <img
              style={{
                position: "relative",
                left: "550px",
                top: "350px",
                width: "300px",
              }}
              src={Loading}
            />
          ) : (
            <img
              style={{ position: "relative", top: "3%", left: "-2%" }}
              src={LoadingHome}
            />
          )}
        </>
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
