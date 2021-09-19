import React from 'react';
import './style.css';

const Price = (props) => {
  return (
    <div className="product-price">
      ${props.value}
    </div>
  );
}

export default Price;