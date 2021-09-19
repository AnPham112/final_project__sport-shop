import React from 'react';
import { FaShoppingCart } from "react-icons/fa";
import './style.css';

const Cart = (props) => {
  return (
    <div className="cart">
      <span className="cart-badge">
        {props.count}
      </span>
      <FaShoppingCart />
    </div>
  );
}

export default Cart;

