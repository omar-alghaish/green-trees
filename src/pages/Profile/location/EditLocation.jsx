import React, { useEffect, useState } from "react";
import { Axios } from "../../../Axios";
import { BASE_URL } from "../../../Axios/base_url";
import toast from "react-hot-toast";
import UseGeneral from "../../../hooks/useGeneral";
import { useLocation, useNavigate } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";

const EditLocation = () => {
  const location = useLocation();
  const { language } = UseGeneral();
  const [editedLocation, setEditedLocation] = useState({});
  const [regions, setRegions] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState("");
  const [addLoading, setAddLoading] = useState(false);
  const [selectedDis, setSelectedDis] = useState("");
  const [getReg_id, setGetReg_id] = useState("");
  const [districts, setDistricts] = useState([]);
  const [editLoading, setEditLoading] = useState(false);
  const navigate = useNavigate();
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
      .catch((e) => {})
      .finally(() => {
        setAddLoading(false);
      });
  };

  const getRegionDist = () => {
    const data_send = {
      region_id: selectedRegion,
    };
    Axios({
      url: BASE_URL + "districts/get_all_for_user",
      method: "POST",
      data: data_send,
    })
      .then((res) => {
        if (res.message == "Sission Ended Login Again") {
          toast.error(res.message);
        }
        if (res.status == "success") {
          setDistricts(res.result);
          // setSelectedDis(res.result[0].id);
        }
      })
      .catch((e) => {})
      .finally(() => {
        setAddLoading(false);
      });
  };
  const eqData = () => {
    setEditedLocation({ ...location?.state?.locationnData });
  };
  const editLocationFunc = () => {
    setEditLoading(true);
    const data_send = {
      ...editedLocation,
      selectedDis,
      selectedRegion,
    };
    console.log(data_send);
    Axios({
      url: BASE_URL + `userlocation/update_location/${editedLocation?.id}`,
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
      .catch((e) => {})
      .finally(() => {
        setEditLoading(false);
      });
    navigate(-1);
  };
  useEffect(() => {
    getRegionDist();
  }, [selectedRegion]);
  useEffect(() => {
    getRegions();
    eqData();
  }, []);
  return (
    <div className="add-location-container m-auto w-100">
      <form
        className="m-auto"
        onSubmit={(e) => {
          e.preventDefault();
          editLocationFunc();
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
            value={editedLocation.name}
            onChange={(e) => {
              setEditedLocation({ ...editedLocation, name: e.target.value });
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
            value={editedLocation.phone}
            onChange={(e) => {
              setEditedLocation({ ...editedLocation, phone: e.target.value });
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
            value={editedLocation.city}
            onChange={(e) => {
              setEditedLocation({ ...editedLocation, city: e.target.value });
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
              {districts &&
                districts.map((item, index) => {
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
          <label htmlFor="street">
            الشارع
            <span className="star">*</span>
          </label>
          <input
            type="text"
            placeholder="ادخل اسم الشارع"
            name="street"
            value={editedLocation.streat}
            onChange={(e) => {
              setEditedLocation({ ...editedLocation, streat: e.target.value });
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
              value={editedLocation.architecture}
              onChange={(e) => {
                setEditedLocation({
                  ...editedLocation,
                  architecture: e.target.value,
                });
              }}
              type="text"
              placeholder=""
              name="architecture"
            />
          </div>
          <div className="input-form">
            <label htmlFor="floor">دور</label>
            <input
              value={editedLocation.floor}
              onChange={(e) => {
                setEditedLocation({ ...editedLocation, floor: e.target.value });
              }}
              type="text"
              placeholder=""
              name="floor"
            />
          </div>
          <div className="input-form">
            <label htmlFor="apartment">شقه</label>
            <input
              value={editedLocation.apartment}
              onChange={(e) => {
                setEditedLocation({
                  ...editedLocation,
                  apartment: e.target.value,
                });
              }}
              type="text"
              placeholder=""
              name="apartment"
            />
          </div>
        </div>

        <div className="input-form">
          <label htmlFor="special_marque">علامه مميزه</label>
          <input
            value={editedLocation.special_marque}
            onChange={(e) => {
              setEditedLocation({
                ...editedLocation,
                special_marque: e.target.value,
              });
            }}
            type="text"
            placeholder="مثال: بجانب مكتن ما"
            name="special_marque"
          />
        </div>

        <div className="input-form">
          <label htmlFor="location">اسم العنوان </label>
          <input
            value={editedLocation.location}
            onChange={(e) => {
              setEditedLocation({
                ...editedLocation,
                location: e.target.value,
              });
            }}
            type="text"
            placeholder="مثال: منزل, عمل..."
            name="location"
          />
        </div>
        {editLoading ? (
          <ThreeDots />
        ) : (
          <button
            style={{ marginBottom: "20px" }}
            type="submit"
            className="submit-button"
          >
            {language == "ar" ? "  تعديل العنوان" : "Edit Location"}
          </button>
        )}
      </form>
    </div>
  );
};

export default EditLocation;
