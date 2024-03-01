import React from "react";
import "./style.css";
import { searchIcon } from "../../../assets/svgIcons";
import UseGeneral from "../../../hooks/useGeneral";
const SearchBox = () => {
  const { language } = UseGeneral();
  return (
    <div className="searchBox">
      <input
        type="search"
        name=""
        id=""
        placeholder={
          language?.toLowerCase() == "ar"
            ? "أبحث عن منتجات, أصناف, و أكثر"
            : "Search for products, items, and more"
        }
      />
      <button className="btn-search">{searchIcon}</button>
    </div>
  );
};

export default SearchBox;
