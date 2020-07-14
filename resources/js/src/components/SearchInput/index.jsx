import React, { useState, useEffect } from "react";

import searchIcon from "@/assets/images/icons/search.svg";

import "./search.scss";

const Search = ({ iconVisibility = true, ...props }) => {
  const onFocus = ({ target }) => target.parentNode.classList.add("focus");
  const onBlur = ({ target }) => target.parentNode.classList.remove("focus");
  const events = { onFocus, onBlur };
  return (
    <label className="search">
      {iconVisibility && (
        <div className="search__icon">
          <img src={searchIcon} alt="" />
        </div>
      )}
      <input type="search" {...props} {...events} />
    </label>
  );
};

export default Search;
