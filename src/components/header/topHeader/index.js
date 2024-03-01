import React from "react";
import "./style.css";
import SearchBox from "../searchBox";
import HeaderIcons from "../headerIcons";
import { useNavigate } from "react-router-dom";
const TopHeader = () => {
  const navigate = useNavigate();

  return (
    <div className="rowDiv">
      <div className="logo" onClick={() => navigate("/")}>
        <img src={require("../../../assets/images/logo.png")} alt="" />
      </div>
      <SearchBox />
      <HeaderIcons />
    </div>
  );
};

export default TopHeader;
