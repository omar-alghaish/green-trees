import React, { useState } from "react";
import UseGeneral from "../../hooks/useGeneral";
import VerificationInput from "react-verification-input";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router";
import "./confpage.css";
import { Axios } from "../../Axios";
import { BASE_URL } from "../../Axios/base_url";
import { ThreeCircles, ThreeDots } from "react-loader-spinner";

const ConePage = () => {
  const { language } = UseGeneral();
  const navigate = useNavigate();
  const location = useLocation();
  const [code, setCode] = useState();
  const [loading, setLoading] = useState(false);

  const [current, setCurrent] = useState(66);
  if (!location.state) {
    navigate(-1);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    Axios({
      url: BASE_URL + "user/check_verf_code",
      method: "POST",
      data: { phone: location.state.phone, code },
    })
      .then((res) => {
        console.log(res);
        if (res.message == "Sission Ended Login Again") {
          toast.error(res.message);
        }
        if (res.status == "success") {
          toast.success(res.message);

          navigate("/newpass", {
            state: { phone: location.state.phone },
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
    <div className="conf_page">
      <div className="conf_content">
        <div className="right">
          <img src={require("../../assets/images/pana.png")} alt="" />
        </div>
        <div className="left">
          {language == "ar" ? <h4>رمز التحقق</h4> : <h4>Conformation Code</h4>}
          {language == "ar" ? (
            <p>
              تم إرسال الرمز إلى رقم <span>{location?.state?.phoneNumber}</span>
            </p>
          ) : (
            <p>
              The code has been sent to a number:{" "}
              <span>{location?.state?.phoneNumber}</span>
            </p>
          )}
          {language == "ar" ? (
            <p>
              الرقم غير صحيح؟ <span>تغيير</span>
            </p>
          ) : (
            <p>
              Number is Incorrect{" "}
              <span style={{ cursor: "pointer" }}>Change</span>
            </p>
          )}
          <h5>{language == "ar" ? "أدخل رمز التحقق" : "Enter Confirm Code"}</h5>
          <div className="inputs">
            <VerificationInput onChange={(e) => setCode(e)} />
          </div>
          {language == "ar" ? (
            <p className="resend">إعادة إرسال الرمز 0.51</p>
          ) : (
            <p className="resend">Resend Code After 0.51</p>
          )}
          {loading ? (
            <div className="loading">
              <ThreeCircles />
            </div>
          ) : (
            <button onClick={handleSubmit}>
              {language == "ar" ? "التحقق" : "Confirm"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConePage;
