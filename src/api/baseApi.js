import axios from "axios";

const APP_KEY = "AIzaSyB39Fa8R-tMxxsbfwHf0C7Hkc0xfyOwkiY";
/*
APP KEY
huyhero2611     AIzaSyBvW9hL8LcRCGyTYUuLykpdjp064Vou0OY
huynh26112000       AIzaSyB39Fa8R-tMxxsbfwHf0C7Hkc0xfyOwkiY
18020644      AIzaSyDXces1UrddBMx7vReLTI3l7I709hzH5Ks
AIzaSyAe5StmTvlOGpufcLsRMcAM0sC2RexewgA
AIzaSyCp8W6kiBN4RtLPOtw1zn_XNfcApeF5zu8
AIzaSyAVACMSBQlsiECbg0LGwmh3XXsZLK7I7SY
*/
// AXIOS INSTANCE
export const YouTubeAPI = axios.create({
  baseURL: "https://www.googleapis.com/youtube/v3",
});

//  FETCH MOST POPULAR VIDEOS
export const getMostPopularVideos = () => {
  const result = YouTubeAPI.get("videos", {
    params: {
      part: "snippet,statistics",
      maxResults: 24,
      chart: "mostPopular",
      key: APP_KEY,
    },
  }).then(({ data }) => data.items);

  return result;
};

// GET VIDEO
export const getVideoDetails = (videoId) => {
  const result = YouTubeAPI.get("videos", {
    params: {
      part: "snippet, statistics, liveStreamingDetails",
      id: videoId,
      key: APP_KEY,
    },
  }).then(({ data }) => data.items);
  return result;
};

// SEARCH
export const searchRequest = (inputSearch) => {
  const result = YouTubeAPI.get("search", {
    params:
      // parameter && option
      //   ? {
      //       part: "snippet",
      //       maxResults: 12,
      //       q: id,
      //       key: isKey ? key : process.env.REACT_APP_YOUTUBE_API_KEY,
      //       [parameter]: option,
      //     }
      //   : {
      //       part: "snippet",
      //       maxResults: 12,
      //       q: id,
      //       key: isKey ? key : process.env.REACT_APP_YOUTUBE_API_KEY,
      //     },
      {
        part: "snippet",
        maxResults: 20,
        q: inputSearch,
        key: APP_KEY,
      },
  }).then(({ data }) => data.items);
  return result;
};

// GET CHANNEL
export const getChannel = (channelId) => {
  const result = YouTubeAPI.get("channels", {
    params: {
      part: "snippet, statistics",
      id: channelId,
      key: APP_KEY,
    },
  });
  return result;
};

//RELATED TO VIDEO WATCHING
export const getRelatedToVideo = (videoId) => {
  const result = YouTubeAPI.get("search", {
    params: {
      part: "snippet",
      maxResults: 20,
      relatedToVideoId: videoId,
      type: "video",
      key: APP_KEY,
    },
  }).then((data) => data.data.items);
  return result;
};

//EXPORT LIST COMMENTS OF VIDEO BY VIDEOID
export const getListComments = (videoId) => {
  const result = YouTubeAPI.get("commentThreads", {
    params: {
      part: "snippet",
      videoId: videoId,
      maxResults: 50,
      key: APP_KEY,
    },
  }).then((data) => data.data.items);
  return result;
};

export const getChatLive = (chatId) => {
  const result = YouTubeAPI.get("liveChat/messages", {
    params: {
      part: "snippet, authorDetails",
      liveChatId: chatId,
      key: APP_KEY,
    },
  }).then((data) => data.data.items);
  return result;
};
