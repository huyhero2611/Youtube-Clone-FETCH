import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import {
  Grid,
  AppBar,
  Tabs,
  Tab,
  Box,
  Typography,
  Avatar,
} from "@material-ui/core";
import { PlaylistPlay, PlayArrow } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

import NavBar from "../../components/NavBar/NavBar";
import {
  getChannel,
  getMoreVideosChannel,
  getPlaylists,
  getPlayplistItems,
  getVideoDetails,
  getVideosChannel,
} from "../../api/baseApi";
import {
  DurationVideoFormatter,
  TimePublishToNow,
  ViewNumberFormatter,
  TimeFormatter,
  ViewNumberFormatterDetails,
} from "../../utils/index";
import "./Channel.css";
import {
  SkeletonVideoChannel,
  SkeletonVideoChannelLoading,
} from "../../components/Skeleton/SkeletonVideoChannel";
import InfiniteScroll from "react-infinite-scroll-component";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function Channel(props) {
  // Material UI
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  //Your Code
  const channelId = props.match.params.channelId;
  const [data, setData] = useState([]);
  const [dataPlaylist, setDataPlaylist] = useState([]);
  const [videosChannel, setVideosChannel] = useState([]);
  const [loading, setLoading] = useState(true);
  const [nextPageVideosChannel, setNextPageVideosChannel] = useState("");

  const history = useHistory();

  useEffect(async () => {
    await getChannel(channelId).then((res) => {
      setData(res);
    });
    await getVideosChannel(channelId).then((res) => {
      setNextPageVideosChannel(res.nextPageToken);
      new Promise(async (resolutionFunc, rejectionFunc) => {
        for (let data of res.items) {
          let videoId;
          if (data.id.videoId !== undefined) {
            videoId = data.id.videoId;
            const video = await getVideoDetails(videoId);
            data.duration = video[0].contentDetails.duration;
            data.viewCount = video[0].statistics.viewCount;
          } else {
            continue;
          }
        }
        resolutionFunc(res.items);
      }).then((data) => {
        setLoading(false);
        setVideosChannel(data);
      });
    });
    await getPlaylists(channelId).then((res) => {
      setDataPlaylist(res);
    });
  }, []);

  function nextPage() {
    getMoreVideosChannel(channelId, nextPageVideosChannel).then((res) => {
      setNextPageVideosChannel(res.nextPageToken);
      new Promise(async (resolutionFunc, rejectionFunc) => {
        for (let data of res.items) {
          let videoId;
          if (data.id.videoId !== undefined) {
            videoId = data.id.videoId;
            const video = await getVideoDetails(videoId);
            data.duration = video[0].contentDetails.duration;
            data.viewCount = video[0].statistics.viewCount;
          } else {
            continue;
          }
        }
        resolutionFunc(res.items);
      }).then((data) => {
        setVideosChannel([...videosChannel, ...data]);
      });
    });
  }

  return (
    <div className="channel">
      <Grid container>
        <Grid item className="lg-2 md-2 sm-2 home__navbar" xs={2}>
          <NavBar />
        </Grid>
        <Grid
          item
          className="lg-10 md-10 sm-10 channel__content"
          xs={10}
          justify="space-around"
        >
          <div style={{ width: "102%" }} className={classes.root}>
            {data.map((item) => {
              return (
                <>
                  <div className="channel__banner">
                    <img
                      style={{
                        width: "100%",
                      }}
                      src={`${item.brandingSettings.image.bannerExternalUrl}=w2120-fcrop64=1,00005a57ffffa5a8-k-c0xffffffff-no-nd-rj`}
                    />
                  </div>
                  <div className="channel__intro">
                    <div className="channel__intro--logo">
                      <img
                        style={{ borderRadius: "50%" }}
                        alt="huyhero"
                        src={item.snippet.thumbnails.default.url}
                      />
                    </div>
                    <div className="channel__intro--title">
                      <p style={{ fontSize: "25px", fontWeight: "bold" }}>
                        {item.snippet.title}
                      </p>
                      <p
                        style={{ color: "rgb(0,0,0,0.66)" }}
                      >{`${ViewNumberFormatter(
                        item.statistics.subscriberCount
                      )} người đăng ký`}</p>
                    </div>
                    <div className="channel__intro--subscribe"></div>
                  </div>
                  <div className="channel__tabs">
                    <AppBar position="static">
                      <div className="tabs__header">
                        <Tabs
                          value={value}
                          onChange={handleChange}
                          aria-label="simple tabs example"
                        >
                          <Tab label="Videos" {...a11yProps(0)} />
                          <Tab label="Danh sách phát" {...a11yProps(1)} />

                          <Tab label="Giới thiệu" {...a11yProps(2)} />
                        </Tabs>
                      </div>
                    </AppBar>
                    {/* Videos */}
                    <TabPanel value={value} index={0}>
                      {loading ? (
                        <SkeletonVideoChannel />
                      ) : (
                        <InfiniteScroll
                          dataLength={videosChannel.length}
                          next={() => nextPage()}
                          hasMore={true}
                          loader={<SkeletonVideoChannelLoading />}
                        >
                          <div className="channel__videos">
                            {videosChannel.map((itemVideoChannel) => {
                              if (itemVideoChannel.duration !== undefined) {
                                return (
                                  <Link
                                    className="link"
                                    to={`/watch/${itemVideoChannel.id.videoId}`}
                                  >
                                    <div className="channel__videos--video">
                                      <div className="video__img">
                                        <img
                                          width="250px"
                                          src={
                                            itemVideoChannel.snippet.thumbnails
                                              .medium.url
                                          }
                                        />
                                        <div className="video__img--duration">
                                          <span style={{ padding: "5px" }}>
                                            {DurationVideoFormatter(
                                              itemVideoChannel.duration
                                            )}
                                          </span>
                                        </div>
                                      </div>

                                      <p className="limitline video__title">
                                        {itemVideoChannel.snippet.title}
                                      </p>
                                      <p className="text-opacity">
                                        {itemVideoChannel.snippet.channelTitle}
                                      </p>
                                      <p className="text-opacity">{`${ViewNumberFormatter(
                                        itemVideoChannel.viewCount
                                      )} lượt xem・${TimePublishToNow(
                                        itemVideoChannel.snippet.publishedAt
                                      )}`}</p>
                                    </div>
                                  </Link>
                                );
                              }
                            })}
                          </div>
                        </InfiniteScroll>
                      )}
                    </TabPanel>
                    {/* Playlist */}
                    <TabPanel value={value} index={1}>
                      <div className="channel__playlists">
                        {dataPlaylist.map((itemPlaylist) => {
                          const watchPlaylistItem = () => {
                            const playlistItem = getPlayplistItems(
                              itemPlaylist.id
                            ).then((res) => {
                              history.push({
                                pathname: `/watch/${res[0].snippet.resourceId.videoId}`,
                                search: `?playlist=${itemPlaylist.id}`,
                                state: {
                                  data: res,
                                },
                              });
                            });
                          };
                          if (
                            !itemPlaylist.snippet.thumbnails.default.url.includes(
                              "no_thumbnail"
                            )
                          ) {
                            return (
                              <div
                                style={{
                                  position: "relative",
                                  marginBottom: "10px",
                                  padding: "10px 25px",
                                }}
                                onClick={() => {
                                  watchPlaylistItem();
                                }}
                              >
                                <div className="playlist__item">
                                  <img
                                    className="playlist__img"
                                    src={
                                      itemPlaylist.snippet.thumbnails.medium.url
                                    }
                                  ></img>
                                  <div className="playlist__img--overlay">
                                    <p
                                      style={{
                                        fontSize: "25px",
                                        paddingBottom: "5px",
                                      }}
                                    >
                                      {itemPlaylist.contentDetails.itemCount}
                                    </p>
                                    <PlaylistPlay fontSize="large" />
                                  </div>
                                </div>
                                <div className="playlist__item--hover">
                                  <PlayArrow fontSize="large" />
                                  <p style={{ fontSize: "23px" }}>
                                    Phát tất cả
                                  </p>
                                </div>
                                <p style={{ width: "320px", fontSize: "20px" }}>
                                  {itemPlaylist.snippet.title}
                                </p>
                              </div>
                            );
                          }
                        })}
                      </div>
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                      <div className="channel__introduction">
                        <div className="channel__introduction--des">
                          <p className="des__text">Mô tả</p>
                          {item.snippet.description.split("\n").map((item) => {
                            return <>{item == "" ? <br /> : <p>{item}</p>}</>;
                          })}
                        </div>
                        <div className="channel__introduction--statistics">
                          <p className="des__text">Thống kê</p>
                          <hr className="hr--format" />
                          <p>
                            Đã tham gia{" "}
                            {TimeFormatter(item.snippet.publishedAt)}
                          </p>
                          <hr className="hr--format" />
                          <p>
                            {ViewNumberFormatterDetails(
                              item.statistics.viewCount
                            )}{" "}
                            lượt xem
                          </p>
                          <hr className="hr--format" />
                        </div>
                      </div>
                    </TabPanel>
                  </div>
                </>
              );
            })}
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
