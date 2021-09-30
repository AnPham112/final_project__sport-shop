import React from 'react'
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToWishList } from '../../actions';
import { BsTrash, BsHeartFill } from 'react-icons/bs';
import './style.scss';

const CartActions = ({ cartItem, onRemoveCartItem }) => {
  const { _id, price, name, img } = cartItem;
  const history = useHistory();
  const dispatch = useDispatch();
  return (
    <>
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
    </>
  );
}
export default CartActions;