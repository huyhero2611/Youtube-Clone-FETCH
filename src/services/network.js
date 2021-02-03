import Axios from "axios";

export const APP_KEY = "AIzaSyBvW9hL8LcRCGyTYUuLykpdjp064Vou0OY";
/*
APP KEY
AIzaSyBvW9hL8LcRCGyTYUuLykpdjp064Vou0OY
AIzaSyDXces1UrddBMx7vReLTI3l7I709hzH5Ks
AIzaSyAe5StmTvlOGpufcLsRMcAM0sC2RexewgA
AIzaSyCp8W6kiBN4RtLPOtw1zn_XNfcApeF5zu8
AIzaSyAVACMSBQlsiECbg0LGwmh3XXsZLK7I7SY
AIzaSyArga-Cyq0TvXLfiuQP5U4_ot7PKPpVwhM
*/

export const YouTubeAPI = Axios.create({
  baseURL: "https://www.googleapis.com/youtube/v3",
});

export const getAPI = (url, params) => {
  return YouTubeAPI.get(url, params)
    .then((res) => res.data)
    .catch((error) => {
      console.log("ERROR GET =======>", error.message);
    });
};

//use more
export const getVideoDetails = (videoId) => {
  return YouTubeAPI.get("videos", {
    params: {
      part: "snippet, statistics, contentDetails, liveStreamingDetails",
      id: videoId,
      key: APP_KEY,
    },
  })
    .then((res) => res.data.items)
    .catch((error) => {
      console.log("ERROR GETVIDEODETAILS====>", error.message);
    });
};

export const getChannel = (channelId) => {
  return YouTubeAPI.get("channels", {
    params: {
      part: "snippet, statistics, brandingSettings",
      id: channelId,
      key: APP_KEY,
    },
  }).then((res) => res.data.items);
};
