import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createReview, getReviews } from '../../actions';
import { FaStar } from 'react-icons/fa';
import axios from 'axios';
import UserReviews from './components/UserReviews';
import { productConstants } from '../../actions/constants';
import Pagination from './components/Pagination';
import './style.css';
// import Backdrop from '@material-ui/core/Backdrop';
// import CircularProgress from '@material-ui/core/CircularProgress';

// const useStyles = makeStyles((theme) => ({
//   backdrop: {
//     zIndex: theme.zIndex.drawer + 1,
//     color: '#fff',
//   },
// }));

const Review = (props) => {
  const auth = useSelector((state) => state.auth);
  const product = useSelector((state) => state.product);
  const { prod } = props;
  const [comment, setComment] = useState("");
  const [reviews, setReviews] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  console.log('totalPages', totalPages)
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(getReviews());
  // }, []);

  useEffect(() => {
    const fetchReviews = async () => {
      // setLoading(true);
      const res = await axios.get(`http://localhost:2000/api/comment/getReviews`);
      // setLoading(false);
      setReviews(res.data.reviews);
      setTotalPages(Math.ceil(res.data.reviews.length / productConstants.REVIEW_PER_PAGE));
    }
    fetchReviews();
  }, []);

  const stars = Array(5).fill(0);
  const colors = {
    orange: "#FFBA5A",
    grey: "#a9a9a9"
  }
  const [rating, setRating] = useState(0);
  const [hoverValue, setHoverValue] = useState(null);

  console.log('product ne', product);

  const onHandleChangePage = (pageNumber) => {
    setPage(pageNumber);
  }

  return (
    <>
      <div className="writeFeedback">
        <div style={{ textAlign: 'center', marginBottom: '0.3rem' }}>
          {stars.map((star, index) => {
            const ratingValue = index + 1;
            return (
              <label>
                <input type="radio" name="rating" value={ratingValue} onClick={() => setRating(ratingValue)} />
                <FaStar
                  key={index}
                  className="star"
                  size={24}
                  style={{
                    marginRight: 10,
                    cursor: 'pointer'
                  }}
                  color={(hoverValue || rating) >= ratingValue ? colors.orange : colors.grey}
                  onMouseEnter={() => setHoverValue(ratingValue)}
                  onMouseLeave={() => setHoverValue(null)}
                />
              </label>
            )
          })}
        </div>
        <form style={{ display: 'flex', flexDirection: 'column' }}>
          <textarea
            className="review-input"
            onChange={(e) => setComment(e.target.value)}
            value={comment}
            placeholder="Write your feedback"
            type="text"
            rows="3"
            cols="25"
          />
          <button
            className="sendFeedback-btn"
            onClick={(e) => {
              e.preventDefault();
              const payload = {
                rating: rating,
                content: comment,
                writer: auth.user._id,
                productId: prod.productId
              }
              dispatch(createReview(payload)).then(() => setRating(0));
            }}>
            Send feedback
          </button>
        </form>
      </div>
      <h3>Customer feedbacks</h3>
      <UserReviews
        reviews={reviews}
        stars={stars}
        product={prod}
        colors={colors}
        page={page}
      />
      <Pagination totalPages={totalPages} changePage={onHandleChangePage} />

    </>
  );
}

export default Review;