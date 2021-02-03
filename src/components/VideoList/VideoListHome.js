import React, { useEffect, useState } from "react";
import "./VideoList.css";
import {
  getAPI,
  APP_KEY,
  getVideoDetails,
  getChannel,
} from "../../services/network";
import { SkeletonHome, SkeletonHomeLoading } from "../Skeleton/SkeletonHome";
import InfiniteScroll from "react-infinite-scroll-component";
import VideoDetails from "../VideoDetails/VideoDetails";

function VideoListHome(props) {
  const [nextPageToken, setNextPageToken] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAPI("videos", {
      params: {
        part: "snippet,statistics, contentDetails",
        maxResults: 12,
        chart: "mostPopular",
        key: APP_KEY,
      },
    }).then(async (res) => {
      setNextPageToken(res.nextPageToken);
      new Promise(async (resolutionFunc, rejectionFunc) => {
        for (let data of res.items) {
          data.duration = data.contentDetails.duration;
          const channelId = data.snippet.channelId;
          const videoId = data.id;
          const video = await getVideoDetails(videoId);
          data.viewCount = video[0].statistics.viewCount;
          const channel = await getChannel(channelId);
          data.channelImage = channel[0].snippet.thumbnails.default.url;
        }
        resolutionFunc(res.items);
      }).then((data) => {
        setLoading(false);

        setData(data);
      });
    });
  }, []);

  function nextPage() {
    console.log("ok");
    getAPI("videos", {
      params: {
        part: "snippet,statistics, contentDetails",
        maxResults: 8,
        chart: "mostPopular",
        pageToken: nextPageToken,
        key: APP_KEY,
      },
    }).then((res) => {
      setNextPageToken(res.nextPageToken);
      new Promise(async (resolutionFunc, rejectionFunc) => {
        for (let data of res.items) {
          data.duration = data.contentDetails.duration;
          const channelId = data.snippet.channelId;
          const videoId = data.id;
          const video = await getVideoDetails(videoId);
          data.viewCount = video[0].statistics.viewCount;
          const channel = await getChannel(channelId);
          data.channelImage = channel[0].snippet.thumbnails.default.url;
        }
        resolutionFunc(res.items);
      }).then((subdata) => {
        setData([...data, ...subdata]);
      });
    });
  }

  return (
    <div>
      {loading ? (
        <SkeletonHome />
      ) : (
        <InfiniteScroll
          dataLength={data.length}
          next={() => nextPage()}
          hasMore={true}
          loader={<SkeletonHomeLoading />}
        >
          <div className="videolist">
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

export default VideoListHome;
