import React, { useEffect, useState } from "react";
import "./coupons.css"
import { Axios } from "../../../Axios";
import { BASE_URL } from "../../../Axios/base_url";
import UseGeneral from "../../../hooks/useGeneral";
import { ThreeCircles } from "react-loader-spinner";
import toast from "react-hot-toast";
const Coupons = () => {
  const { language } = UseGeneral();
  const [userCoupons,setUserCoupons]=useState([]);
  const [pageLoading,setPageLoading]=useState(false)
  const getUserCoupons=()=>{
    setPageLoading(true)
    Axios({
      url: BASE_URL + `user_coupon/get_user_coupon`,
      method: "GET",
    }).then((res) => {
    console.log(res)
    if(res.status=='success'){
      if(Array.isArray(res.result)){
        setUserCoupons(res.result);
      }
    }
    }).finally(()=>{
    setPageLoading(false)
    });
  }
  const copyContent = async (code) => {
    console.log(code)
    try {
      let text = document.getElementById('myText');
      // console.log(text)
      await navigator.clipboard.writeText(code);
      console.log('Content copied to clipboard');
      toast.success(language=='ar'?'تم النسخ بنجاح':'Success To Copy')
    } catch (err) {
      toast.error('Failed to copy: ');
    }
  }
  const data = [
    {
      code: "GET20",
      number: "20%",
    },
  ];
  useEffect(()=>{
    getUserCoupons()
  },[])
  return (
    <div className="coupons-container">
      <div className="title">
        <h3>{language=='ar'?'الكوبونات':'Coupon'}</h3>
      </div>
      {
        pageLoading?
        (
          <ThreeCircles/>
        )
        :
        (
          <div className="coupons">
          {userCoupons&&userCoupons?userCoupons.map((item) => (
            <div className="coupon-container">
              <div className="coupon">
              <div className="code">{item?.code}</div>
              <div className="description">
                {language=='ar'?'استخدم كود الخصم ':'Use Discount Code'}<strong>{item?.code}</strong>
                {
                  language=='ar'?
                  <>
                    عند الدفع واحصل على
                خصم فوري بنسبة <strong id="myText">{item?.number}</strong>% على طلبك. هذا
                العرض ساري لفترة محدودة.
                  </>
                  :
                  `
                  When you pay and get
                  Instant discount on your order. ${
                    <strong id="myText">{item?.number}</strong>
                  } this
                  The offer is valid for a limited time.
                  `
                }
              </div>
              <div  onClick={()=>{
                copyContent(item.code)
              }} className="copy-button">{language=='ar'?'نسخ الكود':'Copy Code'}</div>
            </div>
            </div>

          ))
              :
              <div className="no_coupons" style={{maxWidth:'100%',display:'flex',flexDirection:'column',gap:'5px',alignItems:'center',width:'100%'}}>
                <img
                  src={require('../../../assets/images/no_image.png')}
                  alt=""
                  />
                  <h5>
                    {language=='ar'?'لا يوجد أكواد الأن':'There Are No Codes For Now'}
                  </h5>
              </div>
        }
        </div>
        )
      }
    </div>
  );
};

export default Coupons;
