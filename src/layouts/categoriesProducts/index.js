import React, { useEffect, useState } from 'react';
import Filters from '../../components/categoryProducts/filters';
import "./style.css";
import { useSearchParams } from 'react-router-dom';
import { homeCategories } from '../../data/homeCategories';
import UseGeneral from '../../hooks/useGeneral';
import CategoriesProductsSlider from '../../components/categoriesProductsSlider';
import { productsData } from '../../data/homeProducts';
import { Axios } from '../../Axios';
import { BASE_URL } from '../../Axios/base_url';
const CategoriesProducts = () => {
  const { language } = UseGeneral();
  const [categoryId] = useSearchParams();
  const [categories,setCatgories]=useState([]);
  const [pageLoading,setPageLoading]=useState(false)
  const [products,setProducts]=useState([]);
  const [selectedCategory,setSelectedCategory]=useState(categoryId.get('q'));
  const [filter, setFilter] = useState();
    const get_categories=()=>{
      Axios({
        url: BASE_URL + "categories/get_all",
        method: "GET",
      }).then((res) => {
        // console.log(res,'categories')
        if(Array.isArray(res.result)){
          console.log(res.result[0].id)
          setCatgories(res?.result);
        }
      }).finally(()=>{

      }).catch(e=>console.log(e))
    }
    const getProductByCategory=()=>{
      setPageLoading(true)
      Axios({
        url: BASE_URL + `categories/get_product_by_category_id/${selectedCategory}`,
        method: "GET",
      }).then((res) => {
        console.log(res)
        if(Array.isArray(res.result)){
          setProducts(res.result)
        }
      }).finally(()=>{
        setPageLoading(false)
      }).catch(e=>console.log(e))
    }
    useEffect(()=>{
      getProductByCategory()
    },[selectedCategory])
  useEffect(() => {
    get_categories()
  }, []);
  useEffect(() => {
    console.log(filter);
  }, [filter]);
  return (
    <div>
      <Filters
        filtersData={categories}
        filterChoosed={categories.filter(item=>item.id==selectedCategory)[0]}
        setFilter={setFilter}
        language={language}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <CategoriesProductsSlider
        productsData={productsData?.filter((item) =>
          filter?.type == "main" ? item?.category?.id == filter?.id : null
        )}
        language={language}
      />
    </div>
  );
};

export default CategoriesProducts;
