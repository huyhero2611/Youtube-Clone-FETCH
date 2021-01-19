import React from "react";
import "./Skeletons.css";
import Skeleton from "react-loading-skeleton";

function SkeletonWatch(props) {
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

export default SkeletonWatch;
