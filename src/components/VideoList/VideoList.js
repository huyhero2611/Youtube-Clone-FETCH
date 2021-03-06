// import React, { useEffect, useState, memo } from "react";
// import VideoDetails from "../VideoDetails/VideoDetails";
// import { FilterList } from "@material-ui/icons";
// import "./VideoList.css";
// import {
//   getMostPopularVideos,
//   searchRequest,
//   getChannel,
//   getVideoDetails,
//   getRelatedToVideo,
//   baseAPI,
//   YouTubeAPI,
//   APP_KEY,
// } from "../../api/baseApi";
// //Skeleton
// import {
//   SkeletonHome,
//   SkeletonHomeLoading,
// } from "../../components/Skeleton/SkeletonHome";
// import {
//   SkeletonResult,
//   SkeletonResultLoading,
// } from "../../components/Skeleton/SkeletonResult";
// import {
//   SkeletonWatch,
//   SkeletonWatchLoading,
// } from "../../components/Skeleton/SkeletonWatch";
// //Scroll loading
// import InfiniteScroll from "react-infinite-scroll-component";

// function VideoList(props) {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [nextPageToken, setNextPageToken] = useState("");

//   useEffect(() => {
//     let mounted = true;
//     if (window.location.pathname.includes("result")) {
//       YouTubeAPI.get("search", {
//         params: {
//           part: "snippet",
//           maxResults: 5,
//           q: props.inputSearch,
//           key: APP_KEY,
//         },
//       }).then(async (res) => {
//         setNextPageToken(res.data.nextPageToken);
//         new Promise(async (resolutionFunc, rejectionFunc) => {
//           for (let data of res.data.items) {
//             const channelId = data.snippet.channelId;
//             let videoId;
//             if (data.id.videoId !== undefined) {
//               videoId = data.id.videoId;
//               const video = await getVideoDetails(videoId);
//               if (video[0].liveStreamingDetails !== undefined) {
//                 data.viewLiveCount =
//                   video[0].liveStreamingDetails.concurrentViewers;
//               } else {
//                 data.viewLiveCount = -1;
//               }
//               data.duration = video[0].contentDetails.duration;
//               data.viewCount = video[0].statistics.viewCount;
//             } else {
//               data.isChannel = true;
//             }
//             const channel = await getChannel(channelId);
//             data.subChannel = channel[0].statistics.subscriberCount;
//             data.videoCountChannel = channel[0].statistics.videoCount;
//             data.channelImage = channel[0].snippet.thumbnails.default.url;
//             data.id = data.id.videoId;
//           }
//           resolutionFunc(res.data.items);
//         }).then((data) => {
//           if (mounted) {
//             setLoading(false);
//           }
//           setData(data);
//         });
//       });
//       // searchRequest(props.inputSearch).then(async (res) => {
//       //   setNextPageToken(res.nextPageToken);
//       //   new Promise(async (resolutionFunc, rejectionFunc) => {
//       //     for (let data of res.items) {
//       //       const channelId = data.snippet.channelId;
//       //       let videoId;
//       //       if (data.id.videoId !== undefined) {
//       //         videoId = data.id.videoId;
//       //         const video = await getVideoDetails(videoId);
//       //         if (video[0].liveStreamingDetails !== undefined) {
//       //           data.viewLiveCount =
//       //             video[0].liveStreamingDetails.concurrentViewers;
//       //         } else {
//       //           data.viewLiveCount = -1;
//       //         }
//       //         data.duration = video[0].contentDetails.duration;
//       //         data.viewCount = video[0].statistics.viewCount;
//       //       } else {
//       //         data.isChannel = true;
//       //       }
//       //       const channel = await getChannel(channelId);
//       //       data.subChannel = channel[0].statistics.subscriberCount;
//       //       data.videoCountChannel = channel[0].statistics.videoCount;
//       //       data.channelImage = channel[0].snippet.thumbnails.default.url;
//       //       data.id = data.id.videoId;
//       //     }
//       //     resolutionFunc(res.items);
//       //   }).then((data) => {
//       //     if (mounted) {
//       //       setLoading(false);
//       //     }
//       //     setData(data);
//       //   });
//       // });
//     } else if (window.location.pathname.includes("watch")) {
//       YouTubeAPI.get("search", {
//         params: {
//           part: "snippet",
//           maxResults: 10,
//           relatedToVideoId: props.videoId,
//           type: "video",
//           key: APP_KEY,
//         },
//       }).then((res1) => {
//         new Promise(async (resolutionFunc, rejectionFunc) => {
//           let res = res1.data.items;
//           for (let i = 0; i < res.length; i++) {
//             if (res[i].snippet === undefined) {
//               res.splice(res.indexOf(res[i]), 1);
//               i--;
//             } else {
//               const channelId = res[i].snippet.channelId;
//               const videoId = res[i].id.videoId;
//               const video = await getVideoDetails(videoId);
//               if (video[0].liveStreamingDetails !== undefined) {
//                 data.viewLiveCount =
//                   video[0].liveStreamingDetails.concurrentViewers;
//               } else {
//                 data.viewLiveCount = -1;
//               }
//               data.duration = video[0].contentDetails.duration;
//               res[i].duration = video[0].contentDetails.duration;
//               res[i].viewCount = video[0].statistics.viewCount;
//               const channel = await getChannel(channelId);
//               res[i].channelImage = channel[0].snippet.thumbnails.default.url;
//               res[i].id = res[i].id.videoId;
//             }
//           }
//           resolutionFunc(res);
//         }).then((data) => {
//           if (mounted) {
//             setLoading(false);
//           }
//           setData(data);
//         });
//       });
//       // getRelatedToVideo(props.videoId).then((res) => {
//       //   new Promise(async (resolutionFunc, rejectionFunc) => {
//       //     let array = [];
//       //     for (let i = 0; i < res.length; i++) {
//       //       if (res[i].snippet === undefined) {
//       //         res.splice(res.indexOf(res[i]), 1);
//       //         i--;
//       //       } else {
//       //         const channelId = res[i].snippet.channelId;
//       //         const videoId = res[i].id.videoId;
//       //         const video = await getVideoDetails(videoId);
//       //         if (video[0].liveStreamingDetails !== undefined) {
//       //           data.viewLiveCount =
//       //             video[0].liveStreamingDetails.concurrentViewers;
//       //         } else {
//       //           data.viewLiveCount = -1;
//       //         }
//       //         data.duration = video[0].contentDetails.duration;
//       //         res[i].duration = video[0].contentDetails.duration;
//       //         res[i].viewCount = video[0].statistics.viewCount;
//       //         const channel = await getChannel(channelId);
//       //         res[i].channelImage = channel[0].snippet.thumbnails.default.url;
//       //         res[i].id = res[i].id.videoId;
//       //       }
//       //     }
//       //     resolutionFunc(res);
//       //   }).then((data) => {
//       //     if (mounted) {
//       //       setLoading(false);
//       //     }
//       //     setData(data);
//       //   });
//       // });
//     } else {
//       YouTubeAPI.get("videos", {
//         params: {
//           part: "snippet,statistics, contentDetails",
//           maxResults: 12,
//           chart: "mostPopular",
//           key: APP_KEY,
//         },
//       }).then(async (res) => {
//         setNextPageToken(res.data.nextPageToken);
//         new Promise(async (resolutionFunc, rejectionFunc) => {
//           for (let data of res.data.items) {
//             data.duration = data.contentDetails.duration;
//             const channelId = data.snippet.channelId;
//             const videoId = data.id;
//             const video = await getVideoDetails(videoId);
//             data.viewCount = video[0].statistics.viewCount;
//             const channel = await getChannel(channelId);
//             data.channelImage = channel[0].snippet.thumbnails.default.url;
//           }
//           resolutionFunc(res.data.items);
//         }).then((data) => {
//           if (mounted) {
//             setLoading(false);
//           }
//           setData(data);
//         });
//       });
//       // getMostPopularVideos().then(async (res) => {
//       //   setNextPageToken(res.nextPageToken);
//       //   new Promise(async (resolutionFunc, rejectionFunc) => {
//       //     for (let data of res.items) {
//       //       data.duration = data.contentDetails.duration;
//       //       const channelId = data.snippet.channelId;
//       //       const videoId = data.id;
//       //       const video = await getVideoDetails(videoId);
//       //       data.viewCount = video[0].statistics.viewCount;
//       //       const channel = await getChannel(channelId);
//       //       data.channelImage = channel[0].snippet.thumbnails.default.url;
//       //     }
//       //     resolutionFunc(res.items);
//       //   }).then((data) => {
//       //     if (mounted) {
//       //       setLoading(false);
//       //     }
//       //     setData(data);
//       //   });
//       // });
//     }

