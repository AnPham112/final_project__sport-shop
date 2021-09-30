import React, { useEffect, useState } from 'react';
import { IoIosStar } from "react-icons/io";
import './style.css';

const AverageStarRating = ({ reviews, product }) => {
  const [productReviews, setProductReviews] = useState([]);

  useEffect(() => {
    const filterReviews = reviews.filter((review) => {
      return review.productId === product.productId
    });
    setProductReviews(filterReviews);
  }, [reviews]);

  const totalStar = productReviews.reduce((total, review) => {
    return total + review.rating
  }, 0)
  const totalReviews = productReviews.length;
  const averageStarRating = totalStar / totalReviews;

  return (
    <span className="averageRating">
      {(averageStarRating).toFixed(2)} <IoIosStar />
    </span>
  );
}

export default AverageStarRating;