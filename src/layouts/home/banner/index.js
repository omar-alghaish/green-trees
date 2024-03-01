import React, { useEffect, useState } from "react";
import SwiperSlideInstance from "../../../components/swiper/swiperSlide";
import SwiperInstance from "../../../components/swiper";
import { bannerArray } from "../../../data/banners";
import UseGeneral from "../../../hooks/useGeneral";
import "./style.css";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Autoplay,
  EffectCube,
  EffectFade,
  FreeMode,
  Navigation,
  Pagination,
} from "swiper/modules";
import { Axios } from "../../../Axios";
import { BASE_URL } from "../../../Axios/base_url";
import { Spinner } from "react-bootstrap";
import { ThreeCircles } from "react-loader-spinner";
const Banner = () => {
  const { language } = UseGeneral();
  const [banners, setBanners] = useState([]);
  const [pageLoading, setPageLoading] = useState(false);
  const getBanners = () => {
    setPageLoading(true);
    Axios({
      url: BASE_URL + `banners/get_all_user`,
      method: "GET",
    })
      .then((res) => {
        // console.log(res,"dwwe")
        if (res.status == "success") {
          setBanners(res.result);
          console.log(res);
          console.log(res.result);
        }
        // console.log(res)
      })
      .finally(() => {
        setPageLoading(false);
      });
  };
  useEffect(() => {
    getBanners();
  }, []);
  return (
    <div className="rowDiv bannerDiv">
      {pageLoading ? (
        // <Spinner />
        <div className="loading_container" style={{ height: "50vh" }}>
          <ThreeCircles />
        </div>
      ) : (
        <Swiper
          spaceBetween={30}
          slidesPerView={1}
          // navigation={true}
          effect={"cube"}
          modules={[EffectCube, FreeMode, Autoplay]}
          // pagination={{ clickable: true }}
          autoplay={{ delay: 5000 }}
          loop={true}
          dir={language != "en" ? "rtl" : "ltr"}
          key={language != "en"}
          breakPoints={{
            // when window width is >= 320px
            320: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            // when window width is >= 480px
            480: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            // when window width is >= 640px
            640: {
              slidesPerView: 1,
              spaceBetween: 30,
            },
            // when window width is >= 768px
            768: {
              slidesPerView: 1,
              spaceBetween: 40,
            },
          }}
        >
          {banners?.map((item, index) => {
            return (
              <SwiperSlide key={index}>
                <div
                  className="banner"
                  style={{
                    background: `url(${item?.background_image})`,
                  }}
                >
                  {console.log("rere")}
                  <button className="btn btn-danger">
                    {language === "ar"
                      ? item?.button_name
                      : item?.button_name_en}
                  </button>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      )}
    </div>
  );
};

export default Banner;
