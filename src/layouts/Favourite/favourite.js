import React, { useEffect, useState } from 'react';
import "./style.css";
import UseGeneral from '../../hooks/useGeneral';
import UseCartFavourite from '../../hooks/useCartFavourite';
import Product from '../../components/product';
import { Axios } from '../../Axios';
import { BASE_URL } from '../../Axios/base_url';
import toast from 'react-hot-toast';
const Favourites = () => {
  const { language } = UseGeneral();
  const { favourite } = UseCartFavourite();
  const [pageLoading,setPageLoading]=useState(false)
  const [favs,setFavs]=useState([]);
  const getUserFavs=()=>{
    Axios({
      url: BASE_URL + "favorits/get_all",
      method: "GET",
    }).then((res)=>{
      console.log(res.result[0])
      if(res.message=="Sission Ended Login Again"){
        toast.error(res.message)
      }
      if(res.status=='success'){
        setFavs(res.result)
      }
    }).finally(()=>{
      setPageLoading(false)
    })
  }
  useEffect(()=>{
    getUserFavs()
  },[])
  return (
    <div className="rowDiv HomeProducts">
      {favs && favs?.length ? (
        favs?.map((item) => {
          return (
            <Product
              getData={getUserFavs}
              item={item}
              id={item?.product_favorit_id}
              image={item?.product.images[0].url}
              title={language=='ar'?item.product.title_ar:item.product.title_en}
              price={item?.product?.price}
            />
          );
        })
      ) : (
        <h4>
          {language == "ar"
            ? "لا يوجد منتجات في المفضلة"
            : "No Products In Favourite"}
        </h4>
      )}
    </div>
  );
};

export default Favourites;
