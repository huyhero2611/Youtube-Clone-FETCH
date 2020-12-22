// import axios from "axios";

// export default axios.create({
//   baseURL: "https://youtube.googleapis.com/youtube/v3",
//   params: {
//     part: "snippet",
//     maxResult: 5,
//     key: "AIzaSyBvW9hL8LcRCGyTYUuLykpdjp064Vou0OY",
//   },
// });

import axios from "axios";

// AXIOS INSTANCE
export const YouTubeAPI = axios.create({
  baseURL: "https://www.googleapis.com/youtube/v3",
});

//  FETCH MOST POPULAR VIDEOS
export const getMostPopularVideos = async () => {
  const result = await YouTubeAPI.get("videos", {
    params: {
      part: "snippet,statistics,contentDetails",
      maxResults: 28,
      chart: "mostPopular",
      key: "AIzaSyBvW9hL8LcRCGyTYUuLykpdjp064Vou0OY",
    },
  }).then(({ data }) => data);

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
        maxResults: 12,
        q: inputSearch,
        key: "AIzaSyBvW9hL8LcRCGyTYUuLykpdjp064Vou0OY",
      },
  }).then(({ data }) => data.items);
  return result;
};
