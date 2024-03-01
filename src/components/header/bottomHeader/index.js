import React, { useEffect, useState } from "react";
import "./style.css";
import UseGeneral from "../../../hooks/useGeneral";
import axios from "axios";
import { Axios } from "../../../Axios";
import { BASE_URL } from "../../../Axios/base_url";
import { Dropdown } from "react-bootstrap";
import { useNavigate,createSearchParams } from "react-router-dom";
const BottomHeader = ({ homeCategories }) => {
  const { language } = UseGeneral();
  const navigate=useNavigate();
  const [headerLoading,setHeaderLoading]=useState(false);
  const [categories,setCategories]=useState([]);
  const getCategories=()=>{
    setHeaderLoading(true);
    Axios({
      url: BASE_URL + "categories/get_all",
      method: "GET",
    }).then((res) => {
      // console.log(res)
      if(Array.isArray(res.result)){
        setCategories(res.result)
      }
      if (res.status == 'success') {
      }
    }).finally(() => {
      setHeaderLoading(false)
    })
  }
  useEffect(()=>{
    getCategories()
  },[])
  return (
    <div className="rowDiv">
      <div className="categories">
        {categories && categories?.length
          ? categories?.map((item,index) => {
              if(index<=4){
                return (
                  <span onClick={()=>{
                    navigate({
                      pathname: "/Product",
                      search: createSearchParams({ q: item.id }).toString(),
                    })
                  }} className="category">
                    {language?.toLowerCase() == "ar"
                      ? item?.title_ar
                      : item?.title_en}
                  </span>
                );
              }
              return null
            })
          : null}
          <Dropdown >
      <Dropdown.Toggle style={{display:'flex',alignItems:'center',gap:'4px',cursor:'pointer',border:'none'}} variant="" id="dropdown-basic">
      {
                language=='ar'?
                <div className="d-flex">
                  <img src={require('../../../assets/Vector.png')} alt="" />
                  <span className="category">
                    كل المنتجات
                  </span>
                </div>
                :
                <>
                  <img src={require('../../../assets/Vector.png')} alt="" />
                  <span className="category">
                    All Products
                  </span>
                </>
              }
      </Dropdown.Toggle>

      <Dropdown.Menu style={{height:'50vh',overflowY:'auto',width:'400px'}}>
      {categories && categories?.length
          ? categories?.map((item,index) => {
              if(true){
                return (
                    <Dropdown.Item onClick={()=>{
                      navigate({
                        pathname: "/Product",
                        search: createSearchParams({ q: item.id }).toString(),
                      })
                    }}  style={{display:'flex',gap:'10px',fontSize:'16px',marginBottom:'15px',alignItems:'center'}} >
                      <img style={{ width:'40px' }} src={item.image} alt="" />
                      <p style={{ margin:'0px',fontSize:'14px' }}>{language?.toLowerCase() == "ar"
                    ? item?.title_ar
                    : item?.title_en}</p>
                    </Dropdown.Item>
                );
              }
              return null
            })
          : null}
      </Dropdown.Menu>
          </Dropdown>
          {/* <div class="dropdown">
            <button style={{border:'none',display:'flex',gap:'4px'}} class="btn bg-transparent btn-secondary dropdown-toggle" type="button" id="dropdownMenu2" data-bs-toggle="dropdown" aria-expanded="false">
              {
                language=='ar'?
                <div className="d-flex">
                  <img src={require('../../../assets/Vector.png')} alt="" />
                  <span className="category">
                    كل المنتجات
                  </span>
                </div>
                :
                <>
                  <img src={require('../../../assets/Vector.png')} alt="" />
                  <span className="category">
                    All Products
                  </span>
                </>
              }
            </button>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenu2">
            {categories && categories?.length
          ? categories?.map((item,index) => {
              if(true){
                return (
                  <span className="category">
                    {language?.toLowerCase() == "ar"
                      ? item?.title_ar
                      : item?.title_en}
                  </span>
                );
              }
              return null
            })
          : null}
            </ul>
          </div> */}
      </div>
    </div>
  );
};

export default BottomHeader;
