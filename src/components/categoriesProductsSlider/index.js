import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import Product from '../product';
import './style.css'
const CategoriesProductsSlider = ({ productsData, language,getData }) => {
  return (
    <div
      className="rowDiv bannerDiv CategoriesProductsSlider"
      style={{ marginBottom: "65px" }}
    >
      <Swiper
        spaceBetween={20}
        slidesPerView={4}
        // navigation={true}
        // pagination={{ clickable: true }}
        autoplay={{ delay: 5000 }}
        loop={true}
        dir={language != "en" ? "rtl" : "ltr"}
        key={language != "en"}
        breakpoints={{
          // when window width is >= 320px
          320: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          // when window width is >= 480px
          480: {
            slidesPerView: 1,
            spaceBetween: 30,
          },

          // when window width is >= 640px
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          992:{
            slidesPerView: 3,
            spaceBetween: 30,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          1200:{
            slidesPerView: 4,
            spaceBetween: 30,
          }
        }}
      >
        {productsData?.map((item, index) => {
          return (
            <SwiperSlide className='product_slider_one' key={index}>
              <Product
              getData={getData}
                item={item}
                id={item?.id}
                image={item?.images&&item?.images[0]&&item?.images[0].url}
                isDetailed={true}
                images={Array(3)
                  .fill(item?.images)
                  .map((item) => item)}
                title={language=='ar'?item.title_ar:item.title_en}
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
