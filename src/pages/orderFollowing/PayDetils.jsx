import React from "react";
import UseGeneral from "../../hooks/useGeneral";
import Breadcrumb from "../../components/BreadCumbsLinks";
import { Right } from "./Right";
import Left from "./Left";
import "./style.css";
const PayDetils = () => {
  const { language } = UseGeneral();
  const breadCrumbsLinks = [
    {
      name: language != "ar" ? "Cart" : " < العوده الي العربه",
      path: "/Cart",
      active: true,
    },
  ];
  return (
    <div className="pay-details-container">
      <Breadcrumb links={breadCrumbsLinks} />
      <div className="main-content">
        <Right />
        <Left />
      </div>
    </div>
  );
};

export default PayDetils;
