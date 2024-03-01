import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import "./addLocation.css";
import { Axios } from "../../../Axios";
import { BASE_URL } from "../../../Axios/base_url";
import toast from "react-hot-toast";
import UseGeneral from "../../../hooks/useGeneral";
import { ThreeDots } from "react-loader-spinner";

const AddLocation = () => {
  const { language } = UseGeneral();
  const [regions, setRegions] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState("");
  const [addLoading, setAddLoading] = useState(false);
  const [selectedDis, setSelectedDis] = useState("");
  const [districts, setDistricts] = useState([]);
  const [regName, setRegName] = useState("");
  const [disName, setDisName] = useState("");
  const [newLoc, setNewLoc] = useState({
    name: "",
    phone: "",
    city: "",
    streat: "",
    architecture: "",
    floor: "",
    apartment: "",
    special_marque: "",
    location: "",
    status: 0,
  });
  const getRegions = () => {
    Axios({
      url: BASE_URL + "regions/get_all_for_user",
      method: "GET",
    })
      .then((res) => {
        if (res.message == "Sission Ended Login Again") {
          toast.error(res.message);
        }
        if (res.status == "success") {
          setRegions(res.result);
          setSelectedRegion(res.result[0].id);
        }
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        setAddLoading(false);
      });
  };
  const addNewLocation = () => {
    if (newLoc.name == "") {
      toast.error(language == "ar" ? "أدخل الإسم" : "Enter Name");
      return;
    }
    if (newLoc.phone == "") {
      toast.error(language == "ar" ? "أدخل رقم الهاتف" : "Enter Phone");
      return;
    }
    if (newLoc.city == "") {
      toast.error(language == "ar" ? "أدخل المدينه" : "Enter city");
      return;
    }
    if (newLoc.streat == "") {
      toast.error(language == "ar" ? "أدخل الشارع" : "Enter streat");
      return;
    }
    if (newLoc.architecture == "") {
      toast.error(language == "ar" ? "أدخل العماره" : "Enter architecture");
      return;
    }
    if (newLoc.floor == "") {
      toast.error(language == "ar" ? "أدخل الطابق" : "Enter floor");
      return;
    }
    if (newLoc.apartment == "") {
      toast.error(language == "ar" ? "أدخل الشقه" : "Enter apartment");
      return;
    }
    if (newLoc.special_marque == "") {
      toast.error(
        language == "ar" ? "أدخل علامه مميزه" : "Enter special marque"
      );
      return;
    }
    if (newLoc.location == "") {
      toast.error(language == "ar" ? "أدخل الموقع" : "Enter location");
      return;
    }
    if (selectedRegion == "") {
      toast.error(language == "ar" ? "أدخل المنطقه" : "Enter Region");
    }
    if (selectedDis == "") {
      toast.error(language == "ar" ? "أدخل الحى" : "Enter District");
    }
    setAddLoading(true);
    const data_send = {
      ...newLoc,
      region: selectedRegion,
      district: selectedDis,
    };
    console.log(data_send);
    Axios({
      url: BASE_URL + "userlocation/add_new_location",
      method: "POST",
      data: data_send,
    })
      .then((res) => {
        console.log(res);
        if (res.message == "Sission Ended Login Again") {
          toast.error(res.message);
        }
        if (res.status == "success") {
          toast.success(res.message);
        }
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        setAddLoading(false);
      });
  };
  const getRegionDist = () => {
    const data_send = {
      region_id: selectedRegion,
    };
    console.log("data_send", data_send);
    Axios({
      url: BASE_URL + "districts/get_all_for_user",
      method: "POST",
      data: data_send,
    })
      .then((res) => {
        console.log(res, "REre");
        if (res.message == "Sission Ended Login Again") {
          toast.error(res.message);
        }
        if (res.status == "success") {
          setDistricts(res.result);
          setSelectedDis(res.result[0].id);
        }
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        setAddLoading(false);
      });
  };

  console.log(districts);
  useEffect(() => {
    getRegionDist();
  }, [selectedRegion]);
  useEffect(() => {
    getRegions();
  }, []);
  return (
    <div className="add-location-container">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addNewLocation();
        }}
      >
        <div className="input-form">
          <label htmlFor="">
            الاسم ثنائي
            <span className="star">*</span>
          </label>
          <input
            type="text"
            placeholder="ادخل اسمك الثنائي"
            name="name"
            onChange={(e) => {
              setNewLoc({ ...newLoc, name: e.target.value });
            }}
          />
        </div>

        <div className="input-form">
          <label htmlFor="">
            رقم الموبايل
            <span className="star">*</span>
          </label>
          <input
            type="text"
            placeholder="ادخل رقم الهاتف"
            name="phone"
            onChange={(e) => {
              setNewLoc({ ...newLoc, phone: e.target.value });
            }}
          />
        </div>

        <div className="input-form">
          <label htmlFor="">
            المدينه
            <span className="star">*</span>
          </label>
          <input
            type="text"
            placeholder="ادخل اسم المدينة"
            name="city"
            onChange={(e) => {
              setNewLoc({ ...newLoc, city: e.target.value });
            }}
          />
        </div>
        <div className="row4" style={{ flexWrap: "wrap" }}>
          <div className="input-form">
            <label htmlFor="region">
              المنطقه
              <span className="star">*</span>
            </label>
            <select
              name="region"
              id="region"
              placeholder="اختر"
              onChange={(e) => {
                setSelectedRegion(e.target.value);
              }}
              value={selectedRegion}
            >
              {regions.map((item, index) => {
                return (
                  <option value={item.id}>
                    {language == "ar" ? item.title_ar : item.title_en}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="input-form">
            <label htmlFor="district">
              الحي
              <span className="star">*</span>
            </label>
            <select
              name="district"
              id="district"
              value={selectedDis}
              placeholder="اختر"
              onChange={(e) => {
                setSelectedDis(e.target.value);
                // setNewLoc({...newLoc,district:e.target.value})
              }}
            >
              {districts.map((item, index) => {
                return (
                  <option value={item.id}>
                    {language == "ar" ? item.title_ar : item.title_en}
                  </option>
                );
              })}
            </select>
          </div>
        </div>

        <div className="input-form">
          <label htmlFor="streat">
            الشارع
            <span className="star">*</span>
          </label>
          <input
            type="text"
            placeholder="ادخل اسم الشارع"
            name="streat"
            onChange={(e) => {
              setNewLoc({ ...newLoc, streat: e.target.value });
            }}
          />
        </div>

        <div className="row6" style={{ flexWrap: "wrap" }}>
          <div className="input-form">
            <label htmlFor="architecture">
              العماره
              <span className="star">*</span>
            </label>
            <input
              type="text"
              placeholder=""
              name="architecture"
              onChange={(e) => {
                setNewLoc({ ...newLoc, architecture: e.target.value });
              }}
            />
          </div>
          <div className="input-form">
            <label htmlFor="floor">دور</label>
            <input
              type="text"
              placeholder=""
              name="floor"
              onChange={(e) => {
                setNewLoc({ ...newLoc, floor: e.target.value });
              }}
            />
          </div>
          <div className="input-form">
            <label htmlFor="apartment">شقه</label>
            <input
              type="text"
              placeholder=""
              name="apartment"
              onChange={(e) => {
                setNewLoc({ ...newLoc, apartment: e.target.value });
              }}
            />
          </div>
        </div>

        <div className="input-form">
          <label htmlFor="special_marque">علامه مميزه</label>
          <input
            type="text"
            placeholder="مثال: بجانب مكتن ما"
            name="special_marque"
            onChange={(e) => {
              setNewLoc({ ...newLoc, special_marque: e.target.value });
            }}
          />
        </div>

        <div className="input-form">
          <label htmlFor="location">اسم العنوان </label>
          <input
            type="text"
            placeholder="مثال: منزل, عمل..."
            name="location"
            onChange={(e) => {
              setNewLoc({ ...newLoc, location: e.target.value });
            }}
          />
        </div>

        <div className="input-form radio-button-container">
          <div class="content">
            <label
              checked={newLoc.status == 1}
              onClick={() => {
                setNewLoc({ ...newLoc, status: newLoc.status == 1 ? 0 : 1 });
              }}
              class="checkBox"
            >
              <input
                checked={newLoc.status == 1}
                onChange={() => {
                  console.log(newLoc.status);
                  setNewLoc({ ...newLoc, status: newLoc.status == 1 ? 0 : 1 });
                }}
                id="ch1"
                type="checkbox"
              />
              <div class="transition"></div>
            </label>
          </div>

          <label
            onClick={() => {
              setNewLoc({ ...newLoc, status: newLoc.status == 1 ? 0 : 1 });
            }}
            htmlFor="status"
          >
            حفظ كعنوان رئيسي
          </label>

          {/* <div className="error">{formik.errors.status}</div> */}
        </div>

        {addLoading ? (
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
          <button type="submit" className="submit-button">
            حفظ العنوان
          </button>
        )}
      </form>
    </div>
  );
};

export default AddLocation;
