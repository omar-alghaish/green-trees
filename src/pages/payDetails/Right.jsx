import React, { useEffect, useState } from "react";
import "./right.css";
import { FiEdit } from "react-icons/fi";
import { calendarTime } from "../../assets/svgIcons";
import { Axios } from "../../Axios";
import { BASE_URL } from "../../Axios/base_url";
import toast from "react-hot-toast";
import UseGeneral from "../../hooks/useGeneral";
import { useNavigate } from "react-router-dom";

export const Right = ({locations, setpay_type, setorder_time, setdelivary_type, delivary_type, setActiveLocation, activeLocation, cardInfo, setCardInfo, userOrderInfo, setUserOrderInfo, setchoose_subs, choose_subs }) => {
  const { language } = UseGeneral();
  const navigate = useNavigate();
  const [cartData, setCartsData] = useState([])

  const [cartTotalPrice, setCartTotalPrice] = useState(0);
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [payCheckbox, setPayCheckbox] = useState(false)
  const [pageLoading, setPageLoading] = useState(false);
  const [date, setDate] = useState('');
  const [diableInputs, setDisableInputs] = useState(true)
  // const [locations, setLocations] = useState([]);





  const handleCheckboxChange = (option) => {
    setSelectedOption(option);
  };
  const handleOpenPayment = () => {
    setPaymentOpen(!paymentOpen);
    setPayCheckbox(paymentOpen ? false : false)

  };
  const handlePayCheckboxChange = (e) => {
    const { checked, value } = e?.target
    console.log(checked)
    setPayCheckbox(!payCheckbox)
    setPaymentOpen(checked ? false : false);
  }
  const getUserData = () => {
    setPageLoading(true)
    Axios({
      url: BASE_URL + "cart/all_carts_for_user",
      method: "GET",
    }).then((res) => {
      console.log(res, "eww")
      if (res.message == "Sission Ended Login Again") {
        toast.error(res.message)
      }
      if (Array.isArray(res.result)) {
        setCartsData(res.result)
      }
    }).finally(() => {
      setPageLoading(false)
    })
  }


  useEffect(() => {
    getUserData()
    // getUserLocations()
    // getMeData()
  }, [])
  return (
    <div className="right-container">
      <div className="pay-map-container">
        <div className={language=='ar'?"row":"row rev_row"}>
          <div className="title">
            <h1>{language == 'ar' ? 'البيانات الرئيسيه' : 'Main Information'}</h1>
            <div className="icon-container">
              <FiEdit style={{
                cursor: 'pointer'
              }} onClick={() => {
                setDisableInputs(false)
              }} />
            </div>
          </div>
          <div className="content">
            <div className="d-flex">
              <strong>{language == 'ar' ? 'الاسم' : 'Name'}: </strong>
              <input style={{
                border: diableInputs ? 'none' : '1px solid #ccc',
                borderRadius: '4px',
                flex: '1'
              }} disabled={diableInputs} onChange={(e)=>{
                setUserOrderInfo({...userOrderInfo,name:e.target.value})
              }} type="text" value={userOrderInfo && userOrderInfo?.name} />
            </div>
            <div className="d-flex">
              <strong>{language=='ar'?'الرقم':'Phone'}: </strong>
              <input  onChange={(e)=>{
                setUserOrderInfo({...userOrderInfo,phone:e.target.value})
              }} style={{
                border: diableInputs ? 'none' : '1px solid #ccc',
                borderRadius: '4px',
                flex: '1'
              }} disabled={diableInputs} type="text" value={userOrderInfo && userOrderInfo?.phone} />
            </div>
            <div className="d-flex">
              <strong>{language == 'ar' ? 'العنوان' : 'location'}: </strong>
              <select onChange={(e) => {
                setActiveLocation(e.target.value)
              }} disabled={diableInputs} style={{
                border: diableInputs ? 'none' : '1px solid #ccc',
                borderRadius: '4px',
                flex: '1',
                backgroundColor: 'transparent'
              }} value={activeLocation} name="" id="">
                {
                  locations?.map((item, index) => {
                    return <option value={item.id}>{item.name}</option>
                  })
                }
              </select>
              {/* <input style={{
                border:diableInputs?'none':'1px solid #ccc',
                borderRadius:'4px',
                flex:'1'
              }} disabled={diableInputs} type="text" value={userOrderInfo?.location} /> */}
            </div>
          </div>
        </div>
        <div className={language=='ar'?"row":"row rev_row"}>
          <div className="title">
            <h1>{language == 'ar' ? 'توصيل' : 'Delivar'}</h1>
            {/* <div className="icon-container">
              <FiEdit />
            </div> */}
          </div>
          <div className="content">
            <div className="checkBox-container">
              <label onClick={() => {
                setdelivary_type('quickly')
              }} class="checkBox">
                <input id="ch1" type="checkbox" checked={delivary_type == 'quickly'} />
                <div class="transition"></div>
              </label>{" "}
              <div>
                <h6>{language == 'ar' ? 'فى اسرع وقت' : 'Quickly'}</h6>
                <span>{language == 'ar' ? 'اليوم 12:00 م - 01:00 م' : 'Today 12:00 م - 01:00 م'}</span>
              </div>
            </div>
            <label htmlFor="date" style={{ cursor: 'pointer' }} onClick={() => {
              setdelivary_type('time')
            }} className="d-flex">
              <div className="icon">{calendarTime}</div>{" "}
              <strong>{language == 'ar' ? 'جدولة موعد' : 'Schedule an appointment'}</strong>
            </label>{delivary_type == 'time' ?
              <input onChange={(e) => {
                setorder_time(e.target.value)
              }} style={{ borderRadius: '4px', border: '1px solid #ccc' }} id="date" name="date" type="date" />
              : null}</div>
        </div>
        <div className={language=='ar'?"row":"row rev_row"}>
          <div className="title">
            <h1>{language == 'ar' ? 'معلومات الدفع' : 'payment information'}</h1>
            {/* <div className="icon-container">
              <FiEdit />
            </div> */}
          </div>
          <div className="content">
            <div className="checkBox-container">
              <label onClick={() => {
                setpay_type(payCheckbox ? 'cash' : 'cash_on_delivery')
              }} class="checkBox">
                <input id="ch1" type="checkbox" checked={payCheckbox} onChange={handlePayCheckboxChange} />
                <div class="transition"></div>
              </label>
              <div>
                <h6>{language == 'ar' ? 'الدفع نقدا عند الإستلام' : 'Payment in cash upon delivery'}</h6>
              </div>
            </div>
            <div
              className="d-flex"
              onClick={handleOpenPayment}
              style={{ cursor: "pointer" }}
            >
              <div className="icon">{calendarTime}</div>{" "}
              <strong>{language == 'ar' ? 'الدفع عن طريق البطاقة الأئتمانية' : 'Payment via credit card'}</strong>
            </div>
            <div className={`payment_method ${paymentOpen ? "active" : false}`}>
              <div className="input-form">
                <label htmlFor="">{language == 'ar' ? 'حامل البطاقة' : 'Card holder'}</label>
                <input onChange={(e) => {
                  setCardInfo({
                    ...cardInfo,
                    user_card_name: e.target.value
                  })
                }} type="text" placeholder={language == 'ar' ? 'حامل البطاقة' : 'Card holder'} />
              </div>
              <div className="input-form">
                <label htmlFor="" >{language == 'ar' ? 'رقم البطاقة' : 'Card Number'}</label>
                <input onChange={(e) => {
                  setCardInfo({
                    ...cardInfo,
                    card_number: e.target.value
                  })
                }} type="text" placeholder="000 000 000 000" />
              </div>
              <div className="d-flex">
                <div className="input-form">
                  <label htmlFor="">{language == 'ar' ? 'تاريخ الانتهاء' : 'End Date'}</label>
                  <input onChange={(e) => {
                    setCardInfo({
                      ...cardInfo,
                      end_date: e.target.value
                    })
                  }} type="text" placeholder="00/00" />
                </div>
                <div className="input-form">
                  <label htmlFor="" >cvv</label>
                  <input onChange={(e) => {
                    setCardInfo({
                      ...cardInfo,
                      cvv: e.target.value
                    })
                  }} type="text" placeholder="000" />
                </div>
              </div>
              <div className="checkBox-container">
                <label class="checkBox">
                  <input id="ch1" type="checkbox" />
                  <div class="transition"></div>
                </label>{" "}
                <div>{language == 'ar' ? 'حفظ البطاقه و استخدامها مرة اخري' : 'Save the card and use it again'}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bottom">
        <div className="title">
          <h3>{language == 'ar' ? 'اختيارات المنتجات البديلة' : 'Alternative product choices'}</h3>
          <p>
            {language == 'ar' ? 'في حال عدم توافر بعض المنتجات, كيف تفضل اختيار البدائل للمنتجات غير المتوفرة؟' : 'If some products are not available, how do you prefer to choose alternatives for unavailable products?'}
          </p>
          <div className="content">
            <div>
              <div style={{ cursor: 'pointer' }} onClick={() => {
                setchoose_subs('info')
              }} className="checkBox-container">
                <label className="checkBox">
                  <input
                    type="checkbox"
                    checked={choose_subs === 'info'}
                    onChange={() => handleCheckboxChange('option1')}
                  />
                  <div className="transition"></div>
                </label>{" "}
                <div>
                  <h6>{language == 'ar' ? 'ابلغني' : 'Inform me'}</h6>
                </div>
              </div>
              <p>{language == 'ar' ? 'سسيم إرسال لينك بالمنتجات البديلة عن طريق الواتساب.' : 'Send a link to alternative products via WhatsApp.'}</p>
            </div>
            <div>
              <div style={{ cursor: 'pointer' }} onClick={() => {
                setchoose_subs('call')
              }} className="checkBox-container">
                <label className="checkBox">
                  <input
                    type="checkbox"
                    checked={choose_subs === 'call'}
                    onChange={() => handleCheckboxChange('option2')}
                  />
                  <div className="transition"></div>
                </label>{" "}
                <div>
                  <h6>{language == 'ar' ? 'اتصل بي' : 'Call me'}</h6>
                </div>
              </div>
              <p>{language == 'ar' ? 'سيتصل بك أحد ممثلي خدمة العملاء لإبلاغك و اختيار البديل.' : 'A customer service representative will contact you to inform you and choose a replacement.'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
