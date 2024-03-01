import React, { useState } from "react";
import { addToCart, removeFromCart } from "../../assets/svgIcons";
import UseCartFavourite from "../../hooks/useCartFavourite";
import UseGeneral from "../../hooks/useGeneral";
import ProductInCartMangeButton from "../productInCartMangeButton/productInCartMangeButton";
import "./style.css";
import { Axios } from "../../Axios";
import { BASE_URL } from "../../Axios/base_url";
import toast from "react-hot-toast";
import { Spinner } from "react-bootstrap";
const ProductInCart = ({ item, id, color, image, title, price, quantity,updateData }) => {
  const { isItemInCart, addItemToCart, removeItemFromCart, update } =
    UseCartFavourite();
  const { language } = UseGeneral();
  const [delLoading,setDelLoading]=useState(false)
  const handleDelFromCart=(id)=>{
    setDelLoading(true)
    const data_send={
      product_id:id,
      product_count:1,
      has_option:0,
    }
    Axios({
      url: BASE_URL + "cart/add_to_cart",
      method: "POST",
      data:data_send
    }).then((res)=>{
      console.log(res)
      if(res.status=='success'){
        toast.success(res.message);
        updateData()
      }
    }).finally(()=>{
      setDelLoading(false)
    })
  }
  return (
    <div
      className="category productInCart columnDiv"
      style={{ background: "#F6F4F4" }}
    >
      <img src={image.includes('.')?image:require("../../assets/images/no_image.png")} alt="" />
      <div className="productDetails">
        <h4>{title}</h4>
        <p>{language == "ar" ? "الوصف" : "Description"}</p>
        <div className="priceWithDiscount">
        {
            item?.cart_product&&item?.cart_product.discount!='0.00'?
            <del className="priceWithoutDiscount">{price} Aed</del>
            :
              null
          }
          {/* <del className="priceWithoutDiscount">{price} Aed</del> */}
          <h6>
            {price} <sub>Aed</sub>
          </h6>
        </div>
      </div>
      {
        delLoading?(
          <Spinner/>
        )
        :
        (<div
          className={
            false
              ? "productBtn cartBtn"
              : "productBtn cartBtn removeBtn"
          }
          onClick={() =>{
            // console.log(item)
              handleDelFromCart(item.product.id)
            }
          }
        >
          {false ? addToCart : removeFromCart}
        </div>)
      }
      <ProductInCartMangeButton
      updateCart={updateData}
      delCartItem={handleDelFromCart}
        item={item}
        update={update}
        itemIdToIncrement={id}
        quantity={quantity}
      />
    </div>
  );
};

export default ProductInCart;
