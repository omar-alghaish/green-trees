import React from 'react';
import UseGeneral from '../../hooks/useGeneral';
import Breadcrumb from '../../components/BreadCumbsLinks';
import CartLayout from '../../layouts/Cart/cart';

const Cart = () => {
  const { language } = UseGeneral();
  const breadCrumbsLinks = [
    { name: language != "ar" ? "Home" : "الصفحة الرئيسية", path: "/" },
    {
      name: language != "ar" ? "Cart" : "العربة",
      path: "/Cart",
      active: true,
    },
  ];
  return (
    <div className="categoriesLPage">
      <Breadcrumb links={breadCrumbsLinks} />
      <CartLayout />
    </div>
  );
};

export default Cart;
