import React from "react";
import "./style.css";
import UseGeneral from "../../../hooks/useGeneral";
const BottomHeader = ({ homeCategories }) => {
  const { language } = UseGeneral();
  return (
    <div className="rowDiv">
      <div className="categories">
        {homeCategories && homeCategories?.length
          ? homeCategories?.map((item) => {
              return (
                <span className="category">
                  {language?.toLowerCase() == "ar"
                    ? item?.name_ar
                    : item?.name_en}
                </span>
              );
            })
          : null}
      </div>
    </div>
  );
};

export default BottomHeader;
