import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Grid, Avatar, Badge, isMuiElement } from "@material-ui/core";
import { InsertInvitation, ThumbUp } from "@material-ui/icons";
import VideoListWatch from "../../components/VideoList/VideoListWatch";
import VideoPlayer from "react-player";
import "./Watch.css";
// import {
//   getListComments,
//   getChatLive,
//   getPlaylistItems,
//   getMorePlaylistItems,
// } from "../../api/baseApi";
import {
  getAPI,
  APP_KEY,
  getVideoDetails,
  getChannel,
} from "../../services/network";
import {
  ViewNumberFormatterDetails,
  TimeFormatter,
  ViewNumberFormatter,
  TimePublishToNow,
} from "../../utils/index";
import * as queryString from "query-string";
import InfiniteScroll from "react-infinite-scroll-component";
// Skeleton
import {
  SkeletonWatchCommentLoading,
  SkeletonVideosPlaylistLoading,
} from "../../components/Skeleton/SkeletonWatch";

function Watch(props) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [dataCmt, setDataCmt] = useState([]);
  const [showMoreDes, setShowMoreDes] = useState(false);
  const [listChatLive, setListChatLive] = useState([]);
  const [live, setLive] = useState(false);
  const [playlist, setPlaylist] = useState([]);
  // const [runInterval, setRunInterval] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [nextPageTokenComment, setNextPageTokenComment] = useState("");
  const [nextPageTokenPlaylist, setNextPageTokenPlaylist] = useState("");
  const [nextPageTokenChatLive, setNextPageTokenChatLive] = useState("");

  const videoId = props.match.params.videoId;
  const playlistId = queryString.parse(props.location.search);

  useEffect(async () => {
    let mounted = true;
    // Video Details
    await getVideoDetails(videoId).then(async (res) => {
      new Promise(async (resolutionFunc, rejectionFunc) => {
        for (let data of res) {
          if (
            data.liveStreamingDetails !== undefined &&
            data.liveStreamingDetails.concurrentViewers !== undefined
          ) {
            //get chat live
            setLive(true);
            const chatlive = await getAPI("liveChat/messages", {
              params: {
                part: "snippet, authorDetails",
                liveChatId: data.liveStreamingDetails.activeLiveChatId,
                maxResults: 20,
                key: APP_KEY,
              },
            });
            nextPageTokenChatLive(chatlive.nextPageToken);
            setListChatLive(chatlive.items);
            // console.log("test", chatlive);
            // setRunInterval(
            //   setInterval(async () => {
            //     const chatlive = await getChatLive(
            //       data.liveStreamingDetails.activeLiveChatId
            //     );
            //     // console.log("haha");
            //     setListChatLive(chatlive);
            //   }, 10000)
            // );
          } else {
            // runInterval && clearInterval(runInterval);
            setLive(false);
            // get Comments
            await getAPI("commentThreads", {
              params: {
                part: "snippet",
                videoId: videoId,
                maxResults: 5,
                key: APP_KEY,
              },
            }).then((res) => {
              console.log("comments", res);
              setNextPageTokenComment(res.nextPageToken);
              if (mounted) {
                setLoading(false);
              }
              setDataCmt(res.items);
            });
          }
          const channel = await getChannel(data.snippet.channelId);
          data.channel = channel[0];
        }
        resolutionFunc(res);
      }).then((data) => {
        if (mounted) {
          setLoading(false);
        }
        setData(data);
      });
    });

    // Playlist
    if (playlistId.playlist !== undefined) {
      await getAPI("playlistItems", {
        params: {
          part: "snippet",
          maxResults: 10,
          playlistId: playlistId.playlist,
          key: APP_KEY,
        },
      }).then((res) => {
        setPlaylist(res.items);
        if (res.nextPageToken !== undefined) {
          setNextPageTokenPlaylist(res.nextPageToken);
        }
      });
    } else {
      console.log("0");
    }
    return function cleanup() {
      mounted = false;
    };
  }, [window.location.pathname]);

  // Resize
  useEffect(() => {
    window.addEventListener(
      "resize",
      () => {
        setIsMobile(window.innerWidth < 1280);
      },
      false
    );
  }, [isMobile]);

  // show chat livestream
  // useEffect(async () => {
  //   console.log("chatliveId", listChatLive);
  //   const showMoreChatLive = await getAPI("liveChat/messages", {
  //     params: {
  //       part: "snippet, authorDetails",
  //       liveChatId: data.liveStreamingDetails.activeLiveChatId,
  //       maxResults: 20,
  //       key: APP_KEY,
  //     },
  //   });
  //   nextPageTokenChatLive(showMoreChatLive.nextPageToken);
  //   setListChatLive([...listChatLive, ...showMoreChatLive.items]);
  // }, [nextPageTokenChatLive]);

  async function nextPagePlaylist() {
    const getMorePlaylistItems = await getAPI("playlistItems", {
      params: {
        part: "snippet",
        maxResults: 5,
        pageToken: nextPageTokenPlaylist,
        playlistId: playlistId.playlist,
        key: APP_KEY,
      },
    });
    setNextPageTokenPlaylist(getMorePlaylistItems.nextPageToken);
    setPlaylist([...playlist, ...getMorePlaylistItems.items]);
    // getMorePlaylistItems(playlistId.playlist, nextPageTokenPlaylist).then(
    //   (res) => {
    //     setNextPageTokenPlaylist(res.nextPageToken);
    //     setPlaylist([...playlist, ...res.items]);
    //   }
    // );
  }

  async function nextPage() {
    const getMoreListComments = await getAPI("commentThreads", {
      params: {
        part: "snippet",
        pageToken: nextPageTokenComment,
        videoId: videoId,
        maxResults: 5,
        key: APP_KEY,
      },
    });
    setNextPageTokenComment(getMoreListComments.nextPageToken);
    setDataCmt([...dataCmt, ...getMoreListComments.items]);
  }

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="watch">
          <Grid
            item
            className={isMobile ? "lg-12 md-12 sm-12" : "lg-9 md-9 sm-9"}
            xs={isMobile ? 12 : 9}
          >
            <div className="watch__video">
              <VideoPlayer
                className="watch__video--video"
                controls
                playing="true"
                url={`https://www.youtube.com/watch?v=${videoId}`}
                pip="true"
                stopOnUnmount="false"
              ></VideoPlayer>
              {data.map((item, index) => {
                const tags = item.snippet.tags;
                return (
                  <div className="watch__video--info" key={index}>
                    {tags != undefined && tags.length >= 5 ? (
                      <div className="info__hashtags">
                        {`#${item.snippet.tags[0].split(" ").join("")}   
                    #${item.snippet.tags[1].split(" ").join("")}
                    #${item.snippet.tags[2].split(" ").join("")}
                    #${item.snippet.tags[3].split(" ").join("")}
                    #${item.snippet.tags[4].split(" ").join("")}
                    `}
                      </div>
                    ) : null}
                    <div className="info__video">
                      <p style={{ fontSize: "20px", marginBottom: "10px" }}>
                        {item.snippet.title}
                      </p>
                      {live ? (
                        <p>
                          {`
                          ${ViewNumberFormatterDetails(
                            item.liveStreamingDetails?.concurrentViewers
                          )}
                          người đang xem・Đã được phát trực tiếp từ ${TimeFormatter(
                            item.snippet.publishedAt
                          )}
                        `}
                        </p>
                      ) : (
                        <p>
                          {`
                        ${ViewNumberFormatterDetails(
                          item.statistics.viewCount
                        )} 
                        lượt xem・${TimeFormatter(item.snippet.publishedAt)}
                        `}
                        </p>
                      )}
                    </div>
                    <hr className="hr__watch" />
                    <div className="info__channel">
                      <Link
                        className="link"
                        to={`/channel/${item.snippet.channelId}`}
                      >
                        <Avatar
                          alt="Remy Sharp"
                          src={item.channel.snippet.thumbnails.default.url}
                        />
                      </Link>
                      <div className="channel--overview">
                        <Link
                          className="link"
                          to={`/channel/${item.snippet.channelId}`}
                        >
                          <p style={{ fontSize: "130%" }}>
                            {item.snippet.channelTitle}
                          </p>
                        </Link>

                        <p style={{ marginBottom: "15px" }}>
                          {`${ViewNumberFormatter(
                            item.channel.statistics.subscriberCount
                          )} người đăng ký`}
                        </p>
                        <div className="video__description"></div>
                        <p className={showMoreDes ? null : "description--text"}>
                          {item.snippet.description.split("\n").map((item) => {
                            return <p>{item}</p>;
                          })}
                        </p>
                        {showMoreDes ? (
                          <button
                            onClick={() => {
                              setShowMoreDes(false);
                            }}
                            className="description--btn"
                          >
                            ẨN BỚT
                          </button>
                        ) : (
                          <button
                            onClick={() => {
                              setShowMoreDes(true);
                            }}
                            className="description--btn"
                          >
                            HIỂN THỊ THÊM
                          </button>
                        )}
                      </div>
                    </div>
                    <hr className="hr__watch" />
                    {live ? null : (
                      <div className="totalcomment">
                        {`${ViewNumberFormatterDetails(
                          item.statistics?.commentCount
                        )} bình luận`}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            {live ? null : (
              <InfiniteScroll
                dataLength={dataCmt.length}
                next={() => nextPage()}
                hasMore={true}
                loader={<SkeletonWatchCommentLoading />}
              >
                <div className="watch__comment">
                  {dataCmt.map((item) => {
                    const temp = item.snippet.topLevelComment.snippet;
                    return (
                      <div style={{ display: "flex" }}>
                        <Avatar
                          alt="Remy Sharp"
                          src={temp.authorProfileImageUrl}
                        />
                        <div
                          style={{ paddingLeft: "20px", paddingBottom: "10px" }}
                        >
                          <p
                            style={{
                              fontSize: "115%",
                              fontWeight: "500",
                              display: "inline",
                            }}
                          >
                            {temp.authorDisplayName}
                          </p>
                          <span
                            style={{
                              paddingLeft: "0.5em",
                              color: "rgb(0,0,0,0.66)",
                            }}
                          >
                            {TimePublishToNow(temp.updatedAt)}
                          </span>
                          <p>{temp.textOriginal}</p>
                          <div className="comment--like">
                            <ThumbUp style={{ color: "rgb(0,0,0,0.66)" }} />
                            {temp.likeCount > 0 ? (
                              <span style={{ paddingLeft: "5px" }}>
                                {temp.likeCount}
                              </span>
                            ) : null}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </InfiniteScroll>
            )}
          </Grid>
          <Grid
            item
            className={isMobile ? "lg-12 md-12 sm-12" : "lg-3 md-3 sm-3"}
            xs={isMobile ? 12 : 3}
            justify="center"
          >
            {/* is live */}
            {live ? (
              <div className="watch__chatlive">
                <p className="watch__chatlive--header">Top Chat</p>
                <div className="watch__chatlive--messages">
                  {listChatLive.map((item) => {
                    return (
                      <div className="chatlive__item">
                        <Avatar
                          alt="Remy Sharp"
                          src={item.authorDetails.profileImageUrl}
                        />
                        <p>
                          <span
                            style={{
                              color: "rgb(0,0,0,0.66)",
                              paddingRight: "10px",
                            }}
                          >
                            {item.authorDetails.displayName}
                          </span>
                          <span>{item.snippet.displayMessage}</span>
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : null}
            {/* is playlist */}
            {playlist.length > 0 ? (
              <div className="watch__playlist">
                <InfiniteScroll
                  dataLength={playlist.length}
                  hasMore={nextPageTokenPlaylist == "" ? false : true}
                  next={() => nextPagePlaylist()}
                  loader={
                    nextPageTokenPlaylist == "" ? null : (
                      <SkeletonVideosPlaylistLoading />
                    )
                  }
                >
                  <div style={{ display: "block" }}>
                    <p style={{ fontSize: "20px", paddingBottom: "10px" }}>
                      Playlist
                    </p>
                    {playlist.map((itemPlaylist) => {
                      return (
                        <Link
                          className="link"
                          to={{
                            pathname: `/watch/${itemPlaylist.snippet.resourceId.videoId}`,
                            search: `?playlist=${itemPlaylist.snippet.playlistId}`,
                          }}
                        >
                          <div
                            style={{ display: "flex", paddingBottom: "10px" }}
                          >
                            <img
                              src={itemPlaylist.snippet.thumbnails.default.url}
                            />
                            <div style={{ paddingLeft: "10px" }}>
                              <p className="description--text watch__playlist--title">
                                {itemPlaylist.snippet.title}
                              </p>
                              <p style={{ color: "rgb(0,0,0,0.66)" }}>
                                {itemPlaylist.snippet.channelTitle}
                              </p>
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </InfiniteScroll>
              </div>
            ) : null}
            <div className="watch__videos--next">
              <p style={{ fontSize: "20px" }}>Tiếp theo</p>
            </div>
            <div className="watch__videos--list">
              <VideoListWatch videoId={videoId} />
            </div>
          </Grid>
        </div>
      )}
    </div>
  );
}

export default Watch;
