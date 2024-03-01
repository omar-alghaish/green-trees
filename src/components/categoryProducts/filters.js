import React, { useEffect } from 'react';
import "./style.css";
import { useSearchParams } from 'react-router-dom';
const Filters = ({selectedCategory, filtersData, setFilter, filterChoosed, language ,setSelectedCategory}) => {
  // console.log(filterChoosed?.id,"choosed")
  console.log(filtersData[0]?.id,"data")
  const [categoryId] = useSearchParams();
  console.log(categoryId)
  console.log(categoryId.get('q'),"wewe")
  return (
    <div className="rowDiv filters">
      {filtersData && filtersData?.length && Array.isArray(filtersData)
        ? filtersData?.map((filter) => {
            return (
              <button
                className={
                  selectedCategory == filter?.id
                    ? "btn filterBtn filtered"
                    : " filterBtn btn"
                }
                onClick={() => {
                  setFilter(filter.id)
                  console.log(filter)
                  setSelectedCategory(filter.id)
                }}
              >
                {language == "ar" ? filter?.title_ar : filter?.title_en}
              </button>
            );
          })
        : null}
    </div>
  );
};

export default Filters;
