import axios from '../helpers/axios';
import { wishListConstants } from './constants';
import store from '../store';

export const getWishListItems = () => {
  return async dispatch => {
    try {
      dispatch({ type: wishListConstants.ADD_TO_WISHLIST_REQUEST });
      const res = await axios.post(`/user/getWishListItems`);
      if (res.status === 200) {
        const { wishListItems } = res.data;
        console.log({ getWishListItems: wishListItems });
        if (wishListItems) {
          dispatch({
            type: wishListConstants.ADD_TO_WISHLIST_SUCCESS,
            payload: { wishListItems }
          });
        }
      } else {
        const { error } = res.data;
        dispatch({
          type: wishListConstants.ADD_TO_WISHLIST_FAILURE,
          payload: { error }
        })
      }
    } catch (error) {
      console.log(error);
    }
  }
};

export const addToWishList = (product) => {
  return async dispatch => {
    const {
      wishList: { wishListItems },
      auth
    } = store.getState();

    if (auth.authenticate) {
      dispatch({ type: wishListConstants.ADD_TO_WISHLIST_REQUEST });
      const payload = {
        wishListItems: [{ product: product._id }]
      }
      console.log(payload);
      const res = await axios.post(`/user/wishList/addToWishList`, payload);
      console.log(res);
      if (res.status === 201) {
        dispatch(getWishListItems());
      }
    } else {
      localStorage.setItem('wishList', JSON.stringify(wishListItems));
    }
    dispatch({
      type: wishListConstants.ADD_TO_WISHLIST_SUCCESS,
      payload: { wishListItems }
    });
  }
}

export const removeWishListItem = (payload) => {
  return async (dispatch) => {
    try {
      dispatch({ type: wishListConstants.REMOVE_WISHLIST_ITEM_REQUEST });
      const res = await axios.post(`/user/wishList/removeItem`, { payload });
      if (res.status === 202) {
        dispatch({ type: wishListConstants.REMOVE_WISHLIST_ITEM_SUCCESS });
        dispatch(getWishListItems());
      } else {
        const { error } = res.data;
        dispatch({
          type: wishListConstants.REMOVE_WISHLIST_ITEM_FAILURE,
          payload: { error },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
}