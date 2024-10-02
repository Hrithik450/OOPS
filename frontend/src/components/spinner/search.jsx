import React, { useState } from "react";
import "./search.css";
import { IoSearch } from "react-icons/io5";

const SearchBox = ({ handleQuery }) => {
  const [query, setQuery] = useState("");

  return (
    <form className="search-form">
      <input
        type="text"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          handleQuery(e.target.value);
        }}
        placeholder="Search anything..."
        className="search-input"
      />
      <button type="submit" className="search-button">
        <span>
          <IoSearch />
        </span>
      </button>
    </form>
  );
};

export default SearchBox;
