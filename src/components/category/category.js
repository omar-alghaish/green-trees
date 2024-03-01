import React from 'react';
import "./style.css";
import { createSearchParams, useNavigate } from 'react-router-dom';
const Category = ({ color, image, title, id }) => {
  const navigate = useNavigate();
  return (
    <div
      className="category columnDiv"
      style={{ background: color||'red', cursor: "pointer" }}
      onClick={() =>{
        navigate({
          pathname: "/Product",
          search: createSearchParams({ q: id }).toString(),
        })
        // navigate('/Product',{state:{id}});
      }}
    >
      <img src={image.includes('.')?image:require("../../assets/images/no_image.png")} />
      <h5>{title}</h5>
    </div>
  );
};

export default Category;
