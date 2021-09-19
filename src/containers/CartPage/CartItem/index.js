import React, { useEffect, useState } from 'react'
import { generatePublicUrl } from '../../../urlConfig'
import './style.scss';
import { addToWishList } from '../../../actions';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

const CartItem = (props) => {
  const [qty, setQty] = useState(props.cartItem.qty);
  const { _id, name, price, img } = props.cartItem;
  const dispatch = useDispatch();

  const onQuantityIncrement = () => {
    setQty(qty + 1);
    props.onQuantityInc(_id, qty + 1);
  }

  const onQuantityDecrement = () => {
    if (qty <= 1) return;
    setQty(qty - 1);
    props.onQuantityDec(_id, qty - 1);
  }

  return (
    <div className="cartProductContainer">
      <div className="flexRow">
        <div className="cartProImgContainer">
          <img src={generatePublicUrl(img)} alt={''} />
        </div>
        <div className="cartItemDetails">
          <div>
            <p>{name}</p>
            <p>Price: ${price}</p>
          </div>
          <div><b>Delivery in 3 - 5 days</b></div>
        </div>
      </div>
      <div className="cartActions">
        {/*quantity control */}
        <div className="quantityControl">
          <button onClick={onQuantityDecrement}>-</button>
          <input value={qty} readOnly />
          <button onClick={onQuantityIncrement}>+</button>
        </div>

        <button
          className="cartActionBtn-save"
          onClick={() => {
            dispatch(addToWishList({ _id, name, price, img }));
            // props.history.push(`/wishlist`);
          }}
        >
          <Link className="saveForLater-link" to={`/wishlist`}>
            Save for later
          </Link>
        </button>
        <button
          className="cartActionBtn-remove"
          onClick={() => props.onRemoveCartItem(_id)}
        >
          Remove
        </button>
      </div>
    </div>
  );
}

export default CartItem;