import React, { useState } from 'react';
import './style.scss';

const CartItem = ({ cartItem, onQuantityInc, onQuantityDec }) => {
  const [qty, setQty] = useState(cartItem.qty);
  const [isDisabled, setIsDisabled] = useState(false);
  const { _id } = cartItem;

  const onQuantityIncrement = () => {
    setIsDisabled(true);
    setTimeout(() => {
      setIsDisabled(false)
    }, 1300);
    setQty(qty + 1);
    onQuantityInc(_id, qty + 1);
  }

  const onQuantityDecrement = () => {
    setIsDisabled(true);
    setTimeout(() => {
      setIsDisabled(false)
    }, 1300);
    if (qty <= 1) return;
    setQty(qty - 1);
    onQuantityDec(_id, qty - 1);
  }

  return (
    <div className="quantityControl">
      <button
        onClick={onQuantityDecrement}
        disabled={isDisabled}
      >-</button>
      <input value={qty} readOnly />
      <button
        onClick={onQuantityIncrement}
        disabled={isDisabled}
      >+</button>
    </div>
  );
}

export default CartItem;