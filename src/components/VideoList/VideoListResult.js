import React, { useState, useEffect } from "react";
import "./VideoList.css";
import {
  SkeletonResult,
  SkeletonResultLoading,
} from "../../components/Skeleton/SkeletonResult";
import InfiniteScroll from "react-infinite-scroll-component";
import VideoDetails from "../VideoDetails/VideoDetails";
import {
  getAPI,
  APP_KEY,
  getVideoDetails,
  getChannel,
} from "../../services/network";
function VideoListResult(props) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [nextPageToken, setNextPageToken] = useState("");

  useEffect(() => {
    getAPI("search", {
      params: {
        part: "snippet",
        maxResults: 5,
        q: props.inputSearch,
        key: APP_KEY,
      },
    }).then(async (res) => {
      setNextPageToken(res.nextPageToken);
      new Promise(async (resolutionFunc, rejectionFunc) => {
        for (let data of res.items) {
          // console.log("data", data);
          const channelId = data.snippet.channelId;
          let videoId;
          if (data.id.videoId !== undefined) {
            videoId = data.id.videoId;
            const video = await getVideoDetails(videoId);
            if (video[0].liveStreamingDetails !== undefined) {
              data.viewLiveCount =
                video[0].liveStreamingDetails.concurrentViewers;
            } else {
              data.viewLiveCount = -1;
            }
            data.duration = video[0].contentDetails.duration;
            data.viewCount = video[0].statistics.viewCount;
          } else {
            data.isChannel = true;
          }
          const channel = await getChannel(channelId);
          data.subChannel = channel[0].statistics.subscriberCount;
          data.videoCountChannel = channel[0].statistics.videoCount;
          data.channelImage = channel[0].snippet.thumbnails.default.url;
          data.id = data.id.videoId;
        }
        resolutionFunc(res.items);
      }).then((data) => {
        setLoading(false);
        setData(data);
      });
    });
  }, [window.location.pathname]);

  function nextPage() {
    getAPI("search", {
      params: {
        part: "snippet",
        maxResults: 5,
        q: props.inputSearch,
        pageToken: nextPageToken,
        key: APP_KEY,
      },
    }).then(async (res) => {
      // console.log("more", res);
      setNextPageToken(res.nextPageToken);
      new Promise(async (resolution, rejection) => {
        for (let data of res.items) {
          const channelId = data.snippet.channelId;
          let videoId;
          if (data.id.videoId !== undefined) {
            videoId = data.id.videoId;
            const video = await getVideoDetails(videoId);
            if (video[0].liveStreamingDetails !== undefined) {
              data.viewLiveCount =
                video[0].liveStreamingDetails.concurrentViewers;
            } else {
              data.viewLiveCount = -1;
            }
            data.duration = video[0].contentDetails.duration;
            data.viewCount = video[0].statistics.viewCount;
          } else {
            data.isChannel = true;
          }
          const channel = await getChannel(channelId);
          data.subChannel = channel[0].statistics.subscriberCount;
          data.videoCountChannel = channel[0].statistics.videoCount;
          data.channelImage = channel[0].snippet.thumbnails.default.url;
          data.id = data.id.videoId;
        }
        resolution(res.items);
      }).then((data1) => {
        setLoading(false);
        setData([...data, ...data1]);
      });
    });
  }

  return (
    <div>
      {loading ? (
        <SkeletonResult />
      ) : (
        <InfiniteScroll
          dataLength={data.length}
          next={() => nextPage()}
          hasMore={true}
          loader={<SkeletonResultLoading />}
        >
          <div className="videolist__result">
            {data.map((res) => {
              return (
                <VideoDetails
                  duration={res.duration}
                  viewCount={res.viewCount}
                  title={res.snippet.title}
                  image={res.snippet.thumbnails.medium.url}
                  description={res.snippet.description}
                  publishedAt={res.snippet.publishedAt}
                  channelTitle={res.snippet.channelTitle}
                  channelImage={res.channelImage}
                  liveBroadcastContent={res.snippet.liveBroadcastContent}
                  viewLiveCount={res.viewLiveCount}
                  channelId={res.snippet.channelId}
                  isChannel={res.isChannel}
                  subChannel={res.subChannel}
                  videoCountChannel={res.videoCountChannel}
                  videoId={res.id}
                />
              );
            })}
          </div>
        </InfiniteScroll>
      )}
    </div>
  );
}

export default VideoListResult;
