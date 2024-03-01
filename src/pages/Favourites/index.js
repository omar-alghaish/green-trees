import React from 'react';
import Favourites from '../../layouts/Favourite/favourite';
import UseGeneral from '../../hooks/useGeneral';
import Breadcrumb from '../../components/BreadCumbsLinks';

const Favourite = () => {
  const { language } = UseGeneral();
  const breadCrumbsLinks = [
    { name: language != "ar" ? "Home" : "الصفحة الرئيسية", path: "/" },
    {
      name: language != "ar" ? "Favourites" : "المفضلة",
      path: "/Favourite",
      active: true,
    },
  ];
  return (
    <div className="categoriesLPage">
      <Breadcrumb links={breadCrumbsLinks} />
      <Favourites />
    </div>
  );
};

export default Favourite;
