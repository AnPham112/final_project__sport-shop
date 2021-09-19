import React from 'react';
import { BsTrash } from "react-icons/bs";
import { generatePublicUrl } from '../../../urlConfig';
import './style.css';


const WishListItem = (props) => {

  const { _id, name, price, img } = props.wishListItem;

  console.log('id nè:', _id);

  return (
    <div className="wishlistItemContainer">
      <div className="wishlist-items">
        <div className="wishlist-itemImgContainer">
          <img src={generatePublicUrl(img)} alt={img} />
        </div>
        <div className="wishlist-itemDetail">
          <div>
            <p>{name}</p>
            <p>Price: ${price}</p>
          </div>
          <div>
            <button
              onClick={() => props.onRemoveWishListItem(_id)}
              className="deleteWishlistItem-btn"
            >
              <BsTrash />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WishListItem;