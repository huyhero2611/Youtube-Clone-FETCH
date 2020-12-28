import React from "react";
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
  const videoSrc = `https://www.youtube.com/embed/${props.videoId}`;
  // console.log(videoSrc);
  const classes = useStyles();

  const differentTime = TimePublishToNow(props.publishedAt);
  const viewNumber = ViewNumberFormatter(props.viewCount);

  return (
    // <Card className={classes.root}>
    //   <CardMedia
    //     className={classes.media}
    //     image={props.image}
    //     title="Huyhero"
    //   />
    //   <CardHeader
    //     avatar={
    //       <Avatar aria-label="recipe" className={classes.avatar}>
    //         R
    //       </Avatar>
    //     }
    //     content="test"
    //     title={props.title}
    //     subheader={props.channelTitle}
    //     subheader={`${viewNumber} ・ ${differentTime}`}
    //   />
    //   {/* <CardContent>
    //     <span>{viewNumber}</span>
    //     <hr></hr>
    //     <span>{differentTime}</span>
    //   </CardContent> */}
    // </Card>
    <div className="videodetails">
      <Link to={`/watch?v=${props.videoId}`}>
        <img
          src={props.image}
          className="videodetails__img"
          alt="huyhero"
        ></img>
      </Link>
      <div className="videodetails__content">
        <div className="videodetails__content--avatar">
          <Avatar aria-label="recipe" className={classes.avatar}>
            H
          </Avatar>
        </div>
        <div className="videodetails__content--info">
          <h3>{props.title}</h3>
          <h4>{props.channelTitle}</h4>
          {`${viewNumber} ・ ${differentTime}`}
        </div>
      </div>
    </div>
  );
}

export default VideoDetails;
