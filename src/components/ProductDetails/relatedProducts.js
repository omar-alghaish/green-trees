import React from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { Autoplay, FreeMode } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { productsData } from "../../data/homeProducts";
import UseGeneral from "../../hooks/useGeneral";
import Product from "../product";
import "./style.css";
const RelatedProducts = ({products}) => {
  // console.log(products)
  const { language } = UseGeneral();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  return (
    <div className="relatedProductsSlider">
      <h3
        style={{
          textAlign: "center",
          fontSize: "35px",
          fontWeight: 700,
          marginTop: "56px",
        }}
      >
        {language == "ar" ? "ربما يعجبك أيضا" : "You may also like"}
      </h3>
      <div className="rowDiv bannerDiv" style={{ marginBottom: "65px" }}>
        <Swiper
          spaceBetween={30}
          slidesPerView={3}
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
              slidesPerView: 3,
              spaceBetween: 40,
            },
          }}
        >
          {products&&products>0?products
            ?.filter(
              (item) =>
                item?.category?.id ==
                products?.filter(
                  (item) => item?.id == searchParams?.get("id")
                )[0]?.category?.id
            )
            ?.map((item, index) => {
              return (
                <SwiperSlide key={index}>
                  <Product
                    item={item}
                    id={item?.id}
                    image={item?.product?.images[0].url}
                    isDetailed={true}
                    images={Array(3)
                      .fill(item?.product?.images)
                      .map((item) => item)}
                    title={language=='ar'?item.product.title_ar:item.product.title_en}
                    price={item?.product.price}
                  />
                </SwiperSlide>
              );
            })
            :
            <div
              style={{
                display:'flex',
                alignItems:'center',
                justifyContent:'center',
                flexDirection:'column',
                gap:'5px'
              }}
            >
              <img src={require('../../assets/images/no_image.png')} alt="" />
              <h5>{language=='ar'?'لا يوجد منتجات متشابهه':'There Are Not Related Products'}</h5>
            </div>
          }
        </Swiper>
      </div>
    </div>
  );
};

export default RelatedProducts;
