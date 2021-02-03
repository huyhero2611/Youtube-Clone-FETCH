import React, { useEffect, useState } from "react";
import "./VideoList.css";
import { SkeletonWatch, SkeletonWatchLoading } from "../Skeleton/SkeletonWatch";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  getAPI,
  APP_KEY,
  getVideoDetails,
  getChannel,
} from "../../services/network";
import VideoDetails from "../VideoDetails/VideoDetails";

function VideoListWatch(props) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [nextPageToken, setNextPageToken] = useState("");

  // console.log("prop videoID", props.videoId);

  useEffect(() => {
    getAPI("search", {
      params: {
        part: "snippet",
        maxResults: 10,
        relatedToVideoId: props.videoId,
        type: "video",
        key: APP_KEY,
      },
    }).then((res1) => {
      // console.log("res", res1);
      setNextPageToken(res1.nextPageToken);
      new Promise(async (resolutionFunc, rejectionFunc) => {
        let res = res1.items;
        for (let i = 0; i < res.length; i++) {
          if (res[i].snippet === undefined) {
            res.splice(res.indexOf(res[i]), 1);
            i--;
          } else {
            const channelId = res[i].snippet.channelId;
            const videoId = res[i].id.videoId;
            const video = await getVideoDetails(videoId);
            if (video[0].liveStreamingDetails !== undefined) {
              data.viewLiveCount =
                video[0].liveStreamingDetails.concurrentViewers;
            } else {
              data.viewLiveCount = -1;
            }
            data.duration = video[0].contentDetails.duration;
            res[i].duration = video[0].contentDetails.duration;
            res[i].viewCount = video[0].statistics.viewCount;
            const channel = await getChannel(channelId);
            res[i].channelImage = channel[0].snippet.thumbnails.default.url;
            res[i].id = res[i].id.videoId;
          }
        }
        resolutionFunc(res);
      }).then((data) => {
        setLoading(false);

        setData(data);
      });
    });
  }, [window.location.pathname]);

  function nextPage() {
    // console.log("toke", nextPageToken);
    getAPI("search", {
      params: {
        part: "snippet",
        maxResults: 4,
        relatedToVideoId: props.videoId,
        type: "video",
        pageToken: nextPageToken,
        key: APP_KEY,
      },
    }).then((res1) => {
      // console.log("res", res1);
      setNextPageToken(res1.nextPageToken);
      new Promise(async (resolutionFunc, rejectionFunc) => {
        let res = res1.items;
        for (let i = 0; i < res.length; i++) {
          if (res[i].snippet === undefined) {
            res.splice(res.indexOf(res[i]), 1);
            i--;
          } else {
            const channelId = res[i].snippet.channelId;
            const videoId = res[i].id.videoId;
            const video = await getVideoDetails(videoId);
            if (video[0].liveStreamingDetails !== undefined) {
              data.viewLiveCount =
                video[0].liveStreamingDetails.concurrentViewers;
            } else {
              data.viewLiveCount = -1;
            }
            data.duration = video[0].contentDetails.duration;
            res[i].duration = video[0].contentDetails.duration;
            res[i].viewCount = video[0].statistics.viewCount;
            const channel = await getChannel(channelId);
            res[i].channelImage = channel[0].snippet.thumbnails.default.url;
            res[i].id = res[i].id.videoId;
          }
        }
        resolutionFunc(res);
      }).then((data1) => {
        setData([...data, ...data1]);
      });
    });
  }

  return (
    <div>
      {loading ? (
        <SkeletonWatch />
      ) : (
        <InfiniteScroll
          dataLength={data.length}
          next={() => nextPage()}
          hasMore={true}
          loader={<SkeletonWatchLoading />}
        >
          <div className="videolist__watch">
            {data.map((res) => {
              return (
                <VideoDetails
                  videoId={res.id}
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
                />
              );
            })}
          </div>
        </InfiniteScroll>
      )}
    </div>
  );
}

export default VideoListWatch;
