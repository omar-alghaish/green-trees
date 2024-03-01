import React, { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom"
import { BASE_URL } from "../../Axios/base_url";
import { Axios } from "../../Axios";
import toast from "react-hot-toast";
import UseGeneral from "../../hooks/useGeneral";
import { ThreeDots } from "react-loader-spinner";

const PayCard = ({handleConfirm,addLoading}) => {
  const navigate = useNavigate()
  const { language } = UseGeneral();
  const [pageLoading,setPageLoading]=useState(false)
  // const handleConfirm = ()=>{
  //   navigate("/success")
  // }
  const [cartTotalPrice,setCartTotalPrice]=useState(0);
  const [discount,setDiscount]=useState(0);
  const [cartData,setCartsData]=useState([]);
  const getUserData=()=>{
    setPageLoading(true)
    Axios({
      url: BASE_URL + "cart/all_carts_for_user",
      method: "GET",
    }).then((res)=>{
      console.log(res,"eww")
      if(res.message=="Sission Ended Login Again"){
        toast.error(res.message)
      }
      if(Array.isArray(res.result)){
        setCartsData(res.result.carts)
      }
    }).finally(()=>{
      setPageLoading(false)
    })
  }
  const getMeData=()=>{
    Axios({
      url: BASE_URL + "user/me",
      method: "POST",
    }).then((res)=>{
      if(res.message=="Sission Ended Login Again"){
        toast.error(res.message)
      }
      if(res.status=='success'){
        setDiscount(res.result.money_minus*1)
        setCartTotalPrice(res.result.cart_total_price*1);
      }
    }).finally(()=>{
      setPageLoading(false)
    }).catch(e=>{
      console.log(e)
    })
  }
  useEffect(()=>{
    getUserData()
    getMeData()
  },[])
  return (
    <div className="pay-card-container">
      <div className="d1-flex">
        <p>{language=='ar'?'اجمالي المنتجات':'Total Products'}</p>
        <span className="price">
          <strong>{cartTotalPrice}</strong> AED
        </span>
      </div>
      <div className="d1-flex">
        <p>{language=='ar'?'التوصيل':'Delivary'}</p>
        <span className="price">
          <strong>40</strong> AED
        </span>
      </div>
      <div className="d1-flex">
        <p>{language=='ar'?'الخصم':'Discount'}</p>
        <span className="price">
          <strong>{discount}</strong> AED
        </span>
      </div>
      <div className="dash"></div>
      <div className="d1-flex">
        <strong>{language=='ar'?'الاجمالي':'Total'}:</strong>
        <span className="price totalPrice">
          <strong className="totalPriceNum">{cartTotalPrice-discount+40}</strong> AED
        </span>
      </div>
      {
        addLoading?
        <ThreeDots/>:
        <button className="send-request-button" onClick={handleConfirm}>
        {
          language=='ar'?
          'ارسال الطلب'
          :
          'Send Order'
        }
      </button>
      }
    </div>
  );
};

export default PayCard;
