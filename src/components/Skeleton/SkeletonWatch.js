import React from "react";
import "./Skeletons.css";
import Skeleton from "react-loading-skeleton";

export function SkeletonWatch(props) {
  return (
    <div style={{ display: "block", marginTop: "10px" }}>
      {Array(50)
        .fill()
        .map((item) => {
          return (
            <div style={{ display: "flex", marginBottom: "10px" }}>
              <div>
                <Skeleton width={190} height={110} />
              </div>
              <div style={{ marginLeft: "10px", marginTop: "5px" }}>
                <p style={{ marginBottom: "5px" }}>
                  <Skeleton width={250} height={30} />
                </p>
                <p>
                  <Skeleton width={250} />
                </p>
                <p>
                  <Skeleton width={250} />
                </p>
              </div>
            </div>
          );
        })}
    </div>
  );
}

export function SkeletonWatchLoading(props) {
  return (
    <div style={{ display: "block", marginTop: "10px" }}>
      {Array(1)
        .fill()
        .map((item) => {
          return (
            <div style={{ display: "flex", marginBottom: "10px" }}>
              <div>
                <Skeleton width={190} height={110} />
              </div>
              <div style={{ marginLeft: "10px", marginTop: "5px" }}>
                <p style={{ marginBottom: "5px" }}>
                  <Skeleton width={250} height={30} />
                </p>
                <p>
                  <Skeleton width={250} />
                </p>
                <p>
                  <Skeleton width={250} />
                </p>
              </div>
            </div>
          );
        })}
    </div>
  );
}

export function SkeletonWatchCommentLoading() {
  return (
    <div>
      {Array(1)
        .fill()
        .map((item) => {
          return (
            <div className="watch__comment">
              <div style={{ display: "flex" }}>
                <Skeleton circle={true} height={43} width={43} />
                <div style={{ paddingLeft: "20px", paddingBottom: "10px" }}>
                  <p>
                    <Skeleton width={650} />
                  </p>
                  <span>
                    <Skeleton />
                  </span>
                  <p>
                    <Skeleton />
                  </p>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
}

export function SkeletonVideosPlaylistLoading() {
  return (
    <div>
      {Array(1).fill().map(() => {
        return (
          <div style={{ display: "flex", paddingBottom: "10px" }}>
            <Skeleton width={120} height={80}/>
            <div style={{ paddingLeft: "10px" }}>
              <p className="description--text watch__playlist--title">
                <Skeleton width={270}/>
              </p>
              <p style={{ color: "rgb(0,0,0,0.66)" }}>
                <Skeleton width={100}/>
              </p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
