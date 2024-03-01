import React from "react";
import "./left.css";
import Account from "../Account/Account";
import Location from "../location/Location";
import Orders from "../orders/Orders";
import Wallet from "../wallet/Wallet";
import Coupons from "../coupons/Coupons";
import Card from "../card/Card";
const Left = ({ currentPage, userData, getUserInfo }) => {
  console.log(currentPage);
  return (
    <div className="left_page">
      {currentPage === "account" ? (
        <Account userData={userData} getUserInfo={getUserInfo} />
      ) : currentPage === "location" ? (
        <Location userData={userData} />
      ) : currentPage === "orders" ? (
        <Orders />
      ) : currentPage === "wallet" ? (
        <Wallet />
      ) : currentPage === "coupons" ? (
        <Coupons />
      ) : currentPage === "card" ? (
        <Card />
      ) : null}
    </div>
  );
};

export default Left;
