import React from "react";
import PayProducts from "./PayProducts";
import "./cancelOrder.css";
import "./style.css";
import { useLocation, useNavigate } from "react-router-dom";
import UseGeneral from "../../hooks/useGeneral";
const CancelOrder = () => {
  const {language}=UseGeneral()
  const location=useLocation();
  console.log(location)
  const navigate=useNavigate()
  if(!location?.state){
    navigate("/profile")
  }
  return (
    <div className="cancel-container">
      {" "}
      <div className="right">
        <h1>{language=='ar'?'تم الغاء طلبك بنجاح':'Your order has been successfully cancelled'}</h1>
        <div className="info">
          <div className="d-column">
            <p>{language=='ar'?'حالة الطلب':'Order Status'}</p>
            <strong>{language=='ar'?'تم الالغاء':'Canceled'}</strong>
          </div>
          <div className="d-column">
            <p>{language=='ar'?'الاجمالي':'Total'}</p>
            <strong>{location?.state?.orderData.order_value} AED</strong>
          </div>
          <div className="d-column">
            <p>{language=='ar'?'عدد المشتريات':'Number Of Products'}</p>
            <strong>{location?.state?.orderData.order_value?.orderproducts?.length}</strong>
          </div>
          <div className="d-column">
            <p>{language=='ar'?'رقم الهاتف':'Phone'}</p>
            <strong>{location?.state?.orderData.phone}</strong>
          </div>
          <div className="d-column">
            <p>{language=='ar'?'رقم الطلب':'OrderNumber'}</p>
            <strong>{location?.state?.orderData.id}</strong>
          </div>

        </div>
        <button oncClick={()=>{
          navigate('/profile',{replace:true})
        }} style={{padding:'10px',borderRadius:'4px',backgroundColor:'#009418',color:'white'}}>{language=='ar'?'رجوع':"Go Back"}</button>
      </div>
      <div className="calcel-products ">
        <div className="left-container">
          <PayProducts
            products={location?.state?.orderData.orderproducts}
            style={{ background: "#FFEAED", border: "16px" }}
            dividerStyle={{ background: "white" }}
          />
        </div>
      </div>

    </div>
  );
};

export default CancelOrder;
