export const categoryConstants = {
  GET_ALL_CATEGORIES_REQUEST: 'GET_ALL_CATEGORIES_REQUEST',
  GET_ALL_CATEGORIES_SUCCESS: 'GET_ALL_CATEGORIES_SUCCESS',
  GET_ALL_CATEGORIES_FAILURE: 'GET_ALL_CATEGORIES_FAILURE',
}
export const productConstants = {
  GET_PRODUCTS_BY_SLUG: 'GET_PRODUCTS_BY_SLUG',

  GET_PRODUCTS_PAGE_REQUEST: 'GET_PRODUCTS_PAGE_REQUEST',
  GET_PRODUCTS_PAGE_SUCCESS: 'GET_PRODUCTS_PAGE_SUCCESS',
  GET_PRODUCTS_PAGE_FAILURE: 'GET_PRODUCTS_PAGE_FAILURE',

  GET_PRODUCT_DETAILS_BY_ID_REQUEST: 'GET_PRODUCT_DETAILS_BY_ID_REQUEST',
  GET_PRODUCT_DETAILS_BY_ID_SUCCESS: 'GET_PRODUCT_DETAILS_BY_ID_SUCCESS',
  GET_PRODUCT_DETAILS_BY_ID_FAILURE: 'GET_PRODUCT_DETAILS_BY_ID_FAILURE',

  REVIEW_PER_PAGE: 5,

  CREATE_REVIEW_REQUEST: 'CREATE_REVIEW_REQUEST',
  CREATE_REVIEW_SUCCESS: 'CREATE_REVIEW_SUCCESS',
  CREATE_REVIEW_FAILURE: 'CREATE_REVIEW_FAILURE',

  GET_ALL_REVIEWS_REQUEST: 'GET_ALL_REVIEWS_REQUEST',
  GET_ALL_REVIEWS_SUCCESS: 'GET_ALL_REVIEWS_SUCCESS',
  GET_ALL_REVIEWS_FAILURE: 'GET_ALL_REVIEWS_FAILURE'
}
export const authConstants = {
  LOGIN_REQUEST: "LOGIN_REQUEST",
  LOGIN_FAILURE: "LOGIN_FAILURE",
  LOGIN_SUCCESS: "LOGIN_SUCCESS",

  LOGOUT_REQUEST: "LOGOUT_REQUEST",
  LOGOUT_SUCCESS: "LOGOUT_SUCCESS",
  LOGOUT_FAILURE: "LOGOUT_FAILURE",

  SIGNUP_REQUEST: "SIGNUP_REQUEST",
  SIGNUP_SUCCESS: "SIGNUP_SUCCESS",
  SIGNUP_FAILURE: "SIGNUP_FAILURE",
}
export const cartConstants = {
  ADD_TO_CART_REQUEST: "ADD_TO_CART_REQUEST",
  ADD_TO_CART_SUCCESS: "ADD_TO_CART_SUCCESS",
  ADD_TO_CART_FAILURE: "ADD_TO_CART_FAILURE",

  RESET_CART: "RESET_CART",

  REMOVE_CART_ITEM_REQUEST: "REMOVE_CART_ITEM_REQUEST",
  REMOVE_CART_ITEM_SUCCESS: "REMOVE_CART_ITEM_SUCCESS",
  REMOVE_CART_ITEM_FAILURE: "REMOVE_CART_ITEM_FAILURE",
}
export const wishListConstants = {
  ADD_TO_WISHLIST_REQUEST: "ADD_TO_WISHLIST_REQUEST",
  ADD_TO_WISHLIST_SUCCESS: "ADD_TO_WISHLIST_SUCCESS",
  ADD_TO_WISHLIST_FAILURE: "ADD_TO_WISHLIST_FAILURE",

  RESET_WISHLIST: "RESET_WISHLIST",

  REMOVE_WISHLIST_ITEM_REQUEST: "REMOVE_WISHLIST_ITEM_REQUEST",
  REMOVE_WISHLIST_ITEM_SUCCESS: "REMOVE_WISHLIST_ITEM_SUCCESS",
  REMOVE_WISHLIST_ITEM_FAILURE: "REMOVE_WISHLIST_ITEM_FAILURE",
}

export const userConstants = {
  GET_USER_ADDRESS_REQUEST: "GET_USER_ADDRESS_REQUEST",
  GET_USER_ADDRESS_SUCCESS: "GET_USER_ADDRESS_SUCCESS",
  GET_USER_ADDRESS_FAILURE: "GET_USER_ADDRESS_FAILURE",

  ADD_USER_ADDRESS_REQUEST: "ADD_USER_ADDRESS_REQUEST",
  ADD_USER_ADDRESS_SUCCESS: "ADD_USER_ADDRESS_SUCCESS",
  ADD_USER_ADDRESS_FAILURE: "ADD_USER_ADDRESS_FAILURE",

  ADD_USER_ORDER_REQUEST: "ADD_USER_ORDER_REQUEST",
  ADD_USER_ORDER_SUCCESS: "ADD_USER_ORDER_SUCCESS",
  ADD_USER_ORDER_FAILURE: "ADD_USER_ORDER_FAILURE",

  GET_USER_ORDER_REQUEST: "GET_USER_ORDER_REQUEST",
  GET_USER_ORDER_SUCCESS: "GET_USER_ORDER_SUCCESS",
  GET_USER_ORDER_FAILURE: "GET_USER_ORDER_FAILURE",

  GET_USER_ORDER_DETAILS_REQUEST: "GET_USER_ORDER_DETAILS_REQUEST",
  GET_USER_ORDER_DETAILS_SUCCESS: "GET_USER_ORDER_DETAILS_SUCCESS",
  GET_USER_ORDER_DETAILS_FAILURE: "GET_USER_ORDER_DETAILS_FAILURE",
};