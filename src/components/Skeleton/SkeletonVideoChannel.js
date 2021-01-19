import React from "react";
import "./Skeletons.css";
import Skeleton from "react-loading-skeleton";

export function SkeletonVideoChannel(props) {
  return (
    <div className="skeleton">
      {Array(50)
        .fill()
        .map((item) => {
          return (
            <div className="channel__videos--video">
              <div className="video__img">
                <Skeleton width={250} height={140} />

                <div className="video__img--duration">
                  <Skeleton />
                </div>
              </div>

              <p className="limitline video__title">
                <Skeleton />
              </p>
              <p className="text-opacity">
                <Skeleton />
              </p>
              <p className="text-opacity">
                <Skeleton />
              </p>
            </div>
          );
        })}
    </div>
  );
}

export function SkeletonVideoChannelLoading(props) {
  return (
    <div className="skeleton">
      {Array(6)
        .fill()
        .map((item) => {
          return (
            <div className="channel__videos--video">
              <div className="video__img">
                <Skeleton width={250} height={140} />

                <div className="video__img--duration">
                  <Skeleton />
                </div>
              </div>

              <p className="limitline video__title">
                <Skeleton />
              </p>
              <p className="text-opacity">
                <Skeleton />
              </p>
              <p className="text-opacity">
                <Skeleton />
              </p>
            </div>
          );
        })}
    </div>
  );
}
