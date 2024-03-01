import React, { useEffect, useState } from 'react';
import "./style.css";
import UseGeneral from '../../hooks/useGeneral';
import UseCartFavourite from '../../hooks/useCartFavourite';
import { Link } from 'react-router-dom';
import Product from '../../components/product';
import ProductInCart from '../../components/product/ProductInCart';
import Checkoutcartdetails from '../../components/checkoutcartdetails/checkoutcartdetails';
import { Axios } from '../../Axios';
import { BASE_URL } from '../../Axios/base_url';
import toast from 'react-hot-toast';
import axios from 'axios';
import { Spinner } from 'react-bootstrap';
const CartLayout = () => {
  const { language } = UseGeneral();
  const { cart, totalPrice, totalQuantity } = UseCartFavourite();
  const [cartsData,setCartsData]=useState([]);
  const [cartTotalPrice,setCartTotalPrice]=useState(0);
  const [pageLoading,setPageLoading]=useState(false)
  const getUserData=()=>{
    setPageLoading(true)
    Axios({
      url: BASE_URL + "cart/all_carts_for_user",
      method: "GET",
    }).then((res)=>{
      console.log(res)
      if(res.message=="Sission Ended Login Again"){
        toast.error(res.message)
      }
      if(res.status=='success'){
        // let allCartData=[...res.result];
        setCartsData(res.result.carts)
      }
    }).finally(()=>{
      setPageLoading(false)
    })
  }
  const getMeData=()=>{
    Axios({
      url: BASE_URL + "user/me",
      method: "POST",
    }).then((res)=>{
      if(res.message=="Sission Ended Login Again"){
        toast.error(res.message)
      }
      if(res.status=='success'){
        setCartTotalPrice(res.result.cart_total_price*1-res.result.money_minus*1);
      }
    }).finally(()=>{
      setPageLoading(false)
    }).catch(e=>{
      console.log(e)
    })
  }
  useEffect(()=>{
    getUserData()
    getMeData()
  },[])
  return (
    <div className="rowDiv CartProducts">
      {
        pageLoading?
        (
          <Spinner/>
        )
        :(
          <div className="rowSpaceBetween">
        <div className="columnDiv">
          {cartsData && cartsData?.length ? (
            cartsData?.map((item) => {
              return (
                <ProductInCart
                  updateData={getUserData}
                  item={item.cart_product}
                  id={item?.id}
                  image={item?.cart_product?.product.images[0].url}
                  title={language=='ar'?item?.cart_product.product.title_ar:item.product.title_en}
                  price={item?.cart_product.product_price}
                  quantity={item?.cart_product.product_count ? item?.cart_product.product_count*1 : 0}
                />
              );
            })
          ) : (
            <>
              <h4>
                {language == "ar"
                  ? "لا يوجد منتجات في العربة"
                  : "No Products In Cart"}
              </h4>
            </>
          )}
        </div>
        <Checkoutcartdetails
          getUserData={getUserData}
          cart={cart}
          total_check={cartTotalPrice}
          language={language}
          totalPrice={totalPrice}
          totalQuantity={totalQuantity}
        />
      </div>
        )
      }
    </div>
  );
};

export default CartLayout;
