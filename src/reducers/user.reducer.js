import { userConstants } from "../actions/constants";

const initState = {
  address: [],
  orders: [],
  orderDetails: {},
  user: {},
  error: null,
}

export default (state = initState, action) => {
  switch (action.type) {
    case userConstants.GET_USER_ADDRESS_REQUEST:
      state = { ...state }
      break;
    case userConstants.GET_USER_ADDRESS_SUCCESS:
      state = {
        ...state,
        address: action.payload.address
      }
      break;
    case userConstants.GET_USER_ADDRESS_FAILURE:
      state = {
        ...state,
        error: action.payload.error
      }
      break;
    case userConstants.ADD_USER_ADDRESS_REQUEST:
      state = { ...state }
      break;
    case userConstants.ADD_USER_ADDRESS_SUCCESS:
      state = {
        ...state,
        address: action.payload.address
      }
      break;
    case userConstants.ADD_USER_ADDRESS_FAILURE:
      state = {
        ...state,
        error: action.payload.error,
      }
      break;
    case userConstants.GET_USER_ORDER_REQUEST:
      state = { ...state }
      break;
    case userConstants.GET_USER_ORDER_SUCCESS:
      state = {
        ...state,
        orders: action.payload.orders
      }
      break;
    case userConstants.GET_USER_ORDER_FAILURE:
      state = {
        ...state,
        error: action.payload.error
      }
      break;
    case userConstants.GET_USER_ORDER_DETAILS_REQUEST:
      state = { ...state }
      break;
    case userConstants.GET_USER_ORDER_DETAILS_SUCCESS:
      state = {
        ...state,
        orderDetails: action.payload.order
      }
      break;
    case userConstants.GET_USER_ORDER_DETAILS_FAILURE:
      state = {
        ...state,
        error: action.payload.error
      }
      break;
  }
  return state;
}