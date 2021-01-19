import React from "react";
import Skeleton from "react-loading-skeleton";
import "./Skeletons.css";

function SkeletonResult(props) {
  return (
    <div style={{ marginTop: "30px", marginLeft: "100px" }}>
      {Array(50)
        .fill()
        .map((item) => {
          return (
            <div style={{ display: "flex", marginBottom: "10px" }}>
              <div>
                <Skeleton width={360} height={200} />
              </div>
              <div style={{ width: "80%" }}>
                <div className="videodetails__content--result">
                  <div className="videodetais__content--result--title">
                    <p>
                      <Skeleton />
                    </p>
                    <div className="text-opacity">
                      <Skeleton />
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Skeleton circle={true} height={50} width={50} />
                    <p style={{ marginLeft: "10px" }}>
                      <Skeleton width={500} />
                    </p>
                  </div>
                  <div className="videodetails__content--result--description">
                    <p>
                      <Skeleton height={100} />
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default SkeletonResult;
