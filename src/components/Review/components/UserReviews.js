import React from 'react';
import { FaStar } from 'react-icons/fa';
import { productConstants } from '../../../actions/constants';

const UserReviews = ({ reviews, stars, product, colors, page }) => {
  const startIndex = (page - 1) * productConstants.REVIEW_PER_PAGE;
  const selectedReviews = reviews.slice(startIndex, startIndex + productConstants.REVIEW_PER_PAGE);
  return (
    <div>
      {selectedReviews.map((review, index) => (
        review.productId == product.productId ?
          (
            <>

              <div key={index}>
                <p className="reviewer">{review.writer.firstName} {review.writer.lastName}</p>
                {stars.map((_, index) => {
                  const ratingValue = index + 1
                  return (
                    <label>
                      <FaStar
                        key={index}
                        className="star"
                        size={15}
                        style={{ marginRight: 3 }}
                        color={review.rating >= ratingValue ? colors.orange : colors.grey}
                      />
                    </label>
                  )
                })}
                <p>{review.content}</p>
              </div>
              <hr />
            </>
          )
          : <></>
      ))}
    </div>
  );
}

export default UserReviews;