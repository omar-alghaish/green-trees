import React, { useState } from 'react';
import "./style.css";
import { useNavigate } from 'react-router-dom';
import { Axios } from '../../Axios';
import { BASE_URL } from '../../Axios/base_url';
import toast from 'react-hot-toast';
import { Spinner } from 'react-bootstrap';
const Checkoutcartdetails = ({ totalPrice, totalQuantity, language, cart,total_check ,getUserData,getMe}) => {
  const navigate = useNavigate();
  const [promoCode,setPromoCode]=useState('');
  const [promoLoading,setPromoLoading]=useState(false)
  const handleMakeDiscount=()=>{
    setPromoLoading(true)
    const data_send={
      code:promoCode
    }
    Axios({
      url: BASE_URL + "coupons/use_coupon",
      method: "post",
      data:data_send
    }).then((res)=>{
      console.log(res)
      if(res.message=="Sission Ended Login Again"){
        toast.error(res.message)
      }
      if(res.status=='success'){
        toast.success(res.message)
        getUserData()
        getMe()
      }
      else {
        console.log('erer')
        toast.error(res.message);
      }
      console.log(res)
    }).finally(()=>{
      setPromoLoading(false)
    })
  }
  return (
    <div className="checkoutcartdetails">
      <div className="allPrice">
        <span>{language == "ar" ? "الإجمالي" : "Total"}</span>
        <span>Aed {total_check}</span>
      </div>
      <p>
        {language == "ar"
          ? "غير شامل رسوم التوصيل"
          : "Delivery fees not included"}
      </p>
      <input
        onChange={(e)=>{
          setPromoCode(e.target.value);
        }}
        type="text"
        className="copounDesign"
        placeholder={language == "ar" ? "أضف البروموكود" : "Add Promo Code"}
      />
      {
        promoLoading?
        <Spinner/>
        :
        (
          <button
            onClick={()=>{
              handleMakeDiscount()
            }}
            className='btn btn-primary mb-4'>
            {language=='ar'?'خصم':'Dicount'}
          </button>
        )
      }
      <button className="cartPay" onClick={() => navigate("/pay-details")}>
        {language == "ar" ? "الدفع" : "Pay"}
      </button>
    </div>
  );
};

export default Checkoutcartdetails;
