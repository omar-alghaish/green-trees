import React, { useEffect, useState } from "react";
import UseGeneral from "../../hooks/useGeneral";
import Breadcrumb from "../../components/BreadCumbsLinks";
import { Right } from "./Right";
import Left from "./Left";
import "./style.css";
import { Axios } from "../../Axios";
import { BASE_URL } from "../../Axios/base_url";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const PayDetils = () => {
  const { language } = UseGeneral();
  const navigate=useNavigate();
  const breadCrumbsLinks = [
  {
      name: language != "ar" ? "Cart" : " <    العوده الي العربه",
      path: "/Cart",
      // active: true,
    },
  ];
  const [meData,setMeData]=useState({});
  const [pageLoading,setPageLoading]=useState(false)
  const [cardInfo,setCardInfo]=useState({
    cvv:'',
    end_date:'',
    card_number:'',
    user_card_name:'',
  })
  const [order_time,setorder_time]=useState('');
  const [userOrderInfo,setUserOrderInfo]=useState({
    name:'',
    phone:'',
    location:'',
  });
  const [addLoading,setAddLoading]=useState(false)
  const [pay_type,setpay_type]=useState('');
  const [choose_subs,setchoose_subs]=useState('');
    const [activeLocation,setActiveLocation]=useState('');
    const [delivary_type,setdelivary_type]=useState('');
    const [showCancOrder,setShowCancOrder]=useState(true);
  const handleConfirm=()=>{
    setAddLoading(true)
    const data_send={
      phone:userOrderInfo.phone,
      delivary_type,
      order_time,
      location:activeLocation,
      pay_type,
      choose_subs,
      cvv:cardInfo.cvv,
      end_date:cardInfo.end_date,
      card_number:cardInfo.card_number,
      user_card_name:cardInfo.user_card_name,
    }
    console.log(data_send)
    Axios({
      url: BASE_URL + "orders/add_order",
      method: "POST",
      data:data_send
    }).then((res)=>{
      console.log(res)
      if(res.message=="Sission Ended Login Again"){
        toast.error(res.message)
      }
      if(res.status=='success'){
        setShowCancOrder(true)
        getMeData()
        toast.success(res.message);
      }
    }).finally(()=>{
      setAddLoading(false)
    })
  }
  const getMeData=()=>{
    Axios({
      url: BASE_URL + "user/me",
      method: "POST",
    }).then((res)=>{
      console.log(res)
      if(res.message=="Sission Ended Login Again"){
        toast.error(res.message)
      }
      if(res.status=='success'){
        if(res.result.location==null){
          toast.error(language=='ar'?'من فضلك إختر عنوان أولا':'Please Select Location First');
          navigate('/profile',{replace:true});
        }
        setMeData(res.result)
        setUserOrderInfo({
          name:res.result.name,
          phone:res.result.phone,
          location:res.result.location.name,
        })
        console.log(res)
        // setCartTotalPrice(res.result.cart_total_price*1-res.result.money_minus*1);
      }
    }).finally(()=>{
      setPageLoading(false)
    }).catch(e=>{
      console.log(e)
    })
  }
  useEffect(()=>{
    getMeData()
  },[])
  return (
    <div className="pay-details-container">
      <Breadcrumb links={breadCrumbsLinks} />
      <div className="main-content">
        {
          false?
          (
            <div className="show_cancel right-container">
              <div className="top">
                <div className="right">
                  <div className="parent">
                    <div className="child">

                    </div>
                  </div>
                  <div className="line"></div>
                  <div className="parent">
                    <div className="child">

                    </div>
                  </div>
                  <div className="line"></div>
                  <div className="parent dark">
                    <div className="child">
                      3
                    </div>
                  </div>
                </div>
                <div className="left">
                  <div>
                    <h4>{language=='ar'?'تم إنشاء الطلب':'The request has been created'}</h4>
                    <p>{language=='ar'?'تم إنشاء الطلب و إرساله إلي قسم التحضيرات':'The request has been created and sent to the preparations department'}</p>
                  </div>
                  <div>
                    <h4>{language=='ar'?'جاري تحضير طلبك':'Your request is being prepared'}</h4>
                    <p>{language=='ar'?'جاري الآن تحضير طلبك و التأكد من جميع المنتجات':'We are now preparing your order and verifying all products'}</p>
                  </div>
                  <div>
                    <h3>جارى التوصيل</h3>
                  </div>
                </div>
              </div>
              <hr />
              <div className="botttom">
                <h5>{language=='ar'?'التواصل مع خدمة العملاء':'Contact With customers service'}</h5>
                <h6>{language=='ar'?'سياسة الأسترجاع':'Return Policiy'}</h6>
                <p>{language=='ar'?'إلغاء الطلب':'Cancel Order'}</p>
              </div>
            </div>
          )
          :
          (
            <Right  setpay_type={setpay_type} setorder_time={setorder_time} setdelivary_type={setdelivary_type} delivary_type={delivary_type} setActiveLocation={setActiveLocation} activeLocation={activeLocation} choose_subs={choose_subs} setchoose_subs={setchoose_subs}  cardInfo={cardInfo} setCardInfo={setCardInfo} setUserOrderInfo={setUserOrderInfo}/>
          )
        }
        <Left addLoading={addLoading} handleConfirm={handleConfirm} />
      </div>
    </div>
  );
};

export default PayDetils;
