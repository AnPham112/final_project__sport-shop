import React from 'react';
import { FaStar } from 'react-icons/fa';
import { productConstants } from '../../../actions/constants';
import './style.css';

const UserReviews = ({ reviews, stars, product, colors, page }) => {
  const startIndex = (page - 1) * productConstants.REVIEW_PER_PAGE;
  const selectedReviews = reviews.slice(startIndex, startIndex + productConstants.REVIEW_PER_PAGE);

  const formatDate = (date) => {
    if (date) {
      const d = new Date(date);
      return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
    }
    return "";
  };

  const finalReviews = selectedReviews.filter((review) => {
    return review.productId === product.productId;
  });

  return (
    <div>
      {finalReviews.map((review, index) => (
        <div className="userReview-container" key={index}>
          <div>
            <span className="reviewer">{review.writer.firstName} {review.writer.lastName}</span>
            {stars.map((_, index) => {
              const ratingValue = index + 1
              return (
                <label key={index}>
                  <FaStar
                    size={13}
                    style={{ marginRight: 3 }}
                    color={review.rating >= ratingValue ? colors.orange : colors.grey}
                  />
                </label>
              )
            })}
            <span className="reviewContent">{review.content}</span>
          </div>
          <div className="reviewTime">{formatDate(review.createdAt)}</div>
        </div>
      ))}
    </div>
  );
}

export default UserReviews;