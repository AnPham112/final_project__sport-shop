import React, { useEffect, useState } from 'react';
import './style.css';
import Layout from '../../components/Layout';
import { useDispatch, useSelector } from 'react-redux';
import CartItem from './CartItem';
import { addToCart, getCartItems, removeCartItem } from '../../actions';
import PriceDetails from '../../components/PriceDetails';
import { generatePublicUrl } from '../../urlConfig';
import TotalPriceEachItem from '../../components/TotalPriceEachItem';
import CartActions from '../../components/CartActions';

const CartPage = (props) => {
  const auth = useSelector(state => state.auth);
  const cart = useSelector(state => state.cart);
  const [cartItems, setCartItems] = useState(cart.cartItems);
  const dispatch = useDispatch();

  useEffect(() => {
    setCartItems(cart.cartItems);
  }, [cart.cartItems]);

  useEffect(() => {
    if (auth.authenticate) {
      dispatch(getCartItems());
    }
  }, [auth.authenticate]);

  const onQuantityIncrement = (_id, qty) => {
    const { name, price, img } = cartItems[_id];
    dispatch(addToCart({ _id, name, price, img }, 1));
  }

  const onQuantityDecrement = (_id, qty) => {
    if (qty < 1) return;
    const { name, price, img } = cartItems[_id];
    dispatch(addToCart({ _id, name, price, img }, -1));
  }

  const onRemoveCartItem = (_id) => {
    if (!auth.authenticate) {
      alert('You have to login to remove products');
    }
    dispatch(removeCartItem({ productId: _id }));
  }

  if (props.onlyCartItems) {
    return (
      <>
        <div className="cartContainer">
          <div style={{ overflowX: 'auto', margin: '0 0.5rem' }}>
            <table className="content-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Unit price</th>
                  <th>Quantity</th>
                  <th>Total price</th>
                  <th>Actions</th>
                </tr>
              </thead>
              {Object.keys(cartItems).map((key, index) => (
                <tbody key={index}>
                  <tr>
                    <td>
                      <div className="productInformation">
                        <div className="cartProImgContainer">
                          <img src={generatePublicUrl(cartItems[key].img)} alt={''} />
                        </div>
                        <span className="productInformation-name">{cartItems[key].name}</span>
                      </div>
                    </td>
                    <td>${cartItems[key].price}</td>
                    <td>
                      <CartItem
                        key={index}
                        cartItem={cartItems[key]}
                        onQuantityInc={onQuantityIncrement}
                        onQuantityDec={onQuantityDecrement}
                      />
                    </td>
                    <td>
                      <TotalPriceEachItem
                        key={index}
                        cartItem={cartItems[key]}
                      />
                    </td>
                    <td>
                      <CartActions
                        key={index}
                        cartItem={cartItems[key]}
                        onRemoveCartItem={onRemoveCartItem}
                      />
                    </td>
                  </tr>
                </tbody>
              ))}
            </table>
          </div>
        </div>
      </>
    );
  }

  return (
    <Layout MenuHeader>
      <div className="cartContainer">
        {Object.keys(cartItems).length === 0 && <div className="cartItem-empty">You have no products in your shopping cart</div>}
        <div style={{ overflowX: 'auto', margin: '0 0.5rem' }}>
          <table className="content-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Unit price</th>
                <th>Quantity</th>
                <th>Total price</th>
                <th>Actions</th>
              </tr>
            </thead>

            {Object.keys(cartItems).map((key, index) => (
              <tbody key={index}>
                <tr>
                  <td>
                    <div className="productInformation">
                      <div className="cartProImgContainer">
                        <img src={generatePublicUrl(cartItems[key].img)} alt={''} />
                      </div>
                      <span className="productInformation-name">{cartItems[key].name}</span>
                    </div>
                  </td>
                  <td>${cartItems[key].price}</td>
                  <td>
                    <CartItem
                      key={index}
                      cartItem={cartItems[key]}
                      onQuantityInc={onQuantityIncrement}
                      onQuantityDec={onQuantityDecrement}
                    />
                  </td>
                  <td>
                    <TotalPriceEachItem
                      key={index}
                      cartItem={cartItems[key]}
                    />
                  </td>
                  <td>
                    <CartActions
                      key={index}
                      cartItem={cartItems[key]}
                      onRemoveCartItem={onRemoveCartItem}
                    />
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
        <div className="placeOrder-container">
          <PriceDetails
            totalItem={Object.keys(cart.cartItems).reduce((qty, key) => {
              return qty + cart.cartItems[key].qty;
            }, 0)}
            totalPrice={Object.keys(cart.cartItems).reduce((totalPrice, key) => {
              const { price, qty } = cart.cartItems[key];
              return totalPrice + price * qty;
            }, 0)}
          />
          <button
            className="placeOrder-btn"
            onClick={() => props.history.push(`/checkout`)}
          >Place order</button>
        </div>
      </div>
    </Layout >
  );
}

export default CartPage;