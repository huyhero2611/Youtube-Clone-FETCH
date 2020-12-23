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

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
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
  const classes = useStyles();

  const differentTime = TimePublishToNow(props.publishedAt);
  const viewNumber = ViewNumberFormatter(props.viewCount);

  return (
    // <div classNam="videodetails-main">
    //   <div className="videodetails-gallery">
    //     <a>
    //       <img src={props.image} alt="Image Video"></img>
    //     </a>
    //     <div className="videodetails-info">
    //       <p>{props.title}</p>
    //       <p>{props.description}</p>
    //     </div>
    //   </div>
    // </div>
    <Card className={classes.root}>
      <CardMedia
        className={classes.media}
        image={props.image}
        title="Huyhero"
      />
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            R
          </Avatar>
        }
        title={props.title}
      />
      <CardContent>
        <span>{viewNumber}</span>
        <hr></hr>
        <span>{differentTime}</span>
      </CardContent>
    </Card>
  );
}

export default VideoDetails;
