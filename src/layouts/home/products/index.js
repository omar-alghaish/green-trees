import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Product from "../../../components/product";
import Tabs from "../../../components/tabs";
// import { productsData } from "../../../data/homeProducts";
import UseGeneral from "../../../hooks/useGeneral";
import "./style.css";
const HomeProducts = ({ lasAdded, topNedded, getData, changequantype }) => {
  const { language } = UseGeneral();
  const [tabId, setTabId] = useState(0);
  const [Products, setProducts] = useState([]);
  useEffect(() => {
    setProducts(
      tabId == 1
        ? lasAdded
        : tabId == 0
        ? topNedded
        : tabId == 2
        ? topNedded
        : []
    );
  }, [tabId, getData]);
  return (
    <>
      <Tabs setTabId={setTabId} />
      <div className="rowDiv HomeProducts">
        {Products?.map((item, index) => {
          console.log(item);
          if (index > 4)
            return (
              <Product
                // handleAddWithOptions=
                handleChangeQuan={(new_quan, id) => {
                  if (tabId == 1) {
                    changequantype(new_quan, "last_added", id);
                  } else if (tabId == 0) {
                    changequantype(new_quan, "top_needed", id);
                  }
                  // else {

                  // }
                }}
                getData={getData}
                item={item}
                id={item?.id}
                image={
                  item?.images && item?.images.length > 0 && item?.images[0].url
                }
                title={language == "ar" ? item?.title_ar : item.title_en}
                price={item?.price}
                discount={item?.discount}
                discountRatio={item?.discount_ratio}
              />
            );
        })}
      </div>
      <Link to="/" className="rowDiv linkTitle centerTitle">
        {language == "ar" ? "عرض الكل" : "View All"}
      </Link>
    </>
  );
};

export default HomeProducts;
