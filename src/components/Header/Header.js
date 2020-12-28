import React, { useCallback, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import baseApi from "../../api/baseApi";
import "./Header.css";
import Logo from "../../assets/logo.png";
import SearchBar from "../SearchBar/SearchBar";
import { Avatar } from "@material-ui/core";
import { Link } from "react-router-dom";
import { Menu } from "@material-ui/icons";

Header.propTypes = {};

function Header(props) {
  return (
    <div className="header">
      <div className="header__logo">
        <div className="header__logo--btn">
          <Menu style={{ width: "30px", height: "30px" }} />
        </div>
        <Link to={`/`}>
          <img src={Logo} width="80vmin" height="auto" />
        </Link>
        <div>
          <span>CLONE</span>
        </div>
      </div>
      <div className="header__searchbar">
        <SearchBar />
      </div>
      <div className="header__info">
        <Avatar
          style={{ marginRight: "20px", backgroundColor: "#42b9e0" }}
          alt="Huyhero"
          src="/assets/favicon_144x144.png"
        />
      </div>
    </div>
  );
}

export default Header;
