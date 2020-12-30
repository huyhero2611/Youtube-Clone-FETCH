import React, { useEffect, useState } from "react";
import {
  MenuList,
  MenuItem,
  ListItemIcon,
  Typography,
  Menu,
} from "@material-ui/core";
import {
  Home,
  Whatshot,
  Subscriptions,
  VideoLibrary,
  Visibility,
  OndemandVideo,
  WatchLater,
  ThumbUp,
} from "@material-ui/icons";
import "./NavBar.css";

function NavBar(props) {
  return (
    <div>
      <div className="navbar">
        <MenuList>
          <MenuItem className="navbar__item">
            <div className="navbar__icons">
              <Home fontSize="small" className="navbar-icon" />
            </div>
            <p>Trang chủ</p>
          </MenuItem>
          <MenuItem className="navbar__item">
            <span className="navbar__icons">
              <Whatshot fontSize="small" className="navbar-icon" />
            </span>
            <p>Thịnh hành</p>
          </MenuItem>
          <MenuItem className="navbar__item">
            <span className="navbar__icons">
              <Subscriptions fontSize="small" className="navbar-icon" />
            </span>
            <p>Kênh đăng ký</p>
          </MenuItem>

          <hr />

          <MenuItem className="navbar__item">
            <span className="navbar__icons">
              <VideoLibrary fontSize="small" className="navbar-icon" />
            </span>
            <p>Thư viện</p>
          </MenuItem>
          <MenuItem className="navbar__item">
            <span className="navbar__icons">
              <Visibility fontSize="small" className="navbar-icon" />
            </span>
            <p>Video đã xem</p>
          </MenuItem>
          <MenuItem className="navbar__item">
            <span className="navbar__icons">
              <OndemandVideo fontSize="small" className="navbar-icon" />
            </span>
            <p>Video của bạn</p>
          </MenuItem>
          <MenuItem className="navbar__item">
            <span className="navbar__icons">
              <WatchLater fontSize="small" className="navbar-icon" />
            </span>
            <p>Xem sau</p>
          </MenuItem>
          <MenuItem className="navbar__item">
            <span className="navbar__icons">
              <ThumbUp fontSize="small" className="navbar-icon" />
            </span>
            <p>Video đã thích</p>
          </MenuItem>
        </MenuList>
      </div>
      {/* <div className="navbar__overlay"></div> */}
    </div>
  );
}

export default NavBar;
