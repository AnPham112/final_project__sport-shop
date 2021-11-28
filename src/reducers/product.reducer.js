import { productConstants } from "../actions/constants"

const initState = {
  products: [],
  priceRange: {},
  productsByPrice: {},
  pageRequest: false,
  page: {},
  error: null,
  productDetails: {},
  reviews: [],
  message: null
}

export default (state = initState, action) => {
  switch (action.type) {
    case productConstants.GET_PRODUCTS_BY_SLUG:
      state = {
        ...state,
        products: action.payload.products,
        priceRange: action.payload.priceRange,
        productsByPrice: {
          ...action.payload.productsByPrice
        }
      }
      break;
    case productConstants.GET_PRODUCT_DETAILS_BY_ID_REQUEST:
      state = { ...state }
      break;
    case productConstants.GET_PRODUCT_DETAILS_BY_ID_SUCCESS:
      state = {
        ...state,
        productDetails: action.payload.productDetails
      }
      break;
    case productConstants.GET_PRODUCT_DETAILS_BY_ID_FAILURE:
      state = {
        ...state,
        error: action.payload.error
      }
      break;
    case productConstants.CREATE_REVIEW_REQUEST:
      state = { ...state }
      break;
    case productConstants.CREATE_REVIEW_SUCCESS:
      state = { ...state }
      break;
    case productConstants.CREATE_REVIEW_FAILURE:
      state = {
        ...state,
        message: action.payload.message
      }
      break;
    case productConstants.GET_ALL_REVIEWS_REQUEST:
      state = {
        ...state,
        loading: true
      }
      break;
    case productConstants.GET_ALL_REVIEWS_SUCCESS:
      state = {
        ...state,
        reviews: action.payload.reviews
      }
      break;
    case productConstants.GET_ALL_REVIEWS_FAILURE:
      state = {
        ...state,
        error: action.payload.error,
        loading: false
      }
      break;
    case productConstants.CREATE_REVIEW_REQUEST:
      state = { ...state }
      break;
    case productConstants.CREATE_REVIEW_SUCCESS:
      state = { ...state }
      break;
  };
  return state;
}