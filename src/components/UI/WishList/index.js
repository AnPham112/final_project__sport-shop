import React from 'react';
import { FaHeart } from "react-icons/fa";
import './style.css';

const WishList = (props) => {
  return (
    <div className="wishlist">
      <span className="wishlist-badge">
        {props.count}
      </span>
      <FaHeart />
    </div>
  );
}

export default WishList;