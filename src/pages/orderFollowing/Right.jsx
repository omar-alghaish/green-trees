import React, { useEffect, useState } from "react";
import "./right.css";
import { FiEdit } from "react-icons/fi";
import { calendarTime } from "../../assets/svgIcons";
import { Link } from "react-router-dom";
import PopUp from "../../components/popup";
import { useNavigate } from "react-router-dom";

import "./style.css";
import { EnglishIcon, KSA, Phone, whatsApp } from "../../assets/svgIcons/index";
import IconWithText from "../../components/iconWithText";
import UseGeneral from "../../hooks/useGeneral";
import { Axios } from "../../Axios";
import { BASE_URL } from "../../Axios/base_url";
import toast from "react-hot-toast";
import { Spinner } from "react-bootstrap";
export const Right = ({orderData}) => {
  // console.log(orderData,"wewe")
  const navigate = useNavigate();
  const [cancelOrder, setCancelOrder] = useState(false);
  const [returnPolicyOpen, setReturnPolicyOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const { language, changeLanguage } = UseGeneral();
  const [cancleLoading,setCancleLoading]=useState(false)
  const [returnPolicies,setReturnPolicies]=useState([]);

  const handleCancelOrder = () => {
    // navigate("/cancel-order");
    setCancleLoading(true)
    Axios({
      url: BASE_URL + `orders/cancle_order/${orderData.id}`,
      method: "get",
    }).then((res) => {
      // console.log(res)
      if(res.status=='success'){
        navigate("/cancel-order",{state:{orderData},replace:true});
      }
      else if(res.status=='faild'){
        toast.error(res.message);
      }
      else {
        toast.error(language=='ar'?'حدث خطأ ما':'Something Error')
      }
    // console.log(res)
    }).finally(()=>{
      setCancleLoading(false)
    });
  };
  const getReturns=()=>{
    Axios({
      url: BASE_URL + `site_returns/get_for_users`,
      method: "get",
    }).then((res) => {
      console.log(res)
      if(Array.isArray(res.result)){
        setReturnPolicies(res.result);
      }
    }).finally(()=>{
    });
  }
  useEffect(()=>{
    getReturns()
  },[])
  return (
    <div className="order-right-container">
      <div className="pay-map-container">
        <div className="row">
          <div className="title">
            <h1>{language=='ar'?'تم انشاء الطلب':'The request has been created'}</h1>
          </div>
          <div className="">{language=='ar'?'تم انشاء الطلب و ارساله الي قسم التحضيرات':'The request has been created and sent to the preparations department'}</div>
        </div>
        <div className="row">
          <div className="title">
            <h1>{language=='ar'?'جاري تحضير طلبك':'Your request is being prepared'}</h1>
          </div>
          <div>{language=='ar'?'جاري الان تحضير طلبك و التاكد من جميع المنتجات':'We are now preparing your order and verifying all products'}</div>
        </div>
        <div className="row">
          <div className="title">
            <h1>{language=='ar'?'جاري التوصيل':'Delivery is in progress'}</h1>
          </div>
        </div>
      </div>
      <div className="bottom">
        <Link onClick={() => setContactOpen(true)}>
          {language=='ar'?'التواصل مع خدمة العملاء':'Contact customer service'}
        </Link>
        <Link onClick={() => setReturnPolicyOpen(true)}>{language=='ar'?'سياسة الاسترجاع':'Return Policy'}</Link>
        {
          orderData.order_status=='pending'&&
          <Link onClick={() => setCancelOrder(true)}>{language=='ar'?'الغاء الطلب':'Cancelling order'}</Link>
        }
      </div>
      <div className="cancel-popup">
        <PopUp title="الغاء الطلب" open={cancelOrder} setOpen={setCancelOrder}>
          <h3>{language=='ar'?'هل انت متاكد من الغاء الطلب؟':'Are you sure you want to cancel the order?'}</h3>
          <div className="buttons-container">
            {
              cancleLoading?
              (
                <Spinner/>
              )
              :
              (
                <button onClick={handleCancelOrder}>{language=='ar'?'نعم':'Yes'}</button>
              )
            }
            <button onClick={() => setCancelOrder(false)}>{language=='ar'?'رجوع':'return'}</button>
          </div>
        </PopUp>
      </div>
      <PopUp
        title={language=='ar'?"سياسة الاسترجاع":'Return Policy'}
        open={returnPolicyOpen}
        setOpen={setReturnPolicyOpen}
      >
        <div>
          {/* <h5>حالات الاسترجاع</h5> */}
          <ul className="return-policy-list">
            {
              returnPolicies?returnPolicies.map((item,index)=>{
                return (
                  <li>
                    <strong> {language=='ar'?item.title_ar:item.title_en}</strong>
                    {
                      language=='ar'?
                      item.description_ar
                      :
                      item.description_en
                    }
                  </li>
                )
              })
              :
              <div>
                <img src={require('../../assets/images/no_image.png')} alt="" />
                <p>{language=='ar'?'لا يوجد سياسات':'There Are No Policies'}</p>
              </div>
            }
          </ul>
        </div>
      </PopUp>
      <PopUp title="الغاء الطلب" open={contactOpen} setOpen={setContactOpen}>
        <h3></h3>
        <div className="rowDiv">
          <IconWithText
            icon={Phone}
            text={language == "ar" ? "الخط الساخن" : "hot line"}
            className={"contact"}
          />
        </div>
        <div className="rowDiv">
          <IconWithText
            icon={whatsApp}
            text={language == "ar" ? "واتساب" : "WhatsApp"}
            className={"contact"}
          />
        </div>
      </PopUp>
    </div>
  );
};
