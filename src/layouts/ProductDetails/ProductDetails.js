import React, { useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import ProductDetailsComponent from "../../components/ProductDetails/ProductDetails";
import RelatedProducts from "../../components/ProductDetails/relatedProducts";
import { productsData } from "../../data/homeProducts";
import UseGeneral from "../../hooks/useGeneral";
import "./style.css";
import { BASE_URL } from "../../Axios/base_url";
import { Axios } from "../../Axios";
const ProductDetailsLayout = () => {
  const localData=localStorage.getItem('green_trees');
  const userId=localData&&JSON.parse(localData);
  console.log(userId)
  const { language } = UseGeneral();
  const location = useLocation();
  const [loading,setLoading]=useState(true)
  const [searchParams] = useSearchParams();
  // console.log(searchParams?.get("id"))
  const [data,setData]=useState({});
  const getData = () =>
  Axios({
    url: BASE_URL + `products/get_product_by_id/${searchParams?.get("id")}`,
    method: "POST",
    data:{id:userId}
  }).then((res) => {
    console.log(res,"ppp");
    setData(res?.result);
  }).finally(()=>{
    setLoading(false)
  });
useEffect(() => {
  getData();
}, []);
  return (
    <div className="rowDiv CartProducts product_details">
      <div className="rowSpaceBetween">
        <div className="rowDiv HomeProducts">
        {
          loading?
          '...loading'
          :
          data&&
          <ProductDetailsComponent
          getItmData={getData}
          item={data}
          id={data?.id}
          image={data?.images&&data?.images[0].url}
          images={Array(3)
            .fill(data?.images)
            .map((item) => item)}
          title={data.title&&data?.title[language]}
          price={data?.price}
        />
        }
        </div>
      </div>
      <RelatedProducts products={data?.productrelateds}/>
    </div>
  );
};

export default ProductDetailsLayout;
