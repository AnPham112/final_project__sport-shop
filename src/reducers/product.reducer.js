import { productConstants } from "../actions/constants"

const initState = {
  products: [],
  priceRange: {},
  productsByPrice: {},
  pageRequest: false,
  page: {},
  error: null,
  productDetails: {},
  loading: false,
  reviews: []
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
      state = {
        ...state,
        loading: true
      }
      break;
    case productConstants.GET_PRODUCT_DETAILS_BY_ID_SUCCESS:
      state = {
        ...state,
        loading: false,
        productDetails: action.payload.productDetails
      }
      break;
    case productConstants.GET_PRODUCT_DETAILS_BY_ID_FAILURE:
      state = {
        ...state,
        loading: false,
        error: action.payload.error
      }
      break;
    case productConstants.CREATE_REVIEW_REQUEST:
      state = {
        ...state,
        loading: true
      }
      break;
    case productConstants.CREATE_REVIEW_SUCCESS:
      state = {
        ...state,
        loading: false
      }
      break;
    case productConstants.CREATE_REVIEW_FAILURE:
      state = {
        ...state,
        loading: false
      }
      break;
    case productConstants.GET_ALL_REVIEWS_REQUEST:
      state = {
        ...state,
        loading: true,
      }
      break;
    case productConstants.GET_ALL_REVIEWS_SUCCESS:
      state = {
        ...state,
        loading: false,
        reviews: action.payload.reviews
      }
      break;
    case productConstants.GET_ALL_REVIEWS_FAILURE:
      state = {
        ...state,
        loading: false,
        error: action.payload.error
      }
      break;
    case productConstants.CREATE_REVIEW_REQUEST:
      state = {
        ...state,
        loading: true
      }
      break;
    case productConstants.CREATE_REVIEW_SUCCESS:
      state = {
        ...state,
        loading: false
      }
      break;
    case productConstants.GET_ALL_REVIEWS_REQUEST:
      state = {
        ...state,
        loading: true,
      }
      break;
    case productConstants.GET_ALL_REVIEWS_SUCCESS:
      state = {
        ...state,
        loading: false,
        reviews: action.payload.reviews
      }
      break;
    case productConstants.GET_ALL_REVIEWS_FAILURE:
      state = {
        ...state,
        loading: false,
        error: action.payload.error
      }
      break;
  };
  return state;
}