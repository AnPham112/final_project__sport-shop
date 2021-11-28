import { cartConstants } from "../actions/constants";

const initState = {
  cartItems: {},
  error: null,
  message: null
}

export default (state = initState, action) => {
  switch (action.type) {
    case cartConstants.ADD_TO_CART_REQUEST:
      state = { ...state }
      break;
    case cartConstants.ADD_TO_CART_SUCCESS:
      state = {
        ...state,
        cartItems: action.payload.cartItems
      }
      break;
    case cartConstants.ADD_TO_CART_FAILURE:
      state = {
        ...state,
        message: action.payload.message
      }
      break;
    case cartConstants.RESET_CART:
      state = {
        ...initState
      }
      break;
  }
  return state;
}