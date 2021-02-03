import axios from "axios";

export const APP_KEY = "AIzaSyB39Fa8R-tMxxsbfwHf0C7Hkc0xfyOwkiY";
/*
APP KEY
AIzaSyBvW9hL8LcRCGyTYUuLykpdjp064Vou0OY
AIzaSyDXces1UrddBMx7vReLTI3l7I709hzH5Ks
AIzaSyAe5StmTvlOGpufcLsRMcAM0sC2RexewgA
AIzaSyCp8W6kiBN4RtLPOtw1zn_XNfcApeF5zu8
AIzaSyAVACMSBQlsiECbg0LGwmh3XXsZLK7I7SY
AIzaSyArga-Cyq0TvXLfiuQP5U4_ot7PKPpVwhM
*/

// switch api key
// AIzaSyB39Fa8R-tMxxsbfwHf0C7Hkc0xfyOwkiY

// AXIOS INSTANCE
export const YouTubeAPI = axios.create({
  baseURL: "https://www.googleapis.com/youtube/v3",
});

export const domain = "https://www.googleapis.com/youtube/v3";

//  FETCH MOST POPULAR VIDEOS
// export const getMostPopularVideos = () => {
//   const result = YouTubeAPI.get("videos", {
//     params: {
//       part: "snippet,statistics, contentDetails",
//       maxResults: 12,
//       chart: "mostPopular",
//       key: APP_KEY,
//     },
//   }).then((data) => data.data);

//   // console.log("most", result);
//   return result;
// };

// export const getMoreMostPopularVideos = (pageToken) => {
//   const result = YouTubeAPI.get("videos", {
//     params: {
//       part: "snippet,statistics, contentDetails",
//       maxResults: 8,
//       chart: "mostPopular",
//       pageToken: pageToken,
//       key: APP_KEY,
//     },
//   }).then((data) => data.data);
//   return result;
// };

// GET VIDEO
export const getVideoDetails = (videoId) => {
  const result = YouTubeAPI.get("videos", {
    params: {
      part: "snippet, statistics, contentDetails, liveStreamingDetails",
      id: videoId,
      key: APP_KEY,
    },
  }).then(({ data }) => data.items);
  return result;
};

// SEARCH
// export const searchRequest = (inputSearch) => {
//   const result = YouTubeAPI.get("search", {
//     params: {
//       part: "snippet",
//       maxResults: 5,
//       q: inputSearch,
//       key: APP_KEY,
//     },
//   }).then(({ data }) => data);
//   console.log("result", result);
//   return result;
// };

export const searchMoreRequest = (inputSearch, nextPage) => {
  const result = YouTubeAPI.get("search", {
    params: {
      part: "snippet",
      maxResults: 5,
      q: inputSearch,
      pageToken: nextPage,
      key: APP_KEY,
    },
  }).then(({ data }) => data);
  return result;
};

// GET CHANNEL
// export const getChannel = (channelId) => {
//   const result = YouTubeAPI.get("channels", {
//     params: {
//       part: "snippet, statistics, brandingSettings",
//       id: channelId,
//       key: APP_KEY,
//     },
//   }).then((data) => data.data.items);
//   return result;
// };

//RELATED TO VIDEO WATCHING
// export const getRelatedToVideo = (videoId) => {
//   const result = YouTubeAPI.get("search", {
//     params: {
//       part: "snippet",
//       maxResults: 10,
//       relatedToVideoId: videoId,
//       type: "video",
//       key: APP_KEY,
//     },
//   }).then((data) => data.data.items);
//   return result;
// };

//EXPORT LIST COMMENTS OF VIDEO BY VIDEOID
// export const getListComments = (videoId) => {
//   const result = YouTubeAPI.get("commentThreads", {
//     params: {
//       part: "snippet",
//       videoId: videoId,
//       maxResults: 5,
//       key: APP_KEY,
//     },
//   }).then((data) => data.data);
//   return result;
// };

export const getMoreListComments = (videoId, nextPage) => {
  const result = YouTubeAPI.get("commentThreads", {
    params: {
      part: "snippet",
      pageToken: nextPage,
      videoId: videoId,
      maxResults: 5,
      key: APP_KEY,
    },
  }).then((data) => data.data);
  return result;
};

// GET INFO OF LIVE STREAM
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

// GET PLAYLIST
// export const getPlaylists = (channelId) => {
//   const result = YouTubeAPI.get("playlists", {
//     params: {
//       part: "snippet, contentDetails",
//       channelId: channelId,
//       maxResults: 50,
//       key: APP_KEY,
//     },
//   }).then((data) => data.data.items);
//   return result;
// };

// GET PLAYLIST ITEMS
export const getPlaylistItems = (playlistId) => {
  const result = YouTubeAPI.get("playlistItems", {
    params: {
      part: "snippet",
      maxResults: 10,
      playlistId: playlistId,
      key: APP_KEY,
    },
  }).then((data) => data.data);
  return result;
};

export const getMorePlaylistItems = (playlistId, nextPage) => {
  const result = YouTubeAPI.get("playlistItems", {
    params: {
      part: "snippet",
      maxResults: 10,
      pageToken: nextPage,
      playlistId: playlistId,
      key: APP_KEY,
    },
  }).then((data) => data.data);
  return result;
};
// GET VIDEO OF CHANNEL
// export const getVideosChannel = (channelId) => {
//   const result = YouTubeAPI.get("search", {
//     params: {
//       part: "snippet",
//       maxResults: 14,
//       channelId: channelId,
//       key: APP_KEY,
//     },
//   }).then((data) => data.data);
//   return result;
// };

export const getMoreVideosChannel = (channelId, nextPage) => {
  const result = YouTubeAPI.get("search", {
    params: {
      part: "snippet",
      maxResults: 12,
      pageToken: nextPage,
      channelId: channelId,
      key: APP_KEY,
    },
  }).then((data) => data.data);
  return result;
};
