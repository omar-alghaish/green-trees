import React from "react";
import {useNavigate} from "react-router-dom"
import "./style.css"
import UseGeneral from "../../hooks/useGeneral";
import moment from "moment";

const PayCard = ({orderData}) => {
  const {language}=UseGeneral();
  const navigate = useNavigate()

  return (
    <div className="pay-card-container">
      <div className="d-flex">
        <p className="info-item">{language=='ar'?'رقم الطلب:':'Order Number'}</p>
        <span className="price">
          <strong>{orderData.id}</strong>
        </span>
      </div>
      <div className="d-flex">
        <p className="info-item">{language=='ar'?'رقم الهاتف:':'Phone'}</p>
        <span className="price">
          <strong>{orderData.phone}</strong>
        </span>
      </div>
      <div className="d-flex">
        <p className="info-item">{language=='ar'?'عدد المشتريات:':'Number Of Products'}</p>
        <span className="price">
          <strong>{orderData.orderproducts&&orderData.orderproducts.length}</strong>
        </span>
      </div>

      <div className="d-flex">
        <p className="info-item">{language=='ar'?'متوقع الوصول:':'Expected arrival:'}</p>
        <span className="price">
          <strong>{moment(orderData.order_time).format("L")}</strong>
        </span>
      </div>
      <div className="d-flex">
        <p className="info-item">{language=='ar'?'وسيلة الدفع:':'Payment Method'}</p>
        <span className="price">
          <strong>{orderData.pay_type='cash'?
            language=='ar'?
            'دفع عن طريق الفيزا'
            :
            'By Visa'
          :
          language=='ar'?
          'نقدا عند الاستلام'
          :
          'After Delivery'
          }</strong>
        </span>
      </div>
      <div className="d-flex">
        <p className="info-item">الاجمالي:</p>
        <span className="price">
          <strong>{orderData.order_value} AED</strong>
        </span>
      </div>

    </div>
  );
};

export default PayCard;
