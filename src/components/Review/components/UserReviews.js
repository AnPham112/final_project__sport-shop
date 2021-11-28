import React, { useEffect, useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { productConstants } from '../../../actions/constants';
import moment from 'moment';
import './style.css';


const UserReviews = ({ reviews, stars, colors, page }) => {

  const startIndex = (page - 1) * productConstants.REVIEW_PER_PAGE;
  const selectedReviews = reviews.slice(startIndex, startIndex + productConstants.REVIEW_PER_PAGE);

  return (
    <div>
      {selectedReviews.map((review, index) => (
        <div className="userReview-container" key={index}>
          <div>
            <span className="reviewer">Customer {index + 1}</span>
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
          <div className="reviewTime">{moment(review.createdAt).format('YYYY-MM-DD')}</div>
        </div>
      ))}
    </div>
  );
}

export default UserReviews;