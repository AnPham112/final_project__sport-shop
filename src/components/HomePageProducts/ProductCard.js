import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { generatePublicUrl } from '../../urlConfig';
import { IoIosStar } from "react-icons/io";
import './style.scss';

const ProductCard = ({ reviews, prod }) => {
  const [productReviews, setProductReviews] = useState([]);

  useEffect(() => {
    const filterReviews = reviews.filter((review) => {
      return review.productId === prod._id
    });
    setProductReviews(filterReviews);
  }, [reviews]);

  const totalStar = productReviews.reduce((total, review) => {
    return total + review.rating
  }, 0);
  const totalReviews = productReviews.length;
  const averageStarRating = totalStar / totalReviews;

  return (
    <div className="homePage-card">
      <img src={generatePublicUrl(prod.productPictures[0].img)} />
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span className="homePage-productName">{prod.name}</span>
        <span className="homePage-productName">${prod.price}</span>
      </div>
      <span className="homePage-averageRating">{(averageStarRating).toFixed(2)} <IoIosStar /></span>
      <span className="homePage-productDescription">{prod.description}</span>
      <Link
        className="homePage-card-btn"
        to={`/${prod.slug}/${prod._id}/p`}
      >
        View
      </Link>
    </div>
  );
}
export default ProductCard;