import React, { useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";
import "./account.css";
import { IoTrashOutline } from "react-icons/io5";
import UseGeneral from "../../../hooks/useGeneral";
import { Axios } from "../../../Axios";
import { BASE_URL } from "../../../Axios/base_url";
import OrderCard from "../orders/OrderCard";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { ThreeDots } from "react-loader-spinner";

const Account = ({ userData, getUserInfo }) => {
  const navigate = useNavigate();
  console.log(userData);
  const { language } = UseGeneral();
  const [lastOrder, setLastOrder] = useState({});
  const [editElement, setEditElement] = useState({});
  const [accountEditValues, setAccountEditValues] = useState();
  const [EditAccountLoading, setEditAccountLoading] = useState(false);
  const [editPasswordLoading, setEditPasswordLoading] = useState(false);
  const [password, setPassword] = useState("");
  const getLastOrder = () => {
    Axios({
      url: BASE_URL + `orders/get_last_user_order`,
      method: "GET",
    })
      .then((res) => {
        console.log(res);
        if (res.status == "success") {
          setLastOrder(res.result);
        }
      })
      .finally(() => {});
  };
  useEffect(() => {
    getLastOrder();
  }, []);

  useEffect(() => {
    setAccountEditValues({
      name: userData.name,
      phone: userData.phone,
      email: userData.email,
    });
  }, [userData]);

  const handleEditElement = (e) => {
    const { id } = e.target;
    setEditElement(id);
  };

  const handleSubmitEditAccount = () => {
    setEditAccountLoading(true);
    Axios({
      url: BASE_URL + "user/edit_user",
      method: "POST",
      data: accountEditValues,
    })
      .then((res) => {
        console.log(res);
        if (res.message == "Sission Ended Login Again") {
          toast.error(res.message);
          setEditAccountLoading(false);
        }
        if (res.status == "success") {
          toast.success(res.message);
          setEditAccountLoading(false);
          getUserInfo();
        }
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        setEditAccountLoading(false);
      });
    setEditElement("");
  };

  const handleSubmitEditPassword = () => {
    setEditPasswordLoading(true);
    Axios({
      url: BASE_URL + "user/edit_user_password",
      method: "POST",
      data: { password },
    })
      .then((res) => {
        console.log(res);
        if (res.message == "Sission Ended Login Again") {
          toast.error(res.message);
          setEditPasswordLoading(false);
        }
        if (res.status == "success") {
          toast.success(res.message);
          setEditPasswordLoading(false);
          getUserInfo();
        }
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        setEditPasswordLoading(false);
      });
    setEditElement("");
  };

  const handleAccountEditChange = (e) => {
    const { value, name } = e.target;

    setAccountEditValues((prev) => {
      return { ...prev, [name]: value };
    });
  };

  return (
    <div className="account_page">
      <div className="account_info">
        <h5>
          <span>{language == "ar" ? "الحساب" : "Account"}</span>
          {editElement !== "acount" && (
            <FiEdit id="acount" onClick={handleEditElement} />
          )}
        </h5>
        {editElement === "acount" ? (
          <div className="edit_container">
            <div className="info">
              <div>
                <h5>{language == "ar" ? "الإسم" : "Name"}</h5>
                <input
                  type="text"
                  className="input_edit"
                  placeholder="الاسم"
                  value={accountEditValues?.name}
                  name="name"
                  onChange={handleAccountEditChange}
                />
              </div>
              <div>
                <h5>{language == "ar" ? "البريد الإلكترونى" : "Email"}</h5>
                <input
                  type="text"
                  className="input_edit"
                  placeholder="البريد الالكتروني"
                  value={accountEditValues?.email}
                  name="email"
                  onChange={handleAccountEditChange}
                />
              </div>
              <div>
                <h5>{language == "ar" ? "الرقم" : "Number"}</h5>
                <input
                  type="text"
                  className="input_edit"
                  placeholder="رقم الهاتف"
                  value={accountEditValues?.phone}
                  name="phone"
                  onChange={handleAccountEditChange}
                />
              </div>
            </div>
            <button className="edit_button" onClick={handleSubmitEditAccount}>
              تعديل
            </button>
          </div>
        ) : EditAccountLoading ? (
          <div className="loading_container">
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
          </div>
        ) : (
          <div className="info">
            <div>
              <h5>{language == "ar" ? "الإسم" : "Name"}</h5>
              <h3>{userData && userData?.name}</h3>
            </div>
            <div>
              <h5>{language == "ar" ? "البريد الإلكترونى" : "Email"}</h5>
              <h3>{userData && userData?.email}</h3>
            </div>
            <div>
              <h5>{language == "ar" ? "الرقم" : "Number"}</h5>
              <h3>{userData && userData?.phone}</h3>
            </div>
          </div>
        )}

        <hr />
      </div>
      <div className="account_location">
        <h5>
          <span>{language == "ar" ? "العنوان الرئيسى" : "Main Location"}</span>
          <FiEdit
            style={{ cursor: "pointer" }}
            onClick={() => {
              navigate("/EditLocation", {
                state: { locationnData: userData.location },
              });
            }}
          />
        </h5>
        <h3>
          {userData && userData.location
            ? userData?.location?.special_marque
            : language == "ar"
            ? "لا يوجد مكان الأن"
            : "There Are Not Places Now"}
        </h3>
      </div>
      <hr />
      <div className="change_password">
        <h5>
          <span>{language == "ar" ? "كلمة المرور" : "Password"}</span>
          {editElement !== "password" && (
            <FiEdit id="password" onClick={handleEditElement} />
          )}
        </h5>
        {editElement === "password" ? (
          <div className="edit_password_container">
            <input
              type="password"
              className="input_edit"
              name="test"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="edit_button" onClick={handleSubmitEditPassword}>
              تعديل
            </button>
          </div>
        ) : editPasswordLoading ? (
          <div className="loading_container">
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
          </div>
        ) : (
          <div className="pass_keywords">
            {[1, 2, 3, 4, 5, 6, 7].map((item, index) => {
              return <p></p>;
            })}
          </div>
        )}

        <div className="close_pass">
          <IoTrashOutline />
          {language == "ar" ? "إلغاء الحساب" : "Close Account"}
        </div>
      </div>
      <hr />
      <div className="last_order">
        <h6>{language == "ar" ? "أخر طلب" : "Last Order"}</h6>
        <h4>
          {!lastOrder && !Object.keys(lastOrder).length > 0 ? (
            language == "ar" ? (
              "لا يوجد طلبات حاليه"
            ) : (
              "There Are No Current Orders"
            )
          ) : (
            <OrderCard data={lastOrder} />
          )}
        </h4>
      </div>
    </div>
  );
};

export default Account;
