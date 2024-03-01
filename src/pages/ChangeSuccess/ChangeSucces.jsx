import React from 'react'
import UseGeneral from "../../hooks/useGeneral";
import { useNavigate } from 'react-router';
import './changesuccess.css'
const ChangeSucces = () => {
  const { language } = UseGeneral();
  const navigate=useNavigate();
  return (
    <div className='change_success_page conf_page'>
      <div className="change_success_content conf_content">
        <div className="right">
          <img src={require("../../assets/images/pana.png")} alt="" />
        </div>
        <div className="left">
          <h2>
            {
              language=='ar'?
              'تم تغير كلمة المرور بنجاح'
              :
              'The password has been changed successfully'
            }
          </h2>
          <p
            style={{marginTop:'30px'}}
          >
            {
              language=='ar'?
              'يمكنك الدخول الآن بكلمة المرور الجديدة'
              :
              'You can log in now with your password.'
            }
          </p>
          <button
            onClick={()=>{
              navigate('/login')
            }}
          >
            {
              language=='ar'?
              'تسجيل الدخول'
              :
              'Sign In'
            }
          </button>
        </div>
      </div>
    </div>
  )
}

export default ChangeSucces
