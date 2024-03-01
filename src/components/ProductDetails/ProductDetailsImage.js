import React, { useEffect, useState } from "react";
import UseCartFavourite from "../../hooks/useCartFavourite";

const ProductDetailsImage = ({
  images,
  item,
  id,
  color,
  image,
  title,
  price,
}) => {
  const {
    isItemInCart,
    addItemToCart,
    isItemInFavourite,
    removeFromFavourite,
    cart,
    addToFavourite,
    removeItemFromCart,
  } = UseCartFavourite();
  const [sliderImages] = useState(
    images?.map((item, index) => ({ id: index, src: item }))
  );
  const [src, setSrc] = useState();
  useEffect(() => {
    if (sliderImages && sliderImages.length && Array.isArray(sliderImages)) {
      setSrc(sliderImages[Math.floor(sliderImages?.length / 2)].src);
      console.log(sliderImages[Math.floor(sliderImages?.length / 2)].src)
    }
  }, [sliderImages]);
  return (
    <div className="productDetailsSlider">
      <div className="productBtn favouriteByn">
        {!isItemInFavourite(id) ? (
          <span onClick={() => addToFavourite({ item })}>
            {" "}
            <img
              src="https://res.cloudinary.com/duovxefh6/image/upload/v1707728121/Component_7_ihxuhv.png"
              alt=""
            />
          </span>
        ) : (
          <span
            onClick={() => removeFromFavourite({ itemIdToRemove: item?.id })}
          >
            <img
              width={20}
              height={20}
              className="remove-favourite"
              src="https://res.cloudinary.com/duovxefh6/image/upload/v1707737155/like_vje2go.png"
              alt=""
            />
          </span>
        )}
      </div>
      <div className="main_image">
        {/* {console.log(src)} */}
        <img src={src&&src.url.includes('.')?src.url:require("../../assets/images/no_image.png")} alt="" />
      </div>
      <div className="srcChanger">
        {images && images?.length && Array.isArray(images)
          ? images?.map((item) => {
              return (
                <span
                  className={
                    src?.id == item?.id
                      ? "sliderChanger active"
                      : "sliderChanger"
                  }
                  onClick={() =>{
                    console.log(item)
                    setSrc(item)
                  }}
                >
                  <img src={src?.url.includes('.')?src?.url:require("../../assets/images/no_image.png")} alt="" />
                </span>
              );
            })
          : null}
      </div>
    </div>
  );
};

export default ProductDetailsImage;
