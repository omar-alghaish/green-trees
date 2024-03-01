import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Checkoutcartdetails from "../../components/checkoutcartdetails/checkoutcartdetails";
import UseCartFavourite from "../../hooks/useCartFavourite";
import UseGeneral from "../../hooks/useGeneral";
import Options from "../options/options";
import ProductDetailsImage from "./ProductDetailsImage";
import ProductDetailsTexts from "./productDetailsTexts";
import "./style.css";
const ProductDetailsComponent = ({ images, item, id, title, price,getItmData }) => {
  console.log(item)
  const { language } = UseGeneral();
  const { cart, totalPrice, totalQuantity, isItemInCart } = UseCartFavourite();

  const location = useLocation();
  const product_id = location?.state?.product_id;
  const [choosedOption, setChoosedOptions] = useState(item?.options);
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [location?.pathname, id]);

  useEffect(() => {
    const selectedProduct = cart?.filter((item) => item?.id == id)[0];
    if (
      selectedProduct &&
      isItemInCart(id) &&
      selectedProduct?.options &&
      selectedProduct?.options?.length
    ) {
      const newOptions = item?.options.map((item) => {
        const newItem = selectedProduct?.options?.filter(
          (opItem) => opItem?.id == item?.id
        )[0];
        return newItem && newItem?.id ? newItem : item;
      });
      setChoosedOptions([...newOptions]);
    }
  }, [cart, item]);
  useEffect(() => {
    console.log("choosedOption", choosedOption);
  }, [choosedOption]);
  return (
    <div className="rowDiv CartProducts">
      <div className="rowSpaceBetween">
        <div className="smallRowDiv">
          <ProductDetailsImage
            images={item.images&&item.images}
            item={item}
            id={id}
            title={title}
            price={price}
          />
          <ProductDetailsTexts
            setChoosedOptions={setChoosedOptions}
            choosedOption={choosedOption}
            item={item}
            getItmData={getItmData}
          />
        </div>
        {item?.options && item?.options?.length ? (
          <div className="productDetailsOptions">
            <Options
              options={choosedOption}
              language={language}
              setChoosedOptions={setChoosedOptions}
            />
            <img src={require("../../assets/images/Line 17.png")} alt="" />
            <Checkoutcartdetails
              cart={cart}
              language={language}
              totalPrice={totalPrice}
              totalQuantity={totalQuantity}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default ProductDetailsComponent;
