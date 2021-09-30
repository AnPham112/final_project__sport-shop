// import { productConstants } from "../actions/constants"

// const initState = {
//   error: null,
//   loading: false,
//   reviews: []
// }

// export default (state = initState, action) => {
//   switch (action.type) {
//     case productConstants.CREATE_REVIEW_REQUEST:
//       state = {
//         ...state,
//         loading: true
//       }
//       break;
//     case productConstants.CREATE_REVIEW_SUCCESS:
//       state = {
//         ...state,
//         loading: false
//       }
//       break;
//     case productConstants.CREATE_REVIEW_FAILURE:
//       state = {
//         ...state,
//         loading: false
//       }
//       break;
//     case productConstants.GET_ALL_REVIEWS_REQUEST:
//       state = {
//         ...state,
//         loading: true,
//       }
//       break;
//     case productConstants.GET_ALL_REVIEWS_SUCCESS:
//       state = {
//         ...state,
//         loading: false,
//         reviews: action.payload.reviews
//       }
//       break;
//     case productConstants.GET_ALL_REVIEWS_FAILURE:
//       state = {
//         ...state,
//         loading: false,
//         error: action.payload.error
//       }
//       break;
//   };
//   return state;
// }