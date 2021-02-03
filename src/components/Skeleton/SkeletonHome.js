import React from "react";
import Skeleton from "react-loading-skeleton";
import "./Skeletons.css";

export function SkeletonHome(props) {
  return (
    <div className="skeleton skeleton__home">
      {Array(12)
        .fill()
        .map((item) => {
          return (
            <div style={{ marginBottom: "30px" }}>
              <div className="videodetails__img">
                <Skeleton width={360} height={200} />
                <div className="duration">
                  <span>
                    <Skeleton />
                  </span>
                </div>
              </div>

              <div className="videodetails__content">
                <div className="videodetails__content--avatar">
                  <Skeleton circle={true} height={50} width={50} />
                </div>
                <div
                  style={{
                    width: "300px",
                    height: "45px",
                    paddingLeft: "10px",
                  }}
                >
                  <p>
                    <Skeleton />
                  </p>
                  <p>
                    <Skeleton />
                  </p>
                  <Skeleton />
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
}

export function SkeletonHomeLoading(props) {
  return (
    <div className="skeleton skeleton__home">
      {Array(4)
        .fill()
        .map((item) => {
          return (
            <div style={{ marginBottom: "30px" }}>
              <div className="videodetails__img">
                <Skeleton width={360} height={200} />
                <div className="duration">
                  <span>
                    <Skeleton />
                  </span>
                </div>
              </div>

              <div className="videodetails__content">
                <div className="videodetails__content--avatar">
                  <Skeleton circle={true} height={50} width={50} />
                </div>
                <div
                  style={{
                    width: "300px",
                    height: "45px",
                    paddingLeft: "10px",
                  }}
                >
                  <p>
                    <Skeleton />
                  </p>
                  <p>
                    <Skeleton />
                  </p>
                  <Skeleton />
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
}
