import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import Product from '../product';

const CategoriesProductsSlider = ({ productsData, language }) => {
  return (
    <div
      className="rowDiv bannerDiv CategoriesProductsSlider"
      style={{ marginBottom: "65px" }}
    >
      <Swiper
        spaceBetween={30}
        slidesPerView={3}
        // navigation={true}
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
            slidesPerView: 3,
            spaceBetween: 40,
          },
        }}
      >
        {productsData?.map((item, index) => {
          return (
            <SwiperSlide key={index}>
              <Product
                item={item}
                id={item?.id}
                image={item?.image}
                isDetailed={true}
                images={Array(3)
                  .fill(item?.image)
                  .map((item) => item)}
                title={item?.title[language]}
                price={item?.price}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default CategoriesProductsSlider;
