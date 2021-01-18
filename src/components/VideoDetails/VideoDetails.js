import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  CardHeader,
  Avatar,
  IconButton,
} from "@material-ui/core";
import {
  TimePublishToNow,
  ViewNumberFormatter,
  DurationVideoFormatter,
} from "../../utils";
import "./VideoDetails.css";
import { Link } from "react-router-dom";

function VideoDetails(props) {
  // const videoSrc = `https://www.youtube.com/embed/${props.videoId}`;
  // console.log("viewlivecount", props.viewLiveCount);
  const [page, setPage] = useState("");

  useEffect(() => {
    if (window.location.pathname.includes("result")) {
      setPage("result");
    } else if (window.location.pathname.includes("watch")) {
      setPage("watch");
    }
  }, [window.location.pathname]);

  // console.log(DurationVideoFormatter(`${props.duration}`));

  return (
    <div>
      {page === "result" ? (
        // result page
        <Link className="link" to={{ pathname: `/watch/${props.videoId}` }}>
          <div className="videodetails--result">
            <div className="videodetails__img">
              <img
                className="videodetails__img--img"
                src={props.image}
                alt="huyhero"
              ></img>
              {DurationVideoFormatter(`${props.duration}`) != "0" ? (
                <div className="duration duration--result">
                  <span style={{ padding: "5px" }}>
                    {DurationVideoFormatter(`${props.duration}`)}
                  </span>
                </div>
              ) : (
                <p className="duration duration--result videodetails__content--live">
                  Trực tiếp
                </p>
              )}
            </div>

            <div className="videodetails__content--result">
              <div className="videodetais__content--result--title">
                <p className="videotitle" style={{ fontSize: "20px" }}>
                  {props.title}
                </p>
                {props.liveBroadcastContent === "none"
                  ? `${ViewNumberFormatter(
                      props.viewCount
                    )} lượt xem・${TimePublishToNow(props.publishedAt)}`
                  : `${ViewNumberFormatter(
                      props.viewLiveCount
                    )} người đang xem`}
              </div>
              <Link
                className="link"
                to={{ pathname: `/channel/${props.channelId}` }}
              >
                <div
                  style={{ display: "flex" }}
                  className="videodetais__content--result--channel"
                >
                  <Avatar alt="Remy Sharp" src={props.channelImage} />
                  <p
                    style={{ color: "rgb(0, 0, 0, 0.6)", paddingLeft: "10px" }}
                  >
                    {props.channelTitle}
                  </p>
                </div>
              </Link>
              <div className="videodetails__content--result--description">
                <p className="videotitle result--description">
                  {props.description}
                </p>
              </div>
            </div>
          </div>
        </Link>
      ) : page === "watch" ? (
        <Link className="link" to={{ pathname: `/watch/${props.videoId}` }}>
          <div className="videodetails--watch">
            <div className="videodetails__img--watch">
              <img
                className="videodetails__img--img"
                src={props.image}
                width="190px"
                height="110px"
                alt="huyhero"
              ></img>
              {DurationVideoFormatter(`${props.duration}`) != "0" ? (
                <div className="duration duration--watch">
                  <span style={{ padding: "5px" }}>
                    {DurationVideoFormatter(`${props.duration}`)}
                  </span>
                </div>
              ) : (
                <p className="duration duration--watch videodetails__content--live">
                  Trực tiếp
                </p>
              )}
            </div>

            <div className="videodetails__content--result">
              <p
                className="videotitle"
                style={{ fontSize: "16px", fontWeight: "bold" }}
              >
                {props.title}
              </p>
              <Link
                className="link"
                to={{ pathname: `/channel/${props.channelId}` }}
              >
                <p style={{ fontSize: "15px", color: "rgb(0, 0, 0, 0.6)" }}>
                  {props.channelTitle}
                </p>
              </Link>

              {`${ViewNumberFormatter(
                props.viewCount
              )} lượt xem・${TimePublishToNow(props.publishedAt)}`}
            </div>
          </div>
        </Link>
      ) : (
        <div className="videodetails">
          <Link className="link" to={{ pathname: `/watch/${props.videoId}` }}>
            <div className="videodetails__img">
              <img src={props.image} width="360px" alt="huyhero"></img>
              {DurationVideoFormatter(`${props.duration}`) !== "0" ? (
                <div className="duration">
                  <span style={{ padding: "5px" }}>
                    {DurationVideoFormatter(`${props.duration}`)}
                  </span>
                </div>
              ) : null}
            </div>

            <div className="videodetails__content">
              <div className="videodetails__content--avatar">
                <Link
                  className="link"
                  to={{ pathname: `/channel/${props.channelId}` }}
                >
                  <Avatar alt="Remy Sharp" src={props.channelImage} />
                </Link>
              </div>
              <div className="videodetails__content--info">
                <p
                  style={{
                    fontSize: "20px",
                  }}
                  className="videotitle"
                >
                  {props.title}
                </p>
                <Link
                  className="link"
                  to={{ pathname: `/channel/${props.channelId}` }}
                >
                  <p style={{ color: "rgb(0, 0, 0, 0.6)" }}>
                    {props.channelTitle}
                  </p>
                </Link>

                {`${ViewNumberFormatter(
                  props.viewCount
                )} lượt xem・${TimePublishToNow(props.publishedAt)}`}
              </div>
            </div>
          </Link>
        </div>
      )}
    </div>
  );
}

export default VideoDetails;
