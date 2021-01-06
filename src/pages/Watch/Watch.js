import React, { useEffect, useState } from "react";
import { Grid, Avatar, Badge } from "@material-ui/core";
import { ThumbUp } from "@material-ui/icons";
import VideoList from "../../components/VideoList/VideoList";
import VideoPlayer from "react-player";
import "./Watch.css";
import {
  getVideoDetails,
  getChannel,
  getListComments,
} from "../../api/baseApi";
import {
  ViewNumberFormatterDetails,
  TimeFormatter,
  SubscriberNumberFormatter,
  TimePublishToNow,
} from "../../utils/index";
function Watch(props) {
  const videoId = props.match.params.videoId;
  // const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [dataCmt, setDataCmt] = useState([]);
  const [showMoreDes, setShowMoreDes] = useState(false);

  useEffect(() => {
    // let mounted = true;
    getVideoDetails(videoId).then(async (res) => {
      new Promise(async (resolutionFunc, rejectionFunc) => {
        for (let data of res) {
          const channel = await getChannel(data.snippet.channelId);
          data.channel = channel.data.items[0];
        }
        resolutionFunc(res);
      }).then((data) => {
        // if (mounted) {
        //   setLoading(false);
        // }
        setData(data);
      });
    });
    // return function cleanup() {
    //   mounted = false;
    // };
    getListComments(videoId).then((res) => {
      setDataCmt(res);
    });
  }, [window.location.pathname]);

  return (
    <div>
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
              return (
                <div className="watch__video--info">
                  <div className="info__hashtags">
                    {`#${item.snippet.tags[0].split(" ").join("")}   
                    #${item.snippet.tags[1].split(" ").join("")}
                    #${item.snippet.tags[2].split(" ").join("")}
                    #${item.snippet.tags[3].split(" ").join("")}
                    #${item.snippet.tags[4].split(" ").join("")}`}
                  </div>
                  <div className="info__video">
                    <p style={{ fontSize: "20px", marginBottom: "10px" }}>
                      {item.snippet.title}
                    </p>
                    {`
                      ${ViewNumberFormatterDetails(item.statistics.viewCount)} 
                      lượt xem・${TimeFormatter(item.snippet.publishedAt)}
                      `}
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
                        {SubscriberNumberFormatter(
                          item.channel.statistics.subscriberCount
                        )}
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
                  <div className="totalcomment">
                    {`${ViewNumberFormatterDetails(
                      item.statistics.commentCount
                    )} bình luận`}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="watch__comment">
            {dataCmt.map((item) => {
              const temp = item.snippet.topLevelComment.snippet;
              console.log("item", item.snippet.topLevelComment.snippet);
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
                      style={{ paddingLeft: "0.5em", color: "rgb(0,0,0,0.66)" }}
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
          <div className="watch__videos--next">
            <p style={{}}>Tiếp theo</p>
          </div>
          <div className="watch__videos--list">
            <VideoList videoId={videoId} />
          </div>
        </Grid>
      </div>
    </div>
  );
}

export default Watch;
