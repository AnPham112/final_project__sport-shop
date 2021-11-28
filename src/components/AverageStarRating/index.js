import React, { useEffect, useState } from 'react';
import { IoIosStar } from "react-icons/io";
import './style.css';

const AverageStarRating = ({ reviews }) => {
  const [productReviews, setProductReviews] = useState([]);

  useEffect(() => {
    const filterReviews = reviews?.filter((review) => {
      return review.rating
    });
    setProductReviews(filterReviews);
  }, [reviews]);

  const totalStar = productReviews.reduce((total, review) => {
    return total + review.rating
  }, 0)

  const totalReviews = productReviews.length;
  const averageStarRating = totalStar / totalReviews;

  return (
    <span className="averageRating">{isNaN(averageStarRating) ? <span>The product has no ratings yet</span> : (averageStarRating).toFixed(2)}
      {isNaN(averageStarRating) ? <></> : <span><IoIosStar /></span>}
    </span>
  );
}

export default AverageStarRating;