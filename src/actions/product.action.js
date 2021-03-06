import axios from "../helpers/axios";
import { productConstants } from "./constants";
import { toast } from 'react-toastify';

export const getProductsBySlug = (slug) => {
  return async dispatch => {
    const res = await axios.get(`/products/${slug}`);
    if (res.status === 200) {
      dispatch({
        type: productConstants.GET_PRODUCTS_BY_SLUG,
        payload: res.data
      });
    }
  }
}

export const getProductDetailsById = (payload) => {
  return async dispatch => {
    dispatch({ type: productConstants.GET_PRODUCT_DETAILS_BY_ID_REQUEST });
    let res;
    try {
      const { productId } = payload.params;
      res = await axios.get(`/product/${productId}`);
      dispatch({
        type: productConstants.GET_PRODUCT_DETAILS_BY_ID_SUCCESS,
        payload: { productDetails: res.data.product }
      });
    } catch (error) {
      console.log(error);
    }
  }
}

export const getReviews = (payload) => {
  return async dispatch => {
    dispatch({ type: productConstants.GET_ALL_REVIEWS_REQUEST });
    try {
      const res = await axios.post('/comment/getReviews', payload);
      if (res.status === 200) {
        const { reviews } = res.data;
        dispatch({
          type: productConstants.GET_ALL_REVIEWS_SUCCESS,
          payload: { reviews }
        });
      } else {
        const { error } = res.data;
        dispatch({ type: productConstants.GET_ALL_REVIEWS_FAILURE, error })
      }
    } catch (error) {
      console.log(error);
    }
  }
}

export const createReview = (payload) => {
  return async dispatch => {
    dispatch({ type: productConstants.CREATE_REVIEW_REQUEST });
    try {
      const res = await axios.post(`/comment/createReview`, payload);
      if (res.status === 201) {
        dispatch({ type: productConstants.CREATE_REVIEW_SUCCESS });
        dispatch(getReviews());
      }
    } catch (error) {
      const { message } = error.response.data;
      dispatch({ type: productConstants.CREATE_REVIEW_FAILURE, payload: { message } })
      toast.info("You have to login to post feedback", { autoClose: 1500, position: toast.POSITION.TOP_CENTER, theme: 'dark' })
    }
  }
}

export const getProducts = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: productConstants.GET_ALL_PRODUCTS_REQUEST });
      const res = await axios.post(`product/getProducts`);
      if (res.status === 200) {
        const { products } = res.data;
        dispatch({
          type: productConstants.GET_ALL_PRODUCTS_SUCCESS,
          payload: { products },
        });
      } else {
        dispatch({ type: productConstants.GET_ALL_PRODUCTS_FAILURE });
      }
    } catch (error) {
      console.log(error);
    }
  };
}

export const getHomeProducts = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: productConstants.GET_HOME_PAGE_PRODUCT_REQUEST });
      const res = await axios.get(`/getProducts`);
      if (res.status === 200) {
        const { products } = res.data;
        dispatch({
          type: productConstants.GET_HOME_PAGE_PRODUCT_SUCCESS,
          payload: { products },
        });
      } else {
        dispatch({ type: productConstants.GET_HOME_PAGE_PRODUCT_FAILURE });
      }
    } catch (error) {
      console.log(error);
    }
  };
}