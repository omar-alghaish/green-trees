import React, { useEffect, useState } from "react";
import "./wallet.css";
import { Axios } from "../../../Axios";
import { BASE_URL } from "../../../Axios/base_url";
import { ThreeCircles } from "react-loader-spinner";
import UseGeneral from "../../../hooks/useGeneral";
const Wallet = () => {
  const { language } = UseGeneral();

  const data = [
    {
      number: "RTV2243A",
      date: "10/01/2024",
      totalPrice: "40.00",
    },
    {
      number: "RTV2243A",
      date: "10/01/2024",
      totalPrice: "40.00",
    },
    {
      number: "RTV2243A",
      date: "10/01/2024",
      totalPrice: "40.00",
    },
  ];
  const [pageLoading, setPageLoading] = useState(false);
  return (
    <div className="wallet-container">
      <div className="top-title">
        <h4 className="title">
          {language == "ar" ? "الرصيد الكلي" : "Total balance"}
        </h4>
        <h2>10.00 AED</h2>
      </div>
      <div className="cards">
        {pageLoading ? (
          <ThreeCircles />
        ) : (
          data?.map((item) => (
            <div className="item-card">
              <div>
                {" "}
                {language == "ar" ? "رقم الطلب" : "Order number"} {item?.number}
              </div>
              <div className="center">
                <span>{item.date}</span>
                <div className="price">{item.totalPrice} AED</div>{" "}
              </div>
              <div className="return-button">
                {language == "ar" ? "استرداد" : "Refund"}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Wallet;
