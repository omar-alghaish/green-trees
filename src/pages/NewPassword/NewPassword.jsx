import React, { useState } from "react";
import "./newpassword.css";
import UseGeneral from "../../hooks/useGeneral";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { useNavigate, useLocation } from "react-router-dom";
import { Axios } from "../../Axios";
import { BASE_URL } from "../../Axios/base_url";
import toast from "react-hot-toast";

const NewPassword = () => {
  const [showPass, setShowPass] = useState(false);
  const [showConfPass, setShowConfPass] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { language } = UseGeneral();
  const navigate = useNavigate();
  const location = useLocation();
  const [passwordError, setPasswordError] = useState("");
  const [passError, setPassError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password.length < 8) {
      setPassError(
        language === "ar"
          ? "يجب الا تقل كبمة المرور عن 8"
          : "password must be at least 8"
      );
      return;
    }

    if (password !== confirmPassword) {
      setPasswordError(
        language === "ar" ? "كلمات السر غير متطابقة" : "Passwords do not match"
      );
      return;
    }

    setLoading(true);
    Axios({
      url: BASE_URL + "user/update_password",
      method: "POST",
      data: { phone: location.state.phone, password },
    })
      .then((res) => {
        console.log(res);
        if (res.message === "Sission Ended Login Again") {
          toast.error(res.message);
        }
        if (res.status === "success") {
          toast.success(res.message);
          navigate("/login", {});
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
    <div className="newpass_page">
      <div className="newpass_content">
        <div className="right">
          <img src={require("../../assets/images/pana.png")} alt="" />
        </div>
        <div className="left">
          <h5>
            {language === "ar"
              ? "إنشاء كلمة مرور جديدة"
              : "Create New Password"}
          </h5>
          {language === "ar" ? (
            <p>
              يجب أن تكون كلمة المرور الجديدة فريدة وغير متشابهة مع الكلمات
              المستخدمة سابقًا.
            </p>
          ) : (
            <p>
              New Password Keyword Must Be Uniq And Not Similar With Old Keyword
            </p>
          )}
          <form action="">
            <div>
              <input
                className="form-control"
                type={!showPass ? "password" : "text"}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={
                  language === "ar"
                    ? "أدخل كلمة مرور جديده"
                    : "Enter New Password"
                }
              />
              {showPass ? (
                <IoEyeOutline
                  onClick={() => {
                    setShowPass(!showPass);
                  }}
                />
              ) : (
                <IoEyeOffOutline
                  onClick={() => {
                    setShowPass(!showPass);
                  }}
                />
              )}
            </div>
            {passError && (
              <p className="password-error" style={{ color: "rgb(255,0,0)" }}>
                {passError}
              </p>
            )}
            <div>
              <input
                className="form-control"
                type={!showConfPass ? "password" : "text"}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  setPasswordError(""); // Clear password error when typing in the confirm password field
                }}
                placeholder={
                  language === "ar" ? "إعادة الإدخال" : "Enter It Again"
                }
              />
              {showConfPass ? (
                <IoEyeOutline
                  onClick={() => {
                    setShowConfPass(!showConfPass);
                  }}
                />
              ) : (
                <IoEyeOffOutline
                  onClick={() => {
                    setShowConfPass(!showConfPass);
                  }}
                />
              )}
            </div>
            {passwordError && (
              <p className="password-error" style={{ color: "rgb(255,0,0)" }}>
                {passwordError}
              </p>
            )}
            <button onClick={handleSubmit}>
              {language === "ar" ? "تغيير" : "change"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewPassword;
