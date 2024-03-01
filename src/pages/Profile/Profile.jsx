import React, { useEffect, useState } from "react";
import UseGeneral from "../../hooks/useGeneral";
import PagesTag from "./Pages/PagesTag";
import Left from "./Left/Left";
import { BsList } from "react-icons/bs";
import { RiCloseFill } from "react-icons/ri";

import "./profile.css";
import { Axios } from "../../Axios";
import { BASE_URL } from "../../Axios/base_url";
const Profile = () => {
  const { language } = UseGeneral();
  const [currentPage, setCurrentPage] = useState("account");
  const [openList, setOpenList] = useState(false);
  const [userData, setUserData] = useState({});
  const handleActiveList = () => {
    setOpenList(!openList);
  };
  const getUserInfo = () => {
    Axios({
      url: BASE_URL + `user/me`,
      method: "POST",
    })
      .then((res) => {
        console.log(res);
        if (res.status == "success") {
          setUserData(res.result);
        }
      })
      .finally(() => {});
  };
  useEffect(() => {
    getUserInfo();
  }, []);
  return (
    <div className="profile_page">
      <div className="profile-header">
        <div>
          <h5>{language == "ar" ? "مرحبا" : "Welcome"}</h5>
          <p>{userData?.name}</p>
        </div>
        <div className="list-button" onClick={handleActiveList}>
          {openList ? <RiCloseFill /> : <BsList />}
        </div>
      </div>

      <div className="profile_content">
        <div className={`list-pages ${openList ? "active" : false}`}>
          <PagesTag setCurrentPage={setCurrentPage} />
        </div>
        <Left
          userData={userData}
          currentPage={currentPage}
          getUserInfo={getUserInfo}
        />
      </div>
    </div>
  );
};

export default Profile;
