import { wishListConstants } from "../actions/constants";

const initState = {
  wishListItems: {},
  updatingWishList: false,
  error: null
}

export default (state = initState, action) => {
  switch (action.type) {
    case wishListConstants.ADD_TO_WISHLIST_REQUEST:
      state = {
        ...state,
        updatingWishList: true
      }
      break;
    case wishListConstants.ADD_TO_WISHLIST_SUCCESS:
      state = {
        ...state,
        wishListItems: action.payload.wishListItems,
        updatingWishList: false
      }
      break;
    case wishListConstants.ADD_TO_WISHLIST_FAILURE:
      state = {
        ...state,
        updatingWishList: false,
        error: action.payload.error
      }
      break;
    case wishListConstants.RESET_WISHLIST:
      state = {
        ...initState
      }
      break;
  }
  return state;
}