//     return function cleanup() {
//       mounted = false;
//     };
//   }, [window.location.pathname]);

//   function nextPage() {
//     getMoreMostPopularVideos(nextPageToken).then((res) => {
//       setNextPageToken(res.nextPageToken);
//       new Promise(async (resolutionFunc, rejectionFunc) => {
//         for (let data of res.items) {
//           data.duration = data.contentDetails.duration;
//           const channelId = data.snippet.channelId;
//           const videoId = data.id;
//           const video = await getVideoDetails(videoId);
//           data.viewCount = video[0].statistics.viewCount;
//           const channel = await getChannel(channelId);
//           data.channelImage = channel[0].snippet.thumbnails.default.url;
//         }
//         resolutionFunc(res.items);
//       }).then((subdata) => {
//         setData([...data, ...subdata]);
//       });
//     });
//   }

//   return (
//     <div>
//       {loading ? (
//         <>
//           {window.location.pathname.includes("watch") ? (
//             <SkeletonWatch />
//           ) : window.location.pathname.includes("result") ? (
//             <SkeletonResult />
//           ) : (
//             <SkeletonHome />
//           )}
//         </>
//       ) : (
//         <InfiniteScroll
//           dataLength={data.length}
//           next={() => nextPage()}
//           hasMore={true}
//           loader={
//             window.location.pathname.includes("result") ? (
//               <SkeletonResultLoading />
//             ) : window.location.pathname.includes("watch") ? (
//               <SkeletonWatchLoading />
//             ) : (
//               <SkeletonHomeLoading />
//             )
//           }
//         >
//           <div
//             className={
//               window.location.pathname.includes("result")
//                 ? "videolist__result"
//                 : window.location.pathname.includes("watch")
//                 ? "videolist__watch"
//                 : "videolist"
//             }
//           >
//             {data.map((res) => {
//               return (
//                 <VideoDetails
//                   duration={res.duration}
//                   viewCount={res.viewCount}
//                   title={res.snippet.title}
//                   image={res.snippet.thumbnails.medium.url}
//                   description={res.snippet.description}
//                   publishedAt={res.snippet.publishedAt}
//                   channelTitle={res.snippet.channelTitle}
//                   videoId={res.id}
//                   channelImage={res.channelImage}
//                   liveBroadcastContent={res.snippet.liveBroadcastContent}
//                   viewLiveCount={res.viewLiveCount}
//                   channelId={res.snippet.channelId}
//                   // IF result is Channel
//                   isChannel={res.isChannel}
//                   subChannel={res.subChannel}
//                   videoCountChannel={res.videoCountChannel}
//                 />
//               );
//             })}
//           </div>
//         </InfiniteScroll>
//       )}
//     </div>
//   );
// }

// export default memo(VideoList);
