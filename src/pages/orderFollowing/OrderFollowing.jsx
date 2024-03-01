import React, { useEffect, useState } from 'react'
import { Right } from './Right'
import Left from './Left'
import "./style.css"
import { useLocation, useNavigate } from 'react-router-dom'
import { BASE_URL } from '../../Axios/base_url'
import { Axios } from '../../Axios'

const OrderFollowing = () => {
  const location=useLocation();
  const navigate=useNavigate()
  console.log(location?.state?.id);
  const [pageLoading,setPageLoading]=useState(false);
  const [orderData,setOrderData]=useState({});
  const getOrderData=()=>{
    setPageLoading(true)
    Axios({
      url: BASE_URL + `orders/get_order_by_id/${location?.state?.id}`,
      method: "GET",
    }).then((res) => {
    console.log(res)
    if(res.status=='success'){
      setOrderData(res.result)
    }
    }).finally(()=>{
      setPageLoading(false)
    });
  }
  // if(!location?.state){
  //   navigate(-1)
  // }
  useEffect(()=>{
    getOrderData()
  },[])
  return (
    <div className="following-details-container">
    <div className="main-content">
      <Right  orderData={orderData} />
      <Left  orderData={orderData}/>
    </div>
  </div>
  )
}

export default OrderFollowing
