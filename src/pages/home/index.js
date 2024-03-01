import React, { useEffect, useState } from "react";
import Banner from "../../layouts/home/banner";
import HomeCategories from "../../layouts/home/category";
import HomeProducts from "../../layouts/home/products";
import Ideas from "../../layouts/home/ideas";
import Brands from "../../layouts/home/brands";
import { Axios } from "../../Axios";
import { BASE_URL } from "../../Axios/base_url";

const Home = () => {
  let [lastAdded, setLastAdded] = useState(null);
  let [topNeeded, setTopNeeded] = useState(null);
  let [categories, setCategories] = useState(null);
  // categories
  const [data, setData] = useState();
  const [brands, setBrands] = useState(null);
  let localData = localStorage.getItem('green_trees');
  let userId = localData && JSON.parse(localData)
  // console.log(userId)
  const getData = () =>
    Axios({
      url: BASE_URL + "homepage/get_all",
      method: "POST",
      data: {
        user_id: userId
      }
    }).then((res) => {
      // console.log(res)
      if (res.status == 'success') {
        let lastAddedFunc = [...res.result.lasAdded];
        if (lastAddedFunc.length > 0) {
          for (let i = 0; i < lastAddedFunc.length; i++) {
            for (let j = 0; j < lastAddedFunc[i].options.length; j++) {
              lastAddedFunc[i].options[j]['quantity'] = 0;
            }
          }
        }
        setLastAdded(lastAddedFunc);
        let topNeededFunc = [...res.result.topNedded];
        if (topNeededFunc.length > 0) {
          for (let i = 0; i < topNeededFunc.length; i++) {
            for (let j = 0; j < topNeededFunc[i].options.length; j++) {
              topNeededFunc[i].options[j]['quantity'] = 0;
            }
          }
        }
        setTopNeeded(topNeededFunc);
        setData(res?.result);
        setBrands(res?.result?.brands)
        setCategories(res?.result?.categories)
        // setCategories
      }
    });
  const changequantype = (new_quan, type, id) => {
    if (type == 'top_needed') {
      let newTopNeeded = [...topNeeded]
      for (let i = 0; i < newTopNeeded.length; i++) {
        for (let j = 0; j < newTopNeeded[i].options.length; j++) {
          if (newTopNeeded[i].options[j].id == id) {
            newTopNeeded[i].options[j]['quantity'] = new_quan;
          }
        }
      }
      setTopNeeded(newTopNeeded);
    }
  }
  useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      <Banner />
      <HomeCategories categories={categories} />
      <HomeProducts changequantype={changequantype} getData={getData} lasAdded={lastAdded} topNedded={topNeeded} />
      <Ideas />
      <Brands brands={brands} />
    </div>
  );
};

export default Home;
