import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  CardHeader,
  Avatar,
  IconButton,
} from "@material-ui/core";
import { makeStyles, rgbToHex } from "@material-ui/core/styles";
import { TimePublishToNow, ViewNumberFormatter } from "../../utils";
import "./VideoDetails.css";
import { Link } from "react-router-dom";
// import { getVideoDetails, getChannel } from "../../api/baseApi";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    minHeight: 300,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: "red",
  },
}));

function VideoDetails(props) {
  // const videoSrc = `https://www.youtube.com/embed/${props.videoId}`;
  // console.log(videoSrc);
  const classes = useStyles();
  const [page, setPage] = useState("");

  useEffect(async () => {
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
              {`${ViewNumberFormatter(props.viewCount)}・${TimePublishToNow(
                props.publishedAt
              )}`}
            </div>
            <div
              style={{ display: "flex" }}
              className="videodetais__content--result--channel"
            >
              <Avatar alt="Remy Sharp" src={props.channelImage} />
              <p style={{ color: "rgb(0, 0, 0, 0.6)" }}>{props.channelTitle}</p>
            </div>
            {page === "result" ? (
              <div className="videodetails__content--result--description">
                <p>{props.description}</p>
              </div>
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
                width="170px"
                height="100px"
                alt="huyhero"
              ></img>
            </Link>
          </div>

          <div className="videodetails__content--result">
            <p
              className="videotitle"
              style={{ fontSize: "17px", fontWeight: "bold" }}
            >
              {props.title}
            </p>
            <p style={{ color: "rgb(0, 0, 0, 0.6)" }}>{props.channelTitle}</p>
            {`${ViewNumberFormatter(props.viewCount)}・${TimePublishToNow(
              props.publishedAt
            )}`}
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
              {`${ViewNumberFormatter(props.viewCount)}・${TimePublishToNow(
                props.publishedAt
              )}`}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default VideoDetails;
