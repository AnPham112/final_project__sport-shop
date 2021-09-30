import { combineReducers } from 'redux';
import categoryReducer from './category.reducer';
import productReducer from './product.reducer';
import authReducer from './auth.reducer';
import cartReducer from './cart.reducer';
import userReducer from './user.reducer';
import wishListReducer from './wishList.reducer';
import reviewReducer from './review.reducer';
import productHomePage from './productHomePage.reducer';
import orderPublic from './orderPublic.reducer';

const rootReducer = combineReducers({
  category: categoryReducer,
  product: productReducer,
  auth: authReducer,
  cart: cartReducer,
  user: userReducer,
  wishList: wishListReducer,
  review: reviewReducer,
  productHomePage: productHomePage,
  orderPublic: orderPublic
});

export default rootReducer;