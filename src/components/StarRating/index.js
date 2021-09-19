// import React, { useMemo } from 'react'
// import { FaStar } from 'react-icons/fa';
// import './style.css';

// const Rate = ({ count, rating, color, onRating }) => {

//   const starRating = useMemo(() => {
//     return Array(count)
//       .fill(0)
//       .map((_, index) => index + 1)
//       .map(idx => {
//         <FaStar
//           key={idx}
//           className="cursor-pointer"
//           onClick={() => onRating(idx)}
//         />
//       });
//   }, [count, rating])

//   return (
//     <div>
//       {starRating}
//       {
//         [...Array(5)].map((star, index) => {
//           const ratingValue = index + 1;
//           return (
//             <label>
//               <input
//                 type="radio"
//                 name="rating"
//                 value={ratingValue}
//                 onClick={
//                   () => {
//                     setRating(ratingValue);
//                     props.onRatingData(rating);
//                   }
//                 } />
//               <FaStar
//                 className="star-rating"
//                 color={ratingValue <= (hover || rating) ? "#ff9c01" : "#c0c0c0"}
//                 size={100}
//                 onMouseEnter={() => setHover(ratingValue)}
//                 onMouseLeave={() => setHover(null)}
//               />
//             </label>
//           )
//         })
//       }
//       {ratingValue}
//     </div>
//   );
// }
// export default Rate;