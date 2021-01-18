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
import NavBar from "../../components/NavBar/NavBar";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import { getChannel, getPlaylists, getPlayplistItems } from "../../api/baseApi";
import { ViewNumberFormatter } from "../../utils/index";
import "./Channel.css";

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

  const history = useHistory();

  useEffect(async () => {
    await getChannel(channelId).then((res) => {
      // console.log("res", res);
      setData(res);
    });
    await getPlaylists(channelId).then((res) => {
      console.log("playlist", res);
      setDataPlaylist(res);
    });
  }, []);

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
          <div className={classes.root}>
            {data.map((item) => {
              return (
                <>
                  <div className="channel__banner">
                    <img
                      style={{
                        width: "1667px",
                        height: "270px",
                      }}
                      src={`${item.brandingSettings.image.bannerExternalUrl}=w2120-fcrop64=1,00005a57ffffa5a8-k-c0xffffffff-no-nd-rj`}
                    />
                  </div>
                  <div className="channel__intro">
                    <div className="channel__intro--logo">
                      <img
                        alt="huyhero"
                        src={item.snippet.thumbnails.default.url}
                      />
                    </div>
                    <div className="channel__intro--title">
                      <p>{item.snippet.title}</p>
                      <p>{`${ViewNumberFormatter(
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
                          <Tab label="Trang chủ" {...a11yProps(0)} />
                          <Tab label="Videos" {...a11yProps(1)} />
                          <Tab label="Danh sách phát" {...a11yProps(2)} />
                          <Tab label="Giới thiệu" {...a11yProps(3)} />
                        </Tabs>
                      </div>
                    </AppBar>
                    <TabPanel value={value} index={0}>
                      Trang chủ
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                      Videos
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                      <div className="channel__playlists">
                        {dataPlaylist.map((itemPlaylist) => {
                          // console.log("res", itemPlaylist);
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
                    <TabPanel value={value} index={3}>
                      <div className="channel__introduction">
                        <p className="introduction__des">Mô tả</p>
                        {item.snippet.description.split("\n").map((item) => {
                          return <>{item == "" ? <br /> : <p>{item}</p>}</>;
                        })}
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
