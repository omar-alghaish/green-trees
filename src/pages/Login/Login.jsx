import React, { useState } from 'react';
import './login.css';
import { IoIosArrowRoundForward } from "react-icons/io";
import UseGeneral from "../../hooks/useGeneral";
import { useNavigate } from 'react-router';
import { Axios } from '../../Axios';
import { BASE_URL } from '../../Axios/base_url';
import toast from 'react-hot-toast';
import { ThreeDots } from 'react-loader-spinner';
const Login = () => {
  const { language } = UseGeneral();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });
  const logIn = (e) => {
    e.preventDefault();
    setLoading(true);
    Axios({
      url: BASE_URL + "user/login",
      method: "POST",
      data: userData,
      language: language,
    })
      .then((res) => {
        if (res?.status == "success") {
          toast.success(res?.message);
          // console.log(res.result)
          localStorage.setItem('green_trees',JSON.stringify(res.result.id));
          localStorage.setItem("GreenTreesToken", res?.result.access_token);
          window.location.href = "/profile";
        } else {
          toast.error(res?.message);
        }
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };
  return (
    <div className="login_page">
      <div className="login_content">
        <div className="right">
          <img src={require("../../assets/images/pana.png")} alt="" />
        </div>
        <div className="left">
          <h5>{language == 'ar' ? 'مرحبا' : 'Welcome'}</h5>
          <div className="sign_new">
            <h4 style={{ margin: '0px' }}>
              {language == 'ar' ? 'تسجيل الدخول' : 'Sign In'}
            </h4>
            <IoIosArrowRoundForward />
          </div>
          {language == 'ar' ? (
            <div
              onClick={() => {
                navigate('/sign');
              }}
              className="create_new_text create_new_text_n-c"
            >
              <p>ليس لديك حساب؟</p>
              <p>إنشاء حساب</p>
            </div>
          ) : (
            <div
              onClick={() => {
                navigate('/sign');
              }}
              className="create_new_text create_new_text_n-c"
            >
              <p>Don not Have An Account ?</p>
              <p>Create An Account</p>
            </div>
          )}
          <form
            action=""
            onSubmit={(e) => (!loading ? logIn(e) : e.preventDefault())}
          >
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
                id="phone"
                onChange={(e) =>
                  setUserData({
                    ...userData,
                    phone: e.target.value,
                    email: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <label htmlFor="phone my-2">
                {language == 'ar' ? 'كلمة المرور' : 'password'}
              </label>
              <input
                placeholder={
                  language == 'ar' ? 'أدخل كلمة المرور' : 'Enter Password'
                }
                type="password"
                className="form-control"
                name="password"
                id="password"
                onChange={(e) =>
                  setUserData({
                    ...userData,
                    password: e.target.value,
                  })
                }
              />
            </div>
            <div>
              {language == 'ar' ? (
                <p
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    navigate('/forget');
                  }}
                >
                  هل نسيت كلمة المرور؟
                </p>
              ) : (
                <p
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    navigate('/forget');
                  }}
                >
                  Did You Forget Your Password?
                </p>
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
              <button>{language == 'ar' ? "تسجيل الدخول" : 'Log in'}</button>
            )}
            {language == 'ar' ? (
              <div className="create_new_text">
                <p>ليس لديك حساب ؟</p>
                {
                  <p
                    onClick={() => {
                      navigate('/sign');
                    }}
                  >
                    تسجيل حساب جديد
                  </p>
                }
              </div>
            ) : (
              <div className="create_new_text">
                <p>Don not Have An Account ?</p>
                <p
                  onClick={() => {
                    navigate('/sign');
                  }}
                >
                  Create An Account
                </p>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
