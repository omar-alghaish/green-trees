import React from "react";
import UseGeneral from '../../../hooks/useGeneral';
import moment from "moment";
import { useNavigate } from "react-router-dom";

const OrderCard = ({ data }) => {
  const navigate=useNavigate();
  const { language } = UseGeneral();
  return (
    <div className="orderCard-container">
      <div className="status-title">
        {data?.order_status =='pending'
        ?
        language=='ar'?'قيد المراجعه':'Pending'
        :
        data?.order_status =='canceled'?
        language=='ar'?'ملغى':'canceled'
        :
        data?.order_status =='rejected'?
        language=='ar'?'ملغى':'canceled'
        :
        data?.order_status =='completed'?
        language=='ar'?'مكتمل':'completed'
        :
        language=='ar'?'فى التوصيل':'In Delivery'
      }
      </div>
      <div className="info">
        <div className="detail">
          <p>{language=='ar'?'رقم الطلب':'Order Number'}</p>
          <strong>{data?.id}</strong>
        </div>
        <div className="detail">
          <p>{language=='ar'?'تاريخ الطلب':'Order Date'}</p>
          <strong>{moment(data?.order_time).format('L')}</strong>
        </div>
        <div className="detail">
          <p>{language=='ar'?'اجمالي الطلب':'Total Order'}</p>
          <strong>{data?.order_value} AED</strong>
        </div>
      </div>
      <button onClick={(e)=>{
        navigate('/order-following',{state:{id:data.id}})
      }} className="follow-order-button">{language=='ar'?'تتبع الطلب':'Follow Order'}</button>
    </div>
  );
};

export default OrderCard;
