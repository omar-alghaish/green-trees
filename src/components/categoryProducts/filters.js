import React, { useEffect } from 'react';
import "./style.css";
import { useSearchParams } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
const Filters = ({selectedCategory, filtersData, setFilter, filterChoosed, language ,setSelectedCategory}) => {
  // console.log(filterChoosed?.id,"choosed")
  console.log(filtersData[0]?.id,"data")
  const [categoryId] = useSearchParams();
  // console.log(categoryId)
  // console.log(categoryId.get('q'),"wewe")
  return (
    <div className="rowDiv filters">
      {filtersData && filtersData?.length && Array.isArray(filtersData)
        ? filtersData?.map((filter,index)=>{
            if(index<4){
              return <button
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
            }
            return null;
        })
        : null}
        <Dropdown >
      <Dropdown.Toggle className={
          selectedCategory == 'ALL'
          ? "btn filterBtn filtered"
          : " filterBtn btn"
      } style={{display:'flex',alignItems:'center',gap:'4px',cursor:'pointer',border:'none'}} variant="" id="dropdown-basic">
      {
                language=='ar'?
                <div className="d-flex">
                  <img src={require('../../assets/Vector.png')} alt="" />
                  <span className="category">
                    كل المنتجات
                  </span>
                </div>
                :
                <>
                  <img src={require('../../assets/Vector.png')} alt="" />
                  <span className="category">
                    All Products
                  </span>
                </>
              }
      </Dropdown.Toggle>

      <Dropdown.Menu style={{height:'50vh',overflowY:'auto',width:'400px'}}>
      {filtersData && filtersData?.length
          ? filtersData?.map((item,index) => {
              if(true){
                return (
                    <Dropdown.Item onClick={()=>{
                      setSelectedCategory(item.id);
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
    </div>
  );
};

export default Filters;
