import { userConstants } from "../actions/constants";

const initState = {
  orders: [],
  orderFetching: false
}

export default (state = initState, action) => {
  switch (action.type) {
    case userConstants.GET_USER_ORDER_PUBLIC_REQUEST:
      state = {
        ...state,
        orderFetching: true
      }
      break;
    case userConstants.GET_USER_ORDER_PUBLIC_SUCCESS:
      state = {
        ...state,
        orders: action.payload.orders,
        orderFetching: false
      }
      break;
    case userConstants.GET_USER_ORDER_PUBLIC_FAILURE:
      state = {
        ...state,
        orderFetching: false,
        error: action.payload.error
      }
      break;
  }
  return state;
}