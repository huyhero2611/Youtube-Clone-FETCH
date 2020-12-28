import React, { useCallback, useState } from "react";
import { SearchRequest, getMostPopularVideos } from "../../api/baseApi";
import { TextField, Button } from "@material-ui/core";
import { Search } from "@material-ui/icons";
import "./SearchBar.css";

function SearchBar(props) {
  const [search, setSearch] = useState("");

  const handleSubmit = (e) => {
    const test = SearchRequest(search);
    const test2 = getMostPopularVideos();
    console.log("searchbar", test);
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
      <button type="submit" className="searchbar__btn">
        <Search style={{ fontSize: "3vmin" }} />
      </button>
    </form>
  );
}

export default SearchBar;
