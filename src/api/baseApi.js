import axios from "axios";

export default axios.create({
  baseURL: "https://youtube.googleapis.com/youtube/v3",
  params: {
    part: "snippet",
    maxResult: 5,
    key: "AIzaSyBvW9hL8LcRCGyTYUuLykpdjp064Vou0OY",
  },
});
