import React from "react";
import UseGeneral from "../../hooks/useGeneral";
import Breadcrumb from "../../components/BreadCumbsLinks";
import ProductDetailsLayout from "../../layouts/ProductDetails/ProductDetails";
import { productsData } from "../../data/homeProducts";
import Product from "../../components/product";
import { useLocation, useSearchParams } from "react-router-dom";

const ProductDetails = () => {
  const { language } = UseGeneral();
  const location = useLocation();
  const breadCrumbsLinks = [
    { name: language != "ar" ? "Home" : "الصفحة الرئيسية", path: "/" },
    {
      name: language != "ar" ? "Product Details" : "تفاصيل المنتج",
      path: "/Cart",
      active: true,
    },
  ];
  return (
    <div className="categoriesLPage">
      <Breadcrumb links={breadCrumbsLinks} /> <ProductDetailsLayout />
    </div>
  );
};

export default ProductDetails;
