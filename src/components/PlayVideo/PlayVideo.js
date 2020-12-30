import React from "react";

function PlayVideo(props) {
  return (
    <>
      <video controls width="1280px" height="720px" poster={props.videoImg}>
        <source
          src="https://www.youtube.com/watch?v=r6qWEteVMyM"
          type="video/mp4"
        />
      </video>
    </>
  );
}

export default PlayVideo;
