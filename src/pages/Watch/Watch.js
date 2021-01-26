import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Grid, Avatar, Badge, isMuiElement } from "@material-ui/core";
import { InsertInvitation, ThumbUp } from "@material-ui/icons";
import VideoList from "../../components/VideoList/VideoList";
import VideoPlayer from "react-player";
import "./Watch.css";
import {
  getVideoDetails,
  getChannel,
  getListComments,
  getMoreListComments,
  getChatLive,
  getPlaylistItems,
  getMorePlaylistItems
} from "../../api/baseApi";
import {
  ViewNumberFormatterDetails,
  TimeFormatter,
  ViewNumberFormatter,
  TimePublishToNow,
} from "../../utils/index";
import * as queryString from "query-string";
import InfiniteScroll from "react-infinite-scroll-component";
// Skeleton
import { SkeletonWatchCommentLoading, SkeletonVideosPlaylistLoading } from "../../components/Skeleton/SkeletonWatch";

function Watch(props) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [dataCmt, setDataCmt] = useState([]);
  const [showMoreDes, setShowMoreDes] = useState(false);
  const [listChatLive, setListChatLive] = useState([]);
  const [live, setLive] = useState(false);
  const [playlist, setPlaylist] = useState([]);
  const [runInterval, setRunInterval] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [nextPageTokenComment, setNextPageTokenComment] = useState("");
  const [nextPageTokenPlaylist, setNextPageTokenPlaylist] = useState("");

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
            setLive(true);
            setRunInterval(
              setInterval(async () => {
                const chatlive = await getChatLive(
                  data.liveStreamingDetails.activeLiveChatId
                );
                setListChatLive(chatlive);
              }, 1000)
            );
          } else {
            runInterval && clearInterval(runInterval);
            setLive(false);
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
    // Comments
    await getListComments(videoId).then((res) => {
      setNextPageTokenComment(res.nextPageToken);
      if (mounted) {
        setLoading(false);
      }
      setDataCmt(res.items);
    });
    if (playlistId.playlist !== undefined) {
      const test = await getPlaylistItems(playlistId.playlist).then((res) => {
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

  function nextPagePlaylist() {
      getMorePlaylistItems(playlistId.playlist, nextPageTokenPlaylist).then((res) => {
        setNextPageTokenPlaylist(res.nextPageToken);
        setPlaylist([...playlist, ...res.items])
      })
  }

  function nextPage() {
    getMoreListComments(videoId, nextPageTokenComment).then((res) => {
      setNextPageTokenComment(res.nextPageToken);
      setDataCmt([...dataCmt, ...res.items]);
    });
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
                  loader={nextPageTokenPlaylist == "" ? null : <SkeletonVideosPlaylistLoading />}
                >
                  <div style={{display: "block"}}>
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
                          <div style={{ display: "flex", paddingBottom: "10px" }}>
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
              <VideoList videoId={videoId} />
            </div>
          </Grid>
        </div>
      )}
    </div>
  );
}

export default Watch;
