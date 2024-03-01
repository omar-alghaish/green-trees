import React, { useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";
import "./card.css";
import { BASE_URL } from "../../../Axios/base_url";
import { Axios } from "../../../Axios";
import UseGeneral from "../../../hooks/useGeneral";
import PopUp from "../../../components/popup";
import IconWithText from "../../../components/iconWithText";
import toast from "react-hot-toast";
import { ThreeCircles, ThreeDots } from "react-loader-spinner";

const Card = () => {
  const { language } = UseGeneral();
  const [addLoading, setAddLoading] = useState(false);
  const [showAddNew, setShowAddNew] = useState(false);
  const [activeCard, setActiveCard] = useState("");
  const [activeLoading, setActiveLoading] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [rowData, setRowData] = useState({});
  const [cardInfo, setCardInfo] = useState({
    cvv: "",
    card_number: "",
    name: "",
    end_date: "",
    status: 0,
  });
  const data = [
    {
      name: "ZAIN ABDALLAH",
      number: "23234323982394",
    },
  ];
  const hashNumber = (text) => {
    const charArray = text.split("");
    const hashedArray = charArray.map((char, index) => {
      if (index >= charArray.length - 10 && index <= charArray.length - 4) {
        return "*";
      } else {
        return char;
      }
    });
    const hashedNumber = hashedArray.join("");
    return hashedNumber;
  };

  // console.log(hashNumber("133238383738"));
  const [cards, setCards] = useState([]);
  const [pageLoading, setPageLoading] = useState(false);
  const getUserCards = () => {
    setPageLoading(true);
    Axios({
      url: BASE_URL + `cards/get_user_cards`,
      method: "get",
    })
      .then((res) => {
        if (res.status == "success") {
          if (Array.isArray(res.result)) {
            setCards(res.result);
            if (res.result.length > 0) {
              const theActive = res?.result?.find((item) => item?.status == 1);
              setActiveCard(theActive?.id);
            }
          }
        }
      })
      .finally(() => {
        setPageLoading(false);
      });
  };
  const handleAddNewCard = () => {
    let enddArr = cardInfo.end_date.split("/");
    if (enddArr.length != 2 || cardInfo.end_date.length != 5) {
      toast.error(
        language == "ar" ? "تأكد من شكل تاريخ الإنتهاء" : "Check End Date Form"
      );
      return;
    }
    if (cardInfo.card_number.length == 0) {
      toast.error(
        language == "ar" ? "تأكد من شكل الرقم" : "Check Form of Card Number"
      );
      return;
    }
    if (cardInfo.name.length == 0) {
      toast.error(language == "ar" ? "تأكد من دخول إسمك" : "Check Name");
      return;
    }
    setAddLoading(true);
    const data_send = {
      ...cardInfo,
    };
    Axios({
      url: BASE_URL + `cards/add_new`,
      method: "POST",
      data: data_send,
    })
      .then((res) => {
        if (res.status == "success") {
          toast.success(res.message);
          getUserCards();
        }
      })
      .finally(() => {
        setAddLoading(false);
      });
  };
  const handleActiveCard = (id) => {
    // console.log(id)
    console.log("test");
    setActiveLoading(true);
    console.log(activeLoading);
    Axios({
      url: BASE_URL + `cards/chage_status/${id}`,
      method: "get",
    })
      .then((res) => {
        if (res.status == "success") {
          toast.success(res.message);
          getUserCards();
          setActiveCard(id);
          setActiveLoading(false);
          console.log(res);
        }
      })
      .finally(() => {
        setActiveLoading(false);
      });
  };
  const handleEditCard = () => {
    let enddArr = rowData.end_date.split("/");
    if (enddArr.length != 2 || rowData.end_date.length != 5) {
      toast.error(
        language == "ar" ? "تأكد من شكل تاريخ الإنتهاء" : "Check End Date Form"
      );
      return;
    }
    if (rowData.card_number.length == 0) {
      toast.error(
        language == "ar" ? "تأكد من شكل الرقم" : "Check Form of Card Number"
      );
      return;
    }
    if (rowData.name.length == 0) {
      toast.error(language == "ar" ? "تأكد من دخول إسمك" : "Check Name");
      return;
    }
    setAddLoading(true);
    const data_send = {
      ...rowData,
    };
    console.log(data_send);
    Axios({
      url: BASE_URL + `cards/edit_card/${rowData.id}`,
      method: "POST",
      data: data_send,
    })
      .then((res) => {
        console.log(res);
        if (res.status == "success") {
          toast.success(res.message);
          setShowAddNew(false);
          setShowEditModal(false);
          getUserCards();
        }
      })
      .finally(() => {
        setAddLoading(false);
      });
  };
  useEffect(() => {
    getUserCards();
  }, []);

  console.log(cards[0]?.status);
  console.log(cards[1]?.status);
  console.log(activeLoading);

  return (
    <div className="profile-card-container">
      <div className="title">
        <h1>{language == "ar" ? "البطاقه الرئيسيه" : "Main Card"}</h1>
        <div className="icon-container">
          <FiEdit
            style={{ cursor: "pointer" }}
            onClick={() => {
              setShowEditModal(true);
              setRowData(cards.filter((item) => item.id == activeCard)[0]);
            }}
          />
        </div>
      </div>
      <div className="saved-cards-container">
        {pageLoading ? (
          <ThreeCircles />
        ) : cards && cards.length > 0 ? (
          activeLoading ? (
            <ThreeCircles />
          ) : (
            cards.map((item, index) => {
              return (
                <div className="saved-card">
                  <div className="row1">
                    <label
                      onClick={() => {
                        setActiveCard(item.id);
                        handleActiveCard(item.id);
                        console.log(item.id);
                      }}
                      htmlFor="ch1"
                      class="checkBox"
                    >
                      <input
                        checked={item.id == activeCard}
                        id="ch1"
                        type="checkbox"
                      />
                      <div class="transition"></div>
                    </label>
                    {/* <input checked={item.status==1} type="radio" name="" id="" /> */}
                    {item?.name}
                  </div>
                  <span className="card-number">
                    {hashNumber(item?.card_number)}
                  </span>
                </div>
              );
            })
          )
        ) : (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          ></div>
        )}
      </div>
      <button
        onClick={() => {
          setShowAddNew(true);
        }}
        className="add-card-button"
      >
        {language == "ar" ? "إضافه بطاقه جديده" : "Enter New Card"}
      </button>
      {showAddNew && (
        <>
          <div className="card_container my-4">
            <h5>Credit</h5>
            <div className="bottom">
              <h3>{cardInfo.name}</h3>
              <h6>{cardInfo.card_number}</h6>
            </div>
          </div>
          <div className="rowDiv make_res">
            <div className="payment_method make_res_ch add_method row active">
              <div className="input-form col-lg-12 col-md-12 col-sm-12">
                <label htmlFor="">
                  {language == "ar" ? "حامل البطاقة" : "Card holder"}
                </label>
                <input
                  className="form-control"
                  onChange={(e) => {
                    setCardInfo({
                      ...cardInfo,
                      name: e.target.value,
                    });
                  }}
                  type="text"
                  placeholder={
                    language == "ar" ? "حامل البطاقة" : "Card holder"
                  }
                />
              </div>
              <div className="input-form">
                <label htmlFor="">
                  {language == "ar" ? "رقم البطاقة" : "Card Number"}
                </label>
                <input
                  onChange={(e) => {
                    setCardInfo({ ...cardInfo, card_number: e.target.value });
                  }}
                  type="text"
                  placeholder="000 000 000 000"
                />
              </div>
              <div className="d-flex">
                <div className="input-form">
                  <label htmlFor="">
                    {language == "ar" ? "تاريخ الانتهاء" : "End Date"}
                  </label>
                  <input
                    onChange={(e) => {
                      setCardInfo({
                        ...cardInfo,
                        end_date: e.target.value,
                      });
                    }}
                    type="text"
                    placeholder="00/00"
                  />
                </div>
                <div className="input-form">
                  <label htmlFor="">cvv</label>
                  <input
                    onChange={(e) => {
                      setCardInfo({
                        ...cardInfo,
                        cvv: e.target.value,
                      });
                    }}
                    type="text"
                    placeholder="000"
                  />
                </div>
              </div>
              <div
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setCardInfo({
                    ...cardInfo,
                    status: cardInfo.status == 1 ? 0 : 1,
                  });
                }}
                className="checkBox-container"
              >
                <label htmlFor="ch1" class="checkBox">
                  <input
                    checked={cardInfo.status == 1}
                    id="ch1"
                    type="checkbox"
                  />
                  <div class="transition"></div>
                </label>{" "}
                <div>
                  {language == "ar"
                    ? "حفظ البطاقه و استخدامها مرة اخري"
                    : "Save the card and use it again"}
                </div>
              </div>
              {addLoading ? (
                <ThreeDots />
              ) : (
                <button
                  onClick={() => {
                    handleAddNewCard();
                  }}
                  className="btn btn-success"
                >
                  {language == "ar" ? "إضافه" : "Add"}
                </button>
              )}
            </div>
          </div>
        </>
      )}
      {showEditModal && (
        <>
          <div className="card_container my-4">
            <h5>Credit</h5>
            <div className="bottom">
              <h3>{rowData.name}</h3>
              <h6>{rowData.card_number}</h6>
            </div>
          </div>
          <div className="rowDiv make_res">
            <div className="payment_method make_res_ch add_method row active">
              <div className="input-form col-lg-12 col-md-12 col-sm-12">
                <label htmlFor="">
                  {language == "ar" ? "حامل البطاقة" : "Card holder"}
                </label>
                <input
                  value={rowData.name}
                  className="form-control"
                  onChange={(e) => {
                    setRowData({
                      ...rowData,
                      name: e.target.value,
                    });
                  }}
                  type="text"
                  placeholder={
                    language == "ar" ? "حامل البطاقة" : "Card holder"
                  }
                />
              </div>
              <div className="input-form">
                <label htmlFor="">
                  {language == "ar" ? "رقم البطاقة" : "Card Number"}
                </label>
                <input
                  value={rowData.card_number}
                  onChange={(e) => {
                    setRowData({ ...rowData, card_number: e.target.value });
                  }}
                  type="text"
                  placeholder="000 000 000 000"
                />
              </div>
              <div className="d-flex">
                <div className="input-form">
                  <label htmlFor="">
                    {language == "ar" ? "تاريخ الانتهاء" : "End Date"}
                  </label>
                  <input
                    value={rowData.end_date}
                    onChange={(e) => {
                      setRowData({
                        ...rowData,
                        end_date: e.target.value,
                      });
                    }}
                    type="text"
                    placeholder="00/00"
                  />
                </div>
                <div className="input-form">
                  <label htmlFor="">cvv</label>
                  <input
                    value={rowData.cvv}
                    onChange={(e) => {
                      setRowData({
                        ...rowData,
                        cvv: e.target.value,
                      });
                    }}
                    type="text"
                    placeholder="000"
                  />
                </div>
              </div>
              {addLoading ? (
                <ThreeDots />
              ) : (
                <button
                  onClick={() => {
                    handleEditCard();
                  }}
                  className="btn btn-success"
                >
                  {language == "ar" ? "تعديل" : "Edit"}
                </button>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Card;
