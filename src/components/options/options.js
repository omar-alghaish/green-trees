import React, { useState } from 'react';
import { addToCart, decreaseBTN } from '../../assets/svgIcons';
import "./style.css";

const Options = ({ options, language, setChoosedOptions,handleChangeQuan }) => {
  // console.log(options)
  const [optionQuantities, setOptionQuantities] = useState({});

  const handleIncrease = (optionId) => {
    const updatedQuantities = { ...optionQuantities };
    updatedQuantities[optionId] = (updatedQuantities[optionId] || 0) + 1;
    setOptionQuantities(updatedQuantities);
    updateOptions(updatedQuantities);
  };

  const handleDecrease = (optionId) => {
    const updatedQuantities = { ...optionQuantities };
    if (updatedQuantities[optionId] > 0) {
      updatedQuantities[optionId] -= 1;
      setOptionQuantities(updatedQuantities);
      updateOptions(updatedQuantities);
    }
  };

  const updateOptions = (quantities) => {
    const updatedOptions = options.map((option) => ({
      ...option,
      quantity: quantities[option.id] || 0,
      totalPrice: (quantities[option.id] || 0) * option.price,
    }));
    setChoosedOptions(updatedOptions);
  };

  return (
    <>
      {options?.map((item) => (
        <div className="container" key={item.id}>
          <div className="product-image">
            {/* {console.log(item.product.images[0].url)} */}
            <img style={{maxWidth:'100%'}} src={item.product.images&&item.product.images[0].url.includes('.')?item.product.images[0].url:require("../../assets/images/no_image.png")} alt="Product" />
          </div>
          <div className="product-details">
            <h2>{language=='ar'?item.product.title_ar:item.product.title_en}</h2>
            <div className="price-section">
              <span className="new-price">AED {item.price}</span>
            </div>
            <div className="buttons">
              <button onClick={() => {
                handleChangeQuan(item.quantity+1,item.id)
              }}>
                {addToCart}
              </button>
              <span>{item?.quantity || 0}</span>
              <button onClick={() => {
                if(item?.quantity!=0){
                  handleChangeQuan(item.quantity-1,item.id)
                }
              }}>
                {decreaseBTN}
              </button>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Options;