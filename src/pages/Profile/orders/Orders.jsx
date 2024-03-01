import React, { useEffect, useState } from "react";
import "./orders.css";
import OrderCard from "./OrderCard";
import { Axios } from "../../../Axios";
import { BASE_URL } from "../../../Axios/base_url";
import { Spinner } from "react-bootstrap";
import UseGeneral from "../../../hooks/useGeneral";
const Orders = () => {
  const [pageLoading, setPageLoading] = useState(false);
  const [activeTab, setActiveTab] = useState({
    title: language == "ar" ? "الحاليه" : "Current",
    id: 0,
    status: "onProgress",
  });
  const { language } = UseGeneral();

  const [orders, setOrders] = useState([]);
  // console.log(setOrders)
  const [filterdOrders, setFilterdOrders] = useState([]);
  const tabs = [
    {
      title: language == "ar" ? "الحاليه" : "Current",
      id: 0,
      status: "onProgress",
    },
    {
      title: language == "ar" ? "المكتمله" : "Completed",
      id: 1,
      status: "completed",
    },
    {
      title: language == "ar" ? "الملغيه" : "Canceled",
      id: 2,
      status: "canceled",
    },
  ];

  const getUserOrders = () => {
    setPageLoading(true);
    Axios({
      url: BASE_URL + `orders/get_order_by_status/${activeTab.id}`,
      method: "GET",
    })
      .then((res) => {
        // console.log(res,"weew")
        if (res.status == "success") {
          if (Array.isArray(res.result)) {
            setOrders(res.result);
          }
        }
      })
      .finally(() => {
        setPageLoading(false);
      });
  };

  useEffect(() => {
    const filterdData = orders.filter(
      (order) => order.status === activeTab.status
    );
    setFilterdOrders(filterdData);
  }, []);

  useEffect(() => {
    const filterdData = orders.filter(
      (order) => order.status === activeTab.status
    );
    setFilterdOrders(filterdData);
    getUserOrders();
  }, [activeTab]);

  const handleActiveTab = (e, tab) => {
    setActiveTab(tab);
  };
  // useEffect(()=>{
  //   getUserOrders()
  // },[])
  return (
    <div className="orders-container">
      <h2 className="title">{language == "ar" ? "طلباتي" : "My orders"}</h2>
      <div className="tabs mb-2">
        {tabs.map((tab, index) => (
          <div
            className={`tab ${activeTab?.title === tab.title && "active"}`}
            onClick={(e) => handleActiveTab(e, tab)}
          >
            {tab.title}
          </div>
        ))}
      </div>
      {pageLoading ? (
        <Spinner />
      ) : (
        <div className="orders">
          {orders.map((order) => (
            <OrderCard data={order} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
