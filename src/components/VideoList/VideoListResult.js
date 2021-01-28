import React, { useEffect } from "react";
import "./VideoList.css";
import {
  SkeletonResult,
  SkeletonResultLoading,
} from "../../components/Skeleton/SkeletonResult";
import {
  searchRequest,
  searchMoreRequest,
  getChannel,
  getVideoDetails,
} from "../../api/baseApi";

function VideoListResult(props) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    searchRequest(props.inputSearch).then(async (res) => {
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
      }).then((data) => {
        setLoading(false);
        setData(data);
      });
    });
  }, [window.location.pathname]);

  function nextPage() {
    searchMoreRequest(props.inputSearch).then(async (res) => {
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
      }).then((data) => {
        setLoading(false);
        setData(data);
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
                  // videoId={res.id}
                  channelImage={res.channelImage}
                  liveBroadcastContent={res.snippet.liveBroadcastContent}
                  viewLiveCount={res.viewLiveCount}
                  channelId={res.snippet.channelId}
                  // IF result is Channel
                  isChannel={res.isChannel}
                  subChannel={res.subChannel}
                  videoCountChannel={res.videoCountChannel}
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
