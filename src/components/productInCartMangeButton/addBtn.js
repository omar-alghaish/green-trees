import React from 'react';
import { addToCart } from '../../assets/svgIcons';

const AddBtn = ({ update, itemIdToIncrement }) => {
  return (
    <span
      className="addBTN"
      onClick={() => update({ itemIdToIncrement, proccess: "+" })}
    >
      {addToCart}
    </span>
  );
};

export default AddBtn;
