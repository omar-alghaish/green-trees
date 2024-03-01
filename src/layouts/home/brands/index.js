import React from "react";
import { Autoplay, FreeMode } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import UseGeneral from "../../../hooks/useGeneral";
import "./style.css";
import { Loader } from "rsuite";
const Brands = ({ brands }) => {
  const { language } = UseGeneral();
  return (
    <>
      {!brands?<span style={{ margin: "auto", display: "flex", justifyContent: "center", alignItems: "center" }}> <Loader size="lg" /></span> : brands.length ? (
        <>
          <h3
            style={{
              textAlign: "center",
              fontSize: "35px",
              fontWeight: 700,
              marginTop: "56px",
            }}
          >
            {language == "ar" ? "أشهر العلامات" : "The most famous signs"}
          </h3>
          <div className="rowDiv bannerDiv" style={{ marginBottom: "65px" }}>
            <Swiper
              spaceBetween={30}
              slidesPerView={5}
              // navigation={true}
              modules={[FreeMode, Autoplay]}
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
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
                // when window width is >= 640px
                640: {
                  slidesPerView: 3,
                  spaceBetween: 30,
                },
                // when window width is >= 768px
                768: {
                  slidesPerView: 4,
                  spaceBetween: 40,
                },
              }}
            >
              {brands?.map((item, index) => (
                <SwiperSlide key={index}>
                  <img
                    src={
                      "https://res.cloudinary.com/duovxefh6/image/upload/v1707741205/1505147916PZnMk_lg_1_h6jfjf.svg"
                    }
                    alt=""
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </>
      ) : null}
    </>
  );
};

export default Brands;
