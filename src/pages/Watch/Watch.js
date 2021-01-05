import React, { useEffect, useState } from "react";
import { Grid, Avatar } from "@material-ui/core";
import VideoList from "../../components/VideoList/VideoList";
import VideoPlayer from "react-player";
import "./Watch.css";
import { getVideoDetails, getChannel } from "../../api/baseApi";
import {
  ViewNumberFormatterDetails,
  TimeFormatter,
  SubscriberNumberFormatter,
} from "../../utils/index";
function Watch(props) {
  const videoId = props.match.params.videoId;
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    let mounted = true;
    getVideoDetails(videoId).then(async (res) => {
      new Promise(async (resolutionFunc, rejectionFunc) => {
        for (let data of res) {
          const channel = await getChannel(data.snippet.channelId);
          data.channel = channel.data.items[0];
        }
        resolutionFunc(res);
      }).then((data) => {
        if (mounted) {
          setLoading(false);
        }
        setData(data);
        console.log(data);
      });
    });
    return function cleanup() {
      mounted = false;
    };
  }, [window.location.pathname]);

  // const tags
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
                    <hr
                      style={{
                        width: "97.3%",
                        border: "0.2px solid rbg(0,0,0,0.3)",
                        margin: "15px 0",
                      }}
                    />
                    <div className="info__channel">
                      <Avatar
                        alt="Remy Sharp"
                        src={item.channel.snippet.thumbnails.default.url}
                      />
                      <div className="channel--overview">
                        <p>{item.snippet.channelTitle}</p>
                        <p>
                          {SubscriberNumberFormatter(
                            item.channel.statistics.subscriberCount
                          )}
                        </p>
                        <p>
                          {item.snippet.description.split("\n").map((item) => {
                            return <p>{item}</p>;
                          })}
                        </p>
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
      )}
    </div>
  );
}

export default Watch;
