import React, { useState } from "react";
import { Search } from "@material-ui/icons";
import "./SearchBar.css";
import { Link, Redirect } from "react-router-dom";

function SearchBar(props) {
  const [search, setSearch] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)} className="searchbar">
      <input
        type="text"
        placeholder="Tìm kiếm"
        className="searchbar__input"
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />
      <Link to={{ pathname: `/result/${search}` }}>
        <button type="submit" className="searchbar__btn">
          <Search style={{ fontSize: "3vmin" }} />
        </button>
      </Link>
    </form>
  );
}

export default SearchBar;
