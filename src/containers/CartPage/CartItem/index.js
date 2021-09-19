import React, { useEffect, useState } from 'react'
import { generatePublicUrl } from '../../../urlConfig'
import './style.scss';
import { addToWishList } from '../../../actions';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import PriceDetails from '../../../components/PriceDetails';
import { BsTrash, BsHeartFill } from 'react-icons/bs';

const CartItem = ({ cartItem, onQuantityInc, onQuantityDec, onRemoveCartItem }) => {
  const [qty, setQty] = useState(cartItem.qty);
  const { _id, price, name, img } = cartItem;
  const history = useHistory();

  console.log('Cart item:', Object.keys(cartItem));
  const dispatch = useDispatch();

  const onQuantityIncrement = () => {
    setQty(qty + 1);
    onQuantityInc(_id, qty + 1);
  }

  const onQuantityDecrement = () => {
    if (qty <= 1) return;
    setQty(qty - 1);
    onQuantityDec(_id, qty - 1);
  }

  // useEffect(() => {
  //   setTotalPrice(price * qty);
  // })

  return (
    <div className="cartProductContainer">
      {/* <div className="flexRow">
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
      </div> */}
      <div className="cartContent">
        {/* <div>
          <div className="cartProImgContainer">
            <img src={generatePublicUrl(img)} alt={''} />
          </div>
          <div className="cartItemDetails">
            <p>{name}</p>
          </div>
        </div> */}
        {/* <div>
          <p>${price}</p>
        </div> */}

        {/*quantity control */}
        <div className="itemInfo-container">
          <span className="itemTitle">Quantity</span>
          <div className="quantityControl">
            <button onClick={onQuantityDecrement}>-</button>
            <input value={qty} readOnly />
            <button onClick={onQuantityIncrement}>+</button>
          </div>
        </div>

        {/* <h3>?</h3> */}
        {/* {Object.keys(cartItem).reduce((totalPrice, price) => {
            return totalPrice += price * qty;
          }, 0)} */}



        <div className="itemInfo-container">
          <span className="itemTitle">Total price</span>
          {<PriceDetails
            price={price}
            qty={qty}
          />}
        </div>
        <div className="itemInfo-container">
          <span className="itemTitle">Actions</span>
          <div className="cartActions">
            <button
              className="cartActionBtn-save"
              onClick={() => {
                dispatch(addToWishList({ _id, name, price, img }));
                history.push(`/wishlist`);
              }}
            >
              <BsHeartFill color="#fff" />
            </button>
            <button
              className="cartActionBtn-remove"
              onClick={() => onRemoveCartItem(_id)}
            >
              <BsTrash />
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}

export default CartItem;