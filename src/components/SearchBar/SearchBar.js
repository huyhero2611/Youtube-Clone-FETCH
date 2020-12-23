import React, { useCallback, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { SearchRequest, getMostPopularVideos } from "../../api/baseApi";
import { TextField, Button } from "@material-ui/core";
import { Search } from "@material-ui/icons";
import "./SearchBar.css";

SearchBar.propTypes = {};

function SearchBar(props) {
  const [search, setSearch] = useState("");

  const handleSubmit = (e) => {
    // baseApi
    //   .get("/search", {
    //     params: {
    //       q: search,
    //     },
    //   })
    //   .then((res) => {
    //     const test = res.data.items.map((test1, index) => {
    //       console.log(test1.snippet);
    //       setSearch("");
    //     });
    //   });
    const test = SearchRequest(search);
    const test2 = getMostPopularVideos();
    console.log(test);
    console.log("haha");
    console.log(test2);
    e.preventDefault();
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)} className="searchbar-main">
      <div className="searchbar-input">
        <TextField
          value={search}
          fullWidth
          label="Search"
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
      </div>
      <Button
        variant="contained"
        color="primary"
        startIcon={
          <Search style={{ fontSize: "3vmin", marginLeft: "1vmin" }} />
        }
        style={{ marginTop: "1vmin", marginLeft: "1vmin" }}
        type="submit"
      ></Button>
    </form>
  );
}

export default SearchBar;
