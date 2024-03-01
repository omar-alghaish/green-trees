import React, { useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";
import AddLocation from "./AddLocation";
import "./location.css";
import { Axios } from "../../../Axios";

import { BASE_URL } from "../../../Axios/base_url";
import { ThreeCircles, ThreeDots } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import UseGeneral from "../../../hooks/useGeneral";
const Location = ({ userData }) => {
  const [isAddingNewLocation, setIsAddingNewLocation] = useState(false);
  const [data, setData] = useState({});
  const [pageLoading, setPageLoading] = useState(false);
  const [mainLocation, setMainLocation] = useState({});
  const navigate = useNavigate();
  const { language } = UseGeneral();

  useEffect(() => {
    setData(userData);
  }, [userData]);
  console.log(userData);
  const [locations, setLocations] = useState([]);
  console.log(userData.location);
  const handleAddComponent = () => {
    setIsAddingNewLocation(true);
  };

  const getAllUserLocations = () => {
    setPageLoading(true);
    Axios({
      url: BASE_URL + `userlocation/get_user_locations`,
      method: "GET",
    })
      .then((res) => {
        if (res?.status == "success") {
          setLocations(res?.result);
          const theMain = res.result.find((item) => item?.status == "1");
          setMainLocation(theMain);
          setPageLoading(false);
        }
      })
      .finally(() => {
        setPageLoading(false);
      });
  };

  console.log(pageLoading);
  console.log(locations);
  console.log(mainLocation);

  const openEditPage = (location) => {
    navigate("/EditLocation", { state: { locationnData: location } });
  };

  useEffect(() => {
    getAllUserLocations();
  }, []);

  return (
    <div className="location-container">
      {isAddingNewLocation ? (
        <div>
          <AddLocation />
        </div>
      ) : (
        <div className="location-list">
          <div className="mainLocation">
            <div className="row1">
              <h1>{language == "ar" ? "العنوان الرئيسي" : "Main address"}</h1>
              <div className="icon-container">
                <FiEdit onClick={() => openEditPage(mainLocation)} />
              </div>
            </div>
            <div className="details">
              <h3>
                {mainLocation?.special_marque ||
                  (language == "ar" ? "لا يوجد عنوان" : "No location")}
              </h3>
            </div>
          </div>

          <div className="locations">
            {pageLoading ? (
              <ThreeCircles />
            ) : (
              locations.map((loc, index) => (
                <div className="location" key={index}>
                  <div className="row1">
                    <h3>{loc?.location}</h3>
                    <div className="icon-container">
                      <FiEdit onClick={() => openEditPage(loc)} />
                    </div>
                  </div>
                  <div className="details">
                    <h5>{loc?.special_marque}</h5>
                  </div>
                </div>
              ))
            )}
          </div>
          <button className="add-location-button" onClick={handleAddComponent}>
            {language == "ar" ? "اضافة عنوان جديد" : "add location"}
          </button>
        </div>
      )}
    </div>
  );
};

export default Location;
