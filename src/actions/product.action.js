import axios from "../helpers/axios";
// import store from '../store';
import { productConstants } from "./constants";

export const getProductsBySlug = (slug) => {
  return async dispatch => {
    const res = await axios.get(`/products/${slug}`);
    console.log(res);
    if (res.status === 200) {
      dispatch({
        type: productConstants.GET_PRODUCTS_BY_SLUG,
        payload: res.data
      });
    }
  }
}

export const getProductPage = (payload) => {
  return async dispatch => {
    dispatch({ type: productConstants.GET_PRODUCTS_PAGE_REQUEST });
    try {
      const { cid, type } = payload.params;
      const res = await axios.get(`/page/${cid}/${type}`);
      if (res.status === 200) {
        const { page } = res.data;
        dispatch({
          type: productConstants.GET_PRODUCTS_PAGE_SUCCESS,
          payload: { page }
        });
      } else {
        const { error } = res.data;
        dispatch({
          type: productConstants.GET_PRODUCTS_PAGE_FAILURE,
          payload: { error }
        });
      }
    } catch (error) {
      console.log(error);
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
      console.log(res);
      dispatch({
        type: productConstants.GET_PRODUCT_DETAILS_BY_ID_SUCCESS,
        payload: { productDetails: res.data.product }
      });
    } catch (error) {
      console.log(error);
      // const { error } = res.data
      // dispatch({
      //   type: productConstants.GET_PRODUCT_DETAILS_BY_ID_FAILURE,
      //   payload: { error }
      // });
    }
  }
}

export const getReviews = () => {
  return async dispatch => {
    dispatch({ type: productConstants.GET_ALL_REVIEWS_REQUEST });
    try {
      const res = await axios.get('/comment/getReviews');
      if (res.status === 200) {
        dispatch({
          type: productConstants.GET_ALL_REVIEWS_SUCCESS,
          payload: res.data
        });
      } else {
        dispatch({
          type: productConstants.GET_ALL_REVIEWS_FAILURE,
          error: { error: res.data.error }
        })
      }
    } catch (error) {
      console.log(error);
    }
  }
}

export const createReview = (payload) => {
  return async dispatch => {
    dispatch({ type: productConstants.CREATE_REVIEW_REQUEST });
    let res;
    try {
      res = await axios.post(`/comment/createReview`, payload);
      console.log(res);
      dispatch({
        type: productConstants.CREATE_REVIEW_SUCCESS,
        payload: { review: res.data.review }
      });
      dispatch(getReviews());
    } catch (error) {
      console.log(error);
      dispatch({ type: productConstants.CREATE_REVIEW_FAILURE });
    }
  }
}