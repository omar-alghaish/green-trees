import React from 'react';
import { decreaseBTN } from '../../assets/svgIcons';

const DecreaseBtn = ({ update, itemIdToIncrement }) => {
  return (
    <span
      className="addBTN"
      onClick={() => {
        update({ itemIdToIncrement, proccess: "-" });
      }}
    >
      {decreaseBTN}
    </span>
  );
};

export default DecreaseBtn;
