import React, { useEffect, useState } from "react";
import "./about.css";
import logo from "../../assets/images/logo.png";
import { Axios } from "../../Axios";
import { BASE_URL } from "../../Axios/base_url";
import { ThreeCircles, ThreeDots } from "react-loader-spinner";

import UseGeneral from "../../hooks/useGeneral";
const About = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});
  const { language } = UseGeneral();
  const [logo, setLogo] = useState();

  const getAbouts = () => {
    setLoading(true);
    Axios({
      url: BASE_URL + `site_info/get_all_for_user`,
      method: "GET",
    })
      .then((res) => {
        if (res?.status == "success") {
          setData(res?.result);
          setLogo(res?.result?.logo);
          setLoading(false);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getAbouts();
  }, []);

  console.log(data?.logo);

  return (
    <div className="about-container">
      {loading ? (
        <ThreeCircles />
      ) : (
        <>
          <div className="logo">
            <img src={logo} alt="" />
          </div>
          <div className="description">
            {language == "ar" ? data?.description_ar : data?.description_en}
          </div>
        </>
      )}
    </div>
  );
};

export default About;
