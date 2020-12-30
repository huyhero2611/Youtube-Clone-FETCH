import axios from "axios";

const APP_KEY = "AIzaSyBvW9hL8LcRCGyTYUuLykpdjp064Vou0OY";
/*
APP KEY
huyhero2611     AIzaSyBvW9hL8LcRCGyTYUuLykpdjp064Vou0OY
huynh26112000       AIzaSyB39Fa8R-tMxxsbfwHf0C7Hkc0xfyOwkiY
18020644      AIzaSyDXces1UrddBMx7vReLTI3l7I709hzH5Ks
*/
// AXIOS INSTANCE
export const YouTubeAPI = axios.create({
  baseURL: "https://www.googleapis.com/youtube/v3",
});

//  FETCH MOST POPULAR VIDEOS
export const getMostPopularVideos = async () => {
  const result = await YouTubeAPI.get("videos", {
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
export const getVideoDetails = async (videoId) => {
  const result = await YouTubeAPI.get("videos", {
    params: {
      part: "snippet, statistics",
      id: videoId,
      key: APP_KEY,
    },
  }).then(({ data }) => data.items);
  return result;
};

// SEARCH
export const SearchRequest = async (inputSearch) => {
  const result = await YouTubeAPI.get("search", {
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
export const GetChannel = async (channelId) => {
  const result = await YouTubeAPI.get("channels", {
    params: {
      part: "snippet, statistics",
      id: channelId,
      key: APP_KEY,
    },
  }).then(({ data }) => data.items);
  return result;
};
