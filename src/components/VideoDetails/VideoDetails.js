import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  CardHeader,
  Avatar,
  IconButton,
} from "@material-ui/core";
import { TimePublishToNow, ViewNumberFormatter } from "../../utils";
import "./VideoDetails.css";
import { Link } from "react-router-dom";
// import { getVideoDetails, getChannel } from "../../api/baseApi";

function VideoDetails(props) {
  // const videoSrc = `https://www.youtube.com/embed/${props.videoId}`;
  // console.log(videoSrc);
  const [page, setPage] = useState("");

  useEffect(() => {
    if (window.location.pathname.includes("result")) {
      setPage("result");
    } else if (window.location.pathname.includes("watch")) {
      setPage("watch");
    }
  }, [window.location.pathname]);
  return (
    <div>
      {page === "result" ? (
        // result page
        <div className="videodetails--result">
          <div className="videodetails__img">
            <Link
              to={{
                pathname: `/watch/${props.videoId}`,
                data: { videoImage: props.imageLarge },
              }}
            >
              <img src={props.image} alt="huyhero"></img>
            </Link>
          </div>

          <div className="videodetails__content--result">
            <div className="videodetais__content--result--title">
              <p style={{ fontSize: "20px" }}>{props.title}</p>
              {props.liveBroadcastContent == "none"
                ? `${ViewNumberFormatter(
                    props.viewCount
                  )} lượt xem・${TimePublishToNow(props.publishedAt)}`
                : `${ViewNumberFormatter(props.viewLiveCount)} người đang xem`}
            </div>
            <div
              style={{ display: "flex" }}
              className="videodetais__content--result--channel"
            >
              <Avatar alt="Remy Sharp" src={props.channelImage} />
              <p style={{ color: "rgb(0, 0, 0, 0.6)" }}>{props.channelTitle}</p>
            </div>
            <div className="videodetails__content--result--description">
              <p>{props.description}</p>
            </div>
            {props.liveBroadcastContent == "live" ? (
              <p className="videodetails__content--live">Trực tiếp</p>
            ) : null}
          </div>
        </div>
      ) : page == "watch" ? (
        <div className="videodetails--watch">
          <div className="videodetails__img--watch">
            <Link
              to={{
                pathname: `/watch/${props.videoId}`,
                data: { videoImage: props.imageLarge },
              }}
            >
              <img
                src={props.image}
                width="190px"
                height="110px"
                alt="huyhero"
              ></img>
            </Link>
          </div>

          <div className="videodetails__content--result">
            <p
              className="videotitle"
              style={{ fontSize: "16px", fontWeight: "bold" }}
            >
              {props.title}
            </p>
            <p style={{ fontSize: "15px", color: "rgb(0, 0, 0, 0.6)" }}>
              {props.channelTitle}
            </p>
            <p style={{ fontSize: "15px" }}>{`${ViewNumberFormatter(
              props.viewCount
            )} lượt xem・${TimePublishToNow(props.publishedAt)}`}</p>

            {props.liveBroadcastContent == "live" ? (
              <p
                style={{ fontSize: "11px" }}
                className="videodetails__content--live"
              >
                Trực tiếp
              </p>
            ) : null}
          </div>
        </div>
      ) : (
        <div className="videodetails">
          <div className="videodetails__img">
            <Link
              to={{
                pathname: `/watch/${props.videoId}`,
                data: { videoImage: props.imageLarge },
              }}
            >
              <img src={props.image} width="360px" alt="huyhero"></img>
            </Link>
          </div>

          <div className="videodetails__content">
            <div className="videodetails__content--avatar">
              <Avatar alt="Remy Sharp" src={props.channelImage} />
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
              <p style={{ color: "rgb(0, 0, 0, 0.6)" }}>{props.channelTitle}</p>
              {`${ViewNumberFormatter(
                props.viewCount
              )} lượt xem・${TimePublishToNow(props.publishedAt)}`}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default VideoDetails;
