import React, { useEffect, useState } from "react";
import { Axios } from "../../Axios";
import { BASE_URL } from "../../Axios/base_url";
import toast from "react-hot-toast";
import UseGeneral from "../../hooks/useGeneral";
const PayProducts = () => {
  const { language } = UseGeneral();
  const [cartTotalPrice,setCartTotalPrice]=useState(0);
  const [pageLoading,setPageLoading]=useState(false)
  const [cartData,setCartsData]=useState([]);
  const getUserData=()=>{
    setPageLoading(true)
    Axios({
      url: BASE_URL + "cart/all_carts_for_user",
      method: "GET",
    }).then((res)=>{
      console.log(res,"eww")
      if(res.message=="Sission Ended Login Again"){
        toast.error(res.message)
      }
      if(res.status=='success'){
        if(Array.isArray(res.result.carts)){
          setCartsData(res.result.carts)
        }
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
    <div className="pay-products-card-container">
      <div className="top">
        <h4>{language=='ar'?'المنتجات':'Products'}</h4>
        {
          language=='ar'?
          <p>لديك {cartData.length} منتجات</p>
          :
          <p>
            You Have {cartData.length} Products
          </p>
        }
      </div>
      <div className="products">
        {cartData.map((item) => (
          <>
            <div className="row">
              <div className="right">
                <div className="img-container">
                  {/* <img
                    src={
                      "https://res.cloudinary.com/duovxefh6/image/upload/v1707727474/%D8%AC%D8%A8%D9%86%D8%A9-%D9%82%D8%AF%D9%8A%D9%85%D8%A9_1_oms201.png"
                    }
                  /> */}
                  <img src={item.cart_product.product.images[0]&&item.cart_product.product.images[0].url.includes('.')?item.cart_product.product.images[0].url:require('../../assets/images/no_image.png')} alt="" />
                </div>
                <div className="details">
                  <strong>
                    {language=='ar'?item.cart_product.product.title_ar:item.cart_product.product.title_en}
                  </strong>
                  {/* <p>
                    الكميه:{item.cart_product.num_grams}
                  </p> */}
                </div>
              </div>

              <div className="price">
                <p>
                {item.cart_product.product_price}AED</p>
                <span>{language=='ar'?'الكميه':'quantity'}:</span>
                <span>{item.cart_product.product_count*1}</span>
              </div>
            </div>
            <div className="divider"></div>
          </>
        ))}
      </div>
    </div>
  );
};

export default PayProducts;
