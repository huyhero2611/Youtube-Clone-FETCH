import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  CardHeader,
  Avatar,
  IconButton,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { TimePublishToNow, ViewNumberFormatter } from "../../utils";
import "./VideoDetails.css";
import { Link } from "react-router-dom";
import { getVideoDetails, GetChannel } from "../../api/baseApi";

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
  const [urlChannel, setUrlChannel] = useState("");
  useEffect(() => {
    if (window.location.pathname.includes("result")) {
      setPage("result");
    }
    GetChannel(props.channelId).then((data) => {
      data.map((item) => {
        setUrlChannel(item.snippet.thumbnails.default.url);
      });
    });
  }, []);

  return (
    <div>
      {page == "result" ? (
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
              {` ${TimePublishToNow(props.publishedAt)}`}
            </div>
            <div
              style={{ display: "flex" }}
              className="videodetais__content--result--channel"
            >
              <Avatar alt="Remy Sharp" src={urlChannel} />
              <p>{props.channelTitle}</p>
            </div>
            <div className="videodetails__content--result--description">
              <p>{props.description}</p>
            </div>
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
              <img src={props.image} alt="huyhero"></img>
            </Link>
          </div>

          <div className="videodetails__content">
            <div className="videodetails__content--avatar">
              <Avatar aria-label="recipe" className={classes.avatar}>
                H
              </Avatar>
            </div>
            <div className="videodetails__content--info">
              <h3>{props.title}</h3>
              <h4>{props.channelTitle}</h4>
              {` ${TimePublishToNow(props.publishedAt)}`}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default VideoDetails;
