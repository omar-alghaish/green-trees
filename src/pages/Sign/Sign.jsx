import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UseGeneral from "../../hooks/useGeneral";
import '../Login/login.css';
import './sign.css';
import { Axios } from '../../Axios';
import { BASE_URL } from '../../Axios/base_url';
import { ThreeDots } from 'react-loader-spinner';
import toast from 'react-hot-toast';
const Sign = () => {
  const { language } = UseGeneral();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });
  const signUp = (e) => {
    e.preventDefault();
    Axios({
      url: BASE_URL + "user/sign_up",
      method: "POST",
      data: userData,
      language: language,
    }).then((res) => {
      toast.error(res?.message);
      console.log(res);
    });
  };
  return (
    <div className="login_page sign_page">
      <div className="login_content">
        <div className="right">
          <img src={require("../../assets/images/pana.png")} alt="" />
        </div>
        <div className="left">
          <h5>{language == 'ar' ? 'مرحبا' : 'Welcome'}</h5>
          <h4>{language == 'ar' ? 'عميل جديد' : 'New Client'}</h4>
          <form
            action=""
            onSubmit={(e) => (!loading ? signUp(e) : e.preventDefault())}
          >
            <div>
              <label htmlFor="phone my-2">
                {language == 'ar' ? 'الإسم' : 'Name'}
              </label>
              <input
                placeholder={
                  language == 'ar' ? 'أدخل إسمك الثلاثى' : 'Enter Your Name'
                }
                type="text"
                className="form-control"
                name="name"
                required
                id="name"
                onChange={(e) =>
                  setUserData({ ...userData, name: e.target.value })
                }
              />
            </div>
            <div>
              <label htmlFor="phone my-2">
                {language == 'ar' ? 'البريد الإلكترونى' : 'Email'}
              </label>
              <input
                placeholder={
                  language == 'ar'
                    ? 'أدخل البريد الإلكترونى'
                    : 'Enter Your Email'
                }
                type="email"
                className="form-control"
                name="email"
                id="email"
                required
                onChange={(e) =>
                  setUserData({ ...userData, email: e.target.value })
                }
              />
            </div>
            <div>
              <label htmlFor="phone my-2">
                {language == 'ar' ? 'رقم الهاتف' : 'Phone Number'}
              </label>
              <input
                placeholder={
                  language == 'ar' ? 'أدخل رقم الهاتف' : 'Enter Your Phone'
                }
                type="text"
                className="form-control"
                name="phone"
                required
                id="phone"
                onChange={(e) =>
                  setUserData({ ...userData, phone: e.target.value })
                }
              />
              {language == 'ar' ? (
                <span>يستخدم هذا الرقم لتسجيل الدخول لحسابك</span>
              ) : (
                <span>This Number Used to Sign To Your Account</span>
              )}
            </div>
            <div>
              <label htmlFor="phone my-2">
                {language == 'ar' ? 'كلمة المرور' : 'Password'}
              </label>
              <input
                placeholder={
                  language == 'ar' ? 'أدخل كلمة المرور' : 'Enter Password'
                }
                type="password"
                className="form-control"
                name="password"
                required
                id="password"
                onChange={(e) =>
                  setUserData({ ...userData, password: e.target.value })
                }
              />
              {language == 'ar' ? (
                <span>يجب أن تكون مكونه من 8 أجزاء</span>
              ) : (
                <span>Must Consist Of 8 Parts</span>
              )}
            </div>
            <div className="conf_parent">
              <input style={{ borderRadius: '50%' }} type="checkbox" />
              {language == 'ar' ? (
                <div className="conf_txt">
                  <p>أوافق على</p>
                  <p>الشروط والاحكام</p>
                </div>
              ) : (
                <div className="conf_txt">
                  <p>I agree</p>
                  <p>Terms and Conditions</p>
                </div>
              )}
            </div>
            {loading ? (
              <ThreeDots
                visible={true}
                height="80"
                width="80"
                color="#4fa94d"
                radius="9"
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                wrapperClass=""
              />
            ) : (
              <button>
                {language == 'ar' ? 'إنشاء حساب' : 'Create Account'}
              </button>
            )}
            {language == 'ar' ? (
              <div
                onClick={() => {
                  navigate('/login');
                }}
                className="create_new_text"
              >
                <p>لديك حساب ؟</p>
                <p>تسجيل الدخول</p>
              </div>
            ) : (
              <div
                onClick={() => {
                  navigate('/login');
                }}
                className="create_new_text"
              >
                <p>Do You Have An Account ?</p>
                <p>Create An Account</p>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Sign;
