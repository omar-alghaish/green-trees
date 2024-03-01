import React from 'react';
import { homeCategories } from '../../../data/homeCategories';
import Category from '../../../components/category/category';
import UseGeneral from '../../../hooks/useGeneral';
import "./style.css";
import { Link } from 'react-router-dom';
import { Loader } from 'rsuite';
const HomeCategories = ({ categories }) => {
  // console.log(categories)
  const { language } = UseGeneral();
  return (
    <>
      <h4 className="rowDiv linkTitle">
        <Link to={"/Categories"}>
          {language == "ar" ? "مشاهدة الكل" : "View All"}
        </Link>
      </h4>
      <div className="rowDiv homeCategories">
        {!categories ? <span style={{ margin: "auto", display: "flex", justifyContent: "center", alignItems: "center" }}> <Loader size="lg" /></span> : categories?.map((item) => {
          if (item?.image)
            return (
              <Category
                id={item?.id}
                image={item?.image}
                title={language == "ar" ? item?.title_ar : item?.title_en}
                color={item?.color}
              />
            );
        })}
      </div>
    </>
  );
};

export default HomeCategories;
