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
import { ThreeCircles } from 'react-loader-spinner';
const CategoriesProducts = () => {
  const userId=localStorage.getItem('green_trees')
  const user_id=userId&&JSON.parse(userId);
  const { language } = UseGeneral();
  const [categoryId] = useSearchParams();
  const [categories,setCatgories]=useState([]);
  const [pageLoading,setPageLoading]=useState(false)
  const [products,setProducts]=useState([]);
  const [selectedCategory,setSelectedCategory]=useState();
  const [filter, setFilter] = useState();
    const get_categories=()=>{
      Axios({
        url: BASE_URL + "categories/get_all",
        method: "GET",
      }).then((res) => {
        if(Array.isArray(res.result)){
          console.log(res.result[0].id)
          setCatgories(res?.result);
        }
      }).finally(()=>{

      }).catch(e=>console.log(e))
    }

    const getProductByCategory=()=>{
      console.log(selectedCategory,'selectedCategory')
      setPageLoading(true)
      Axios({
        url: BASE_URL + `categories/get_product_by_category_id/${selectedCategory}`,
        method: "POST",
        data:{
          user_id
        }
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
      setSelectedCategory(categoryId.get('q'));
    },[categoryId.get('q')])
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
      {
        pageLoading?
        (
          <div style={{textAlign:'center'}}>
            <ThreeCircles style={{margin:'auto'}}/>
          </div>
        )
        :
        (
          products&&products?.length>0?
          (
            <CategoriesProductsSlider
            getData={getProductByCategory}
              productsData={products}
              language={language}
            />
          )
          :
          (
            <div
              style={{ padding:'50px 20px',display:'flex',alignItems:'center',flexDirection:'column',justifyContent:'center',gap:'10px' }}
            >
              <img src={require('../../assets/images/no_image.png')} style={{maxWidth:'100%'}} alt="" />
              <h5>{language=='ar'?'لا يوجد منتجات':'There Are Not Products'}</h5>
            </div>
          )
        )
      }

    </div>
  );
};

export default CategoriesProducts;
