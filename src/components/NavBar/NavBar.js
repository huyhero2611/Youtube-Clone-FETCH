import React from "react";
import PropTypes from "prop-types";
import {
  MenuList,
  MenuItem,
  ListItemIcon,
  Typography,
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

NavBar.propTypes = {};

function NavBar(props) {
  return (
    <div>
      <MenuList>
        <MenuItem className="navbar-item">
          <span className="navbar-icons">
            <Home fontSize="small" className="navbar-icon" />
          </span>
          <p>Trang chủ</p>
        </MenuItem>
        <MenuItem className="navbar-item">
          <span className="navbar-icons">
            <Whatshot fontSize="small" className="navbar-icon" />
          </span>
          <p>Thịnh hành</p>
        </MenuItem>
        <MenuItem className="navbar-item">
          <span className="navbar-icons">
            <Subscriptions fontSize="small" className="navbar-icon" />
          </span>
          <p>Kênh đăng ký</p>
        </MenuItem>

        <hr />

        <MenuItem className="navbar-item">
          <span className="navbar-icons">
            <VideoLibrary fontSize="small" className="navbar-icon" />
          </span>
          <p>Thư viện</p>
        </MenuItem>
        <MenuItem className="navbar-item">
          <span className="navbar-icons">
            <Visibility fontSize="small" className="navbar-icon" />
          </span>
          <p>Video đã xem</p>
        </MenuItem>
        <MenuItem className="navbar-item">
          <span className="navbar-icons">
            <OndemandVideo fontSize="small" className="navbar-icon" />
          </span>
          <p>Video của bạn</p>
        </MenuItem>
        <MenuItem className="navbar-item">
          <span className="navbar-icons">
            <WatchLater fontSize="small" className="navbar-icon" />
          </span>
          <p>Xem sau</p>
        </MenuItem>
        <MenuItem className="navbar-item">
          <span className="navbar-icons">
            <ThumbUp fontSize="small" className="navbar-icon" />
          </span>
          <p>Video đã thích</p>
        </MenuItem>
      </MenuList>
    </div>
  );
}

export default NavBar;
