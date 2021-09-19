import React from 'react';
import './style.css';

const InStock = (props) => {
  const { InStock } = props;
  return (
    <p className="productInStock">In stock: {InStock}</p>
  );
}

export default InStock;