import React from "react";
import { Swiper } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/swiper-bundle.css";
import "swiper/css";
import "./style.css";
import "swiper/swiper-bundle.css";
import "swiper/css/navigation";
import "swiper/css/pagination";
const SwiperInstance = ({ breakPoints, children }) => {
  return (
    <Swiper
      spaceBetween={30}
      slidesPerView={1}
      breakpoints={breakPoints}
      navigation={true}
      modules={[Navigation]}
      pagination={{ clickable: true }}
      // autoplay={{ delay: 5000 }}
      loop={true}
    >
      {children}
    </Swiper>
  );
};

export default SwiperInstance;
