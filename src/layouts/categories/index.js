import React from 'react';
import { homeCategories } from '../../data/homeCategories';
import Category from '../../components/category/category';
import UseGeneral from '../../hooks/useGeneral';
import Breadcrumb from '../../components/BreadCumbsLinks';

const CategoryLatout = () => {
  const { language } = UseGeneral();
  const breadCrumbsLinks = [
    { name: language != "ar" ? "Home" : "الصفحة الرئيسية", path: "/" },
    {
      name: language != "ar" ? "Categories" : "الفئات",
      path: "/Categories",
      active: true,
    },
  ];
  return (
    <>
      <div className="rowDiv homeCategories">
        <Breadcrumb links={breadCrumbsLinks} />
      </div>
      <div className="rowDiv homeCategories">
        {homeCategories?.map((item) => {
          if (item?.image)
            return (
              <Category
                id={item?.id}
                image={item?.image}
                title={language == "ar" ? item?.name_ar : item?.name_en}
                color={item?.color}
              />
            );
        })}
      </div>
    </>
  );
};

export default CategoryLatout;
