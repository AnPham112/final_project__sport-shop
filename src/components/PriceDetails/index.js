import React from 'react';
import './style.css';

const PriceDetails = ({ items, totalItem, totalPrice }) => {
  return (
    <div className="totalPrice-container">
      <div>Total price ({totalItem} items):</div>
      <div className="totalPriceOfItems">${totalPrice}</div>
    </div>
  );
}

export default PriceDetails;