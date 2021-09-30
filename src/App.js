import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.scss';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { isUserLoggedIn, updateCart } from './actions';
import ProductDetailsPage from './containers/ProductDetailsPage';
import HomePage from './containers/HomePage';
import ProductListPage from './containers/ProductListPage';
import CartPage from './containers/CartPage';
import CheckoutPage from './containers/CheckoutPage';
import OrderPage from './containers/OrderPage';
import OrderDetailsPage from './containers/OrderDetailsPage';
import WishListPage from './containers/WishlListPage';
import OnlinePayment from './containers/OnlinePayment';

function App() {
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn());
    }
  }, [auth.authenticate]);

  useEffect(() => {
    dispatch(updateCart());
  }, [auth.authenticate]);

  return (
    <div >
      <Router>
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/cart" component={CartPage} />
          <Route path="/wishlist" component={WishListPage} />
          <Route path="/checkout" component={CheckoutPage} />
          <Route path="/payment" component={OnlinePayment} />
          <Route path="/account/orders" component={OrderPage} />
          <Route path="/order_details/:orderId" component={OrderDetailsPage} />
          <Route path="/:productSlug/:productId/p" component={ProductDetailsPage} />

          <Route path="/:slug" component={ProductListPage} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
