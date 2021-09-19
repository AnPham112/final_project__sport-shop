import React, { useEffect, useState } from 'react';
import './style.css';
import Layout from '../../components/Layout';
import Card from '../../components/UI/Card';
import { useDispatch, useSelector } from 'react-redux';
import CartItem from './CartItem';
import { addToCart, getCartItems, removeCartItem } from '../../actions';
import { Button } from '../../components/ReusableUI';
import PriceDetails from '../../components/PriceDetails';
import { generatePublicUrl } from '../../urlConfig';
// import InStock from '../../components/UI/InStock';

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
    const { name, price, img } = cartItems[_id];
    dispatch(addToCart({ _id, name, price, img }, -1));
  }

  const onRemoveCartItem = (_id) => {
    dispatch(removeCartItem({ productId: _id }));
  }
  console.log('cc ne', Object.keys(cartItems));

  if (props.onlyCartItems) {
    return (
      <>
        {Object.keys(cartItems).map((key, index) => (
          <div className="cartContainer">
            <div className="itemTitle-container">
              <div>
                <span className="itemTitle">Product</span><br />
                <div className="productInformation">
                  <div className="cartProImgContainer">
                    <img src={generatePublicUrl(cartItems[key].img)} alt={''} />
                  </div>
                  <span className="productInformation-name">{cartItems[key].name}</span>
                </div>
              </div>
              <div className="itemInfo-container">
                <span className="itemTitle">Unit price</span>
                <span className="itemValue">${cartItems[key].price}</span>
              </div>
              <CartItem
                key={index}
                cartItem={cartItems[key]}
                onQuantityInc={onQuantityIncrement}
                onQuantityDec={onQuantityDecrement}
                onRemoveCartItem={onRemoveCartItem}
              />
            </div>
            <div div className="placeOrder-container" >
              <div style={{ padding: '10px 20px' }}>
                <Button
                  title="PLACE ORDER"
                  onClick={() => props.history.push(`/checkout`)}
                />
              </div>
            </div>
          </div>
        ))
        }
      </>
    );
  }

  return (
    <Layout>
      {Object.keys(cartItems).map((key, index) => (
        <div className="cartContainer">
          <div className="itemTitle-container">
            <div>
              <span className="itemTitle">Product</span><br />
              <div className="productInformation">
                <div className="cartProImgContainer">
                  <img src={generatePublicUrl(cartItems[key].img)} alt={''} />
                </div>
                <span className="productInformation-name">{cartItems[key].name}</span>
              </div>
            </div>
            <div className="itemInfo-container">
              <span className="itemTitle">Unit price</span>
              <span className="itemValue">${cartItems[key].price}</span>
            </div>
            {/* <div> */}
            {/* <span className="itemTitle">Quantity</span> <br /> */}
            <CartItem
              key={index}
              cartItem={cartItems[key]}
              onQuantityInc={onQuantityIncrement}
              onQuantityDec={onQuantityDecrement}
              onRemoveCartItem={onRemoveCartItem}
            />
            {/* </div> */}
            {/* <div>
              <span className="itemTitle">Total price</span><br />



            </div> */}
          </div>


          {/* ${Object.keys(cartItems).reduce((totalPrice, key) => {
                const { price, qty } = cartItems[key];
                return totalPrice + price * qty;
              }, 0)}
              <PriceDetails
                price={cartItems[key].price}
                qty={cartItems[key].qty}
              /> */}









          <div div className="placeOrder-container" >
            <div style={{ padding: '10px 20px' }}>
              <Button
                title="PLACE ORDER"
                onClick={() => props.history.push(`/checkout`)}
              />
            </div>
          </div>


          {/* <Card headerleft={`My Cart`} headerright={<p>Delivery to</p>} style={{ width: '100%', overflow: 'hidden' }}>
          {Object.keys(cartItems).map((key, index) => (
            <CartItem
              key={index}
              cartItem={cartItems[key]}
              onQuantityInc={onQuantityIncrement}
              onQuantityDec={onQuantityDecrement}
              onRemoveCartItem={onRemoveCartItem}
            />
          ))}
          <PriceDetails
            totalItem={Object.keys(cart.cartItems).reduce(function (qty, key) {
              return qty + cart.cartItems[key].qty;
            }, 0)}
            totalPrice={Object.keys(cart.cartItems).reduce((totalPrice, key) => {
              const { price, qty } = cart.cartItems[key];
              return totalPrice + price * qty;
            }, 0)}
          />

        </Card> */}
        </div>

      ))}
    </Layout >
  );
}

export default CartPage;