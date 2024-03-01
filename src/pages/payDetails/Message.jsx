import React, { useEffect, useState } from "react";
import img from "../../assets/images/image.png";
import "./message.css"
import {useLocation, useNavigate} from "react-router-dom"
import UseGeneral from "../../hooks/useGeneral";
import { Axios } from "../../Axios";
import { BASE_URL } from "../../Axios/base_url";
import toast from "react-hot-toast";
const Message = () => {
  const { language } = UseGeneral();
  const location=useLocation();
    console.log(location)
    const [email,setEmail]=useState('');
    const navigate = useNavigate()
    const handleFollowOrderButton = ()=>{
      navigate('/order-following',{state:{id:location?.state?.order.id}})
    }
    const handleContinueShoping = ()=>{
        navigate("/")
    }
    const getMeData=()=>{
      Axios({
        url: BASE_URL + "user/me",
        method: "POST",
      }).then((res)=>{
        console.log(res)
        if(res.message=="Sission Ended Login Again"){
          toast.error(res.message)
        }
        if(res.status=='success'){
          setEmail(res.result.email)
          // setCartTotalPrice(res.result.cart_total_price*1-res.result.money_minus*1);
        }
      }).finally(()=>{
        // setPageLoading(false)
      }).catch(e=>{
        console.log(e)
      })
    }

    useEffect(()=>{
      getMeData()
    },[])

  return (
    <div className="message-container">
      <div className="img-container">
        <img src={img} alt="" />
      </div>
      <div className="content">
        <h1>{language=='ar'?'شكرا علي طلبك':'Thank You For Your Order'}</h1>
        <div className="content-text">
          {
            language=='ar'?
            <>
              نحن نقوم الآن بتحضير طلبك رقم<strong>{location?.state?.order?.phone}</strong> . و سيتم إرسال
              نسخة من الفاتورة إالي <strong>{email}</strong>
            </>
            :
            <>
              We are now preparing your order No. {location?.state?.order?.phone} And will be sent
              A copy of the invoice to {email}
            </>
          }
        </div>
        <div className="buttons-container">
          <button onClick={handleFollowOrderButton}>{language=='ar'?'تتبع طلبك':'Follow Order'}</button>
          <button onClick={()=>{
            navigate('/',{replace:true})
          }}>{language=='ar'?'استكمال التسوق':'Complete your shopping'}</button>
        </div>
      </div>
    </div>
  );
};

export default Message;
