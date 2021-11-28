import React from 'react'
import { BsTrash, BsHeartFill } from 'react-icons/bs';
import './style.scss';

const CartActions = ({ cartItem, onRemoveCartItem, onAddToWishList }) => {
  const { _id, price, name, img } = cartItem;
  return (
    <>
      <div className="cartActions">
        <button
          className="cartActionBtn-save"
          onClick={() => { onAddToWishList(_id, name, price, img) }}
        >
          <BsHeartFill color="#fff" />
        </button>
        <button
          className="cartActionBtn-remove"
          onClick={() => { onRemoveCartItem(_id) }}
        >
          <BsTrash />
        </button>
      </div>
    </>
  );
}
export default CartActions;