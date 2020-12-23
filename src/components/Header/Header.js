import React, { useCallback, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import baseApi from "../../api/baseApi";
import "./Header.css";
import Logo from "../../assets/logo.png";
import SearchBar from "../SearchBar/SearchBar";

Header.propTypes = {};

function Header(props) {
  return (
    <div className="header">
      <div className="header-main">
        <div className="header-logo">
          <img src={Logo} width="80vmin" height="auto" />
          <div>
            <span>CLONE</span>
          </div>
        </div>
        <div className="header-searchbar">
          <SearchBar />
        </div>
        <div className="header-info"></div>
      </div>
    </div>
  );
}

export default Header;
