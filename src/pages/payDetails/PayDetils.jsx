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
  const [locations,setLocations]=useState([]);
    const [activeLocation,setActiveLocation]=useState('');
    const [delivary_type,setdelivary_type]=useState('');
    const [showCancOrder,setShowCancOrder]=useState(true);
  const handleConfirm=()=>{
    if(delivary_type!='quickly'&&order_time==''){
      toast.error(language=='ar'?'إختر وقت إذا لم تريد التوصيل سريعا':'Select Date If You If You Do not Need Quickly delivary')
      return
    }
    if(pay_type=='cash'&&(cardInfo.card_number==''||cardInfo.cvv==''||cardInfo.user_card_name==''||cardInfo.end_date=='')){
      toast.error(language=='ar'?'أدخل بيانات الدفع إذا كنت تريد الدع بالبطاقه':'Enter Card Data If You need to pay with Card');
      return
    }
    if(activeLocation==''){
      toast.error(language=='ar'?'أدخل مكان':'Enter Location');
      return
    }
    if(userOrderInfo.phone==''){
      toast.error(language=='ar'?'أدخل رقم الهاتف':'Enter Phone');
      return
    }
    setAddLoading(true)
    const data_send={
      phone:userOrderInfo.phone,
      delivary_type:order_time!=''?'time':'quickly',
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
        navigate('/success',{replace:true,state:{order:res.result}});
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
  const getUserLocations = () => {
    Axios({
      url: BASE_URL + "userlocation/get_user_locations",
      method: "GET",
    }).then((res) => {
      if (res.message == "Sission Ended Login Again") {
        toast.error(res.message)
      }
      if (res.status == 'success') {
        if (Array.isArray(res.result)) {
          console.log(res)
          setLocations(res.result);
          let userLocations = [...res.result];
          setActiveLocation(userLocations?.filter(item => item.status = 1)[0].id);
        }
        // setLocations();
      }
    }).finally(() => {
    }).catch(e => {
      console.log(e)
    })
  }
  useEffect(()=>{
    getMeData()
    getUserLocations();
  },[])
  return (
    <div className="pay-details-container">
      <Breadcrumb links={breadCrumbsLinks} />
      <div className="main-content">
        <Right locations={locations}  setpay_type={setpay_type} setorder_time={setorder_time} setdelivary_type={setdelivary_type} delivary_type={delivary_type} setActiveLocation={setActiveLocation} activeLocation={activeLocation} choose_subs={choose_subs} setchoose_subs={setchoose_subs}  cardInfo={cardInfo} setCardInfo={setCardInfo} userOrderInfo={userOrderInfo} setUserOrderInfo={setUserOrderInfo}/>
        <Left addLoading={addLoading} handleConfirm={handleConfirm} />
      </div>
    </div>
  );
};

export default PayDetils;
