import React, { useState } from "react";
import "./forget.css";
import UseGeneral from "../../hooks/useGeneral";
import { useNavigate } from "react-router";
import { Axios } from "../../Axios";
import { BASE_URL } from "../../Axios/base_url";
import toast from "react-hot-toast";
import { ThreeCircles, ThreeDots } from "react-loader-spinner";

const Forget = () => {
  const navigate = useNavigate();
  const { language } = UseGeneral();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    Axios({
      url: BASE_URL + "user/send_verf_code",
      method: "POST",
      data: { phone: phoneNumber },
    })
      .then((res) => {
        console.log(res);
        if (res.message == "Sission Ended Login Again") {
          toast.error(res.message);
        }
        if (res.status == "success") {
          toast.success(res.message);
          let firstSec = phoneNumber.slice(0, 3);
          let secSec = phoneNumber.slice(5, 8);
          navigate("/confnumber", {
            state: {
              phoneNumber: firstSec + "**" + secSec,
              phone: phoneNumber,
            },
          });
        }
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="forget_page">
      <div className="forget_content">
        <div className="right">
          <img src={require("../../assets/images/pana.png")} alt="" />
        </div>
        <div className="left">
          <h4>
            {language == "ar" ? "نسيت كلمة المرور؟" : "Forgot your password"}
          </h4>
          <p>
            {language == "ar"
              ? "لا داعي للقلق! يرجى إدخال رقم الهاتف الصحيح حتي يتم إرسال رمز التحقق له"
              : "Do not worry! Please enter the correct phone number so that a verification code will be sent to it"}
          </p>
          <form onSubmit={handleSubmit} action="">
            <input
              onChange={(e) => {
                setPhoneNumber(e.target.value);
              }}
              className="form-control"
              type="text"
              placeholder={
                language == "ar" ? "أدخل رقم الهاتف" : "Enter Your Phone"
              }
            />
            {loading ? (
              <div className="loading">
                <ThreeCircles />
              </div>
            ) : (
              <button type="submit">
                {language == "ar" ? "إرسال الرمز" : "Resend"}
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Forget;
