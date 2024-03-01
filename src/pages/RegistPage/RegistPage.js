import React from 'react'
import './registpage.css'
import UseGeneral from "../../hooks/useGeneral";
import { useNavigate } from 'react-router';
const RegistPage = () => {
  const navigate=useNavigate()
  const { language } = UseGeneral();
  return (
    <div className='regist_page'>
      <div className="parent">
      <div className="right">
          <img src={require("../../assets/images/pana.png")} alt="" />
        </div>
        <div className="left">
          <h4>{language=='ar'?'مرحبا':'Welcome'}</h4>
          <p>
            {
              language=='ar'?
              'ليس لديك حساب ؟'
              :
              'Do not Have Account'
            }
          </p>
          <button>
            {
              language=='ar'?
              'إنشاء حساب'
              :
              'Create Account'
            }
          </button>
          <p>
            {
              language=='ar'?
                <>
                  <span>لديك حساب ؟ </span>
                  <span
                    style={{cursor:'pointer'}}
                    onClick={()=>{
                      navigate("/login")
                    }}
                  >تسجيل الدخول</span>
                </>
              :
                <>
                  <span>Do You Have An Account ? </span>
                  <span
                    style={{cursor:'pointer'}}
                    onClick={()=>{
                      navigate("/login")
                    }}
                  > Sign In</span>
                </>
            }

          </p>
        </div>
      </div>
    </div>
  )
}

export default RegistPage
