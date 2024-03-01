import React, { useState } from "react";
import AddBtn from "./addBtn";
import DecreaseBtn from "./decrease";
import "./style.css";
import TextInput from "./textInput";
import { Axios } from "../../Axios";
import { BASE_URL } from "../../Axios/base_url";
import { addToCart, decreaseBTN } from "../../assets/svgIcons";
import { Spinner } from "react-bootstrap";
import toast from "react-hot-toast";
const ProductInCartMangeButton = ({ itemIdToIncrement, update, quantity,item,updateCart,delCartItem }) => {
  const [incLoading,setIncLoading]=useState(false)
  const handleIncreae=(new_count)=>{
    setIncLoading(true)
    Axios({
      url: BASE_URL + `cart/change_count/${item.cart_id}?new_count=${new_count}`,
      method: "GET",
    })
    .then((res)=>{
      if(res.status=='success'){
        updateCart()
        toast.success(res.message);
      }
    })
    .catch(e=>console.log(e))
    .finally(()=>{
      setIncLoading(false)
    })
  }
  return (
    incLoading?
    (
      <Spinner/>
    )
    :
    (
      <div className="ProductInCartMangeButton">
      {/* <AddBtn onClick={()=>{
        console.log("erer")
        handleIncreae(quantity+1)
      }} update={update} itemIdToIncrement={itemIdToIncrement} /> */}

      <span
      className="addBTN"
      onClick={() =>{
        // console.log("erer")
        handleIncreae(quantity+1)
      }}
    >
      {

          addToCart

      }
    </span>
      <TextInput text={quantity} />
      <span
      className="addBTN"
      onClick={() => {
        if(quantity==1){
          delCartItem(item.product_id);
        }
        if(quantity>1){
          handleIncreae(quantity-1)
        }

      }}
    >
      {
          decreaseBTN

      }
    </span>
      {/* <DecreaseBtn update={update} itemIdToIncrement={itemIdToIncrement} /> */}
    </div>
    )
  );
};

export default ProductInCartMangeButton;
