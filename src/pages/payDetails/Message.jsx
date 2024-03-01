import React from "react";
import img from "../../assets/images/image.png";
import "./message.css"
import {useNavigate} from "react-router-dom"
const Message = () => {
    const navigate = useNavigate()
    const handleFollowOrderButton = ()=>{
        navigate("/order-following")
    }
    const handleContinueShoping = ()=>{
        navigate("/")
    }
  return (
    <div className="message-container">
      <div className="img-container">
        <img src={img} alt="" />
      </div>
      <div className="content">
        <h1>شكرا علي طلبك</h1>
        <div className="content-text">
          نحن نقوم الآن بتحضير طلبك رقم<strong>5635f23</strong> . و سيتم إرسال
          نسخة من الفاتورة إالي <strong>zain_22@gmail.com </strong>
        </div>
        <div className="buttons-container">
          <button onClick={handleFollowOrderButton}>تتبع طلبك</button>
          <button onClick={handleContinueShoping}>استكمال التسوق</button>
        </div>
      </div>
    </div>
  );
};

export default Message;
