import React, { useEffect, useRef, useState } from "react";
import { Grid, Avatar, Badge } from "@material-ui/core";
import { ThumbUp } from "@material-ui/icons";
import VideoList from "../../components/VideoList/VideoList";
import VideoPlayer from "react-player";
import "./Watch.css";
import {
  getVideoDetails,
  getChannel,
  getListComments,
  getChatLive,
} from "../../api/baseApi";
import {
  ViewNumberFormatterDetails,
  TimeFormatter,
  ViewNumberFormatter,
  TimePublishToNow,
} from "../../utils/index";
import LiveChat from "./LiveChat";
function Watch(props) {
  const videoId = props.match.params.videoId;
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [dataCmt, setDataCmt] = useState([]);
  const [showMoreDes, setShowMoreDes] = useState(false);
  const [chatId, setChatId] = useState("");
  const [live, setLive] = useState(false);
  // const [pathname, setPathname] = useState("");

  useEffect(() => {
    let mounted = true;
    getVideoDetails(videoId).then(async (res) => {
      // console.log(res.liveStreamingDetails);
      // console.log("watch", res);
      new Promise(async (resolutionFunc, rejectionFunc) => {
        for (let data of res) {
          if (data.liveStreamingDetails !== undefined) {
            setLive(true);
            setChatId(data.liveStreamingDetails.activeLiveChatId);
            // console.log("chatId1", data.liveStreamingDetails.activeLiveChatId);
          } else {
            setLive(false);
            console.log("false");
          }
          const channel = await getChannel(data.snippet.channelId);
          data.channel = channel.data.items[0];
        }
        resolutionFunc(res);
      }).then((data) => {
        if (mounted) {
          setLoading(false);
        }
        setData(data);
      });
    });
    getListComments(videoId).then((res) => {
      if (mounted) {
        setLoading(false);
      }
      setDataCmt(res);
      // setPathname(window.location.pathname);
    });
    return function cleanup() {
      mounted = false;
    };
  }, [window.location.pathname]);

  // useEffect(async () => {
  //   // console.log("chatId2", chatId);
  //   if (live) {
  //     await getChatLive(chatId).then((res) => {
  //       console.log("res", res);
  //     });
  //   }
  // }, [window.location.pathname]);
  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="watch">
          <Grid item className="lg-9 md-9 sm-9 watch__video" xs={9}>
            <div className="watch__video">
              <div className="watch__video--video">
                <VideoPlayer
                  style={{ paddingLeft: "70px" }}
                  width="1280px"
                  height="720px"
                  controls
                  playing="true"
                  url={`https://www.youtube.com/watch?v=${videoId}`}
                ></VideoPlayer>
              </div>
              {data.map((item) => {
                const tags = item.snippet.tags;
                let countViewers = 0;
                if (item.liveStreamingDetails != undefined) {
                  countViewers = item.liveStreamingDetails.concurrentViewers;
                }
                return (
                  <div className="watch__video--info">
                    {tags != undefined ? (
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
                          ${ViewNumberFormatterDetails(countViewers)}
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
                      <Avatar
                        alt="Remy Sharp"
                        src={item.channel.snippet.thumbnails.default.url}
                      />
                      <div className="channel--overview">
                        <p style={{ fontSize: "130%" }}>
                          {item.snippet.channelTitle}
                        </p>
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
                          item.statistics.commentCount
                        )} bình luận`}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            <div className="watch__comment">
              {dataCmt.map((item) => {
                const temp = item.snippet.topLevelComment.snippet;
                return (
                  <div style={{ display: "flex" }}>
                    <Avatar alt="Remy Sharp" src={temp.authorProfileImageUrl} />
                    <div
                      style={{ paddingLeft: "20px", paddingBottom: "10px" }}
                      // className="comment__text"
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
                      {/* {temp.authorChannelUrl} */}
                      <p>{temp.textOriginal}</p>
                      <div className="comment--like">
                        <ThumbUp
                          // onClick={() => (temp.likeCount = temp.likeCount + 1)}
                          style={{ color: "rgb(0,0,0,0.66)" }}
                        />
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
          </Grid>
          <Grid
            item
            className="lg-3 md-3 sm-3 watch__videos"
            xs={3}
            justify="center"
          >
            {live ? (
              <div className="watch__chatlive">
                <p>Top Chat</p>
                {/* <div className="watch__chatlive--messages">
                  <LiveChat chatId={chatId} />
                </div> */}
              </div>
            ) : null}
            <div className="watch__videos--next">
              <p style={{}}>Tiếp theo</p>
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
