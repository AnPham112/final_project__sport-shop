import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProductDetailsById, addToCart, getReviews, createReview } from '../../actions';
import Layout from '../../components/Layout';
import { generatePublicUrl } from '../../urlConfig';
import { IoMdCart } from 'react-icons/io';
import { AiFillThunderbolt } from 'react-icons/ai';
import { FaStar } from 'react-icons/fa';
import { productConstants } from '../../actions/constants';
import InStock from '../../components/UI/InStock';
import AverageStarRating from '../../components/AverageStarRating';
import UserReviews from '../../components/Review/components/UserReviews';
import Pagination from '../../components/Review/components/Pagination';
import './style.css';

const ProductDetailsPage = (props) => {
  const product = useSelector((state) => state.product);
  const auth = useSelector((state) => state.auth);
  const [activeThumb, setActiveThumb] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [comment, setComment] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    const { productId } = props.match.params;
    const payload = {
      params: { productId }
    }
    dispatch(getProductDetailsById(payload));
  }, []);

  useEffect(() => {
    dispatch(getReviews());
    setReviews(product.reviews);
  }, [reviews]);

  useEffect(() => {
    setTotalPages(Math.ceil(product.reviews.length / productConstants.REVIEW_PER_PAGE));
  }, [product.reviews]);

  const stars = Array(5).fill(0);
  const colors = {
    orange: "#FFBA5A",
    grey: "#a9a9a9"
  }

  const [rating, setRating] = useState(0);
  const [hoverValue, setHoverValue] = useState(null);

  const onHandleChangePage = (pageNumber) => {
    setPage(pageNumber);
  }

  if (Object.keys(product.productDetails).length === 0) {
    return null;
  }

  return (
    <Layout MenuHeader>
      <div className="commonContainer">
        <div className="productDescriptionContainer">
          <div className="productDescriptionAllImgContainer">
            <div className="verticalImageStack">
              {product.productDetails.productPictures.map((thumb, index) => (
                <div
                  key={index}
                  onClick={() => setActiveThumb(index)}
                  className={`thumbnail ${index === activeThumb ? 'active' : ''}`}>
                  <img
                    className={`thumbnailImg`}
                    src={generatePublicUrl(thumb.img)}
                    alt={thumb.img}
                  />
                </div>
              ))}
            </div>
            <div className="productDescContainer">
              <div className="productDescImgContainer">
                <img
                  src={generatePublicUrl(product.productDetails.productPictures[activeThumb].img)}
                  alt={`${product.productDetails.productPictures[0].img}`}
                />
              </div>
              {/* action buttons */}
              <div className="productDetailsPage-actionBtns">
                <button
                  className="addToCart-btn"
                  onClick={() => {
                    const { _id, name, price } = product.productDetails;
                    const img = product.productDetails.productPictures[0].img;
                    dispatch(addToCart({ _id, name, price, img }));
                  }}
                >
                  <IoMdCart />
                  <span className="addToCart-btn__title">Add To Cart</span>
                </button>
                <button className="buyNow-btn"
                  onClick={() => {
                    const { _id, name, price } = product.productDetails;
                    const img = product.productDetails.productPictures[0].img;
                    dispatch(addToCart({ _id, name, price, img }));
                    props.history.push(`/cart`);
                  }}>
                  <AiFillThunderbolt />
                  <span className="buyNow-btn__title">Buy Now</span>
                </button>
              </div>
            </div>
          </div>

          <div style={{ width: '100%' }}>
            {/* product description */}
            <div className="productDetails">
              <div className="productDetails-title">
                <span className="productTitle">{product.productDetails?.name}</span>
                <InStock
                  inStock={product.productDetails?.quantity}
                  product={props.match.params}
                />
              </div>
              <AverageStarRating
                reviews={product.reviews}
                product={props.match.params}
              />
              <span className="price">
                ${product.productDetails.price}
              </span>
              <div>
                <p className="product-guarantee">
                  100% Authentic product
                </p>
                <p style={{ display: "flex" }}>
                  <span className="description-title">
                    Description
                  </span>
                  <span className="description-content">
                    {product.productDetails?.description}
                  </span>
                </p>
              </div>
              <div className="writeFeedback">
                <div style={{ textAlign: 'center', marginBottom: '0.3rem' }}>
                  {stars.map((star, index) => {
                    const ratingValue = index + 1;
                    return (
                      <label key={index}>
                        <input type="radio" style={{ display: 'none' }} name="rating" value={ratingValue} onClick={() => setRating(ratingValue)} />
                        <FaStar
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
                        productId: props.match.params.productId
                      }
                      dispatch(createReview(payload))
                        .then(() =>
                          setRating(0),
                          setComment('')
                        );
                    }}>
                    Send feedback
                  </button>

                </form>
              </div>
              <h3>Ratings & Reviews</h3>
              <UserReviews
                reviews={product.reviews}
                stars={stars}
                product={props.match.params}
                colors={colors}
                page={page}
              />
              <Pagination
                totalPages={totalPages}
                changePage={onHandleChangePage} />
            </div>
          </div>
        </div>
      </div>
    </Layout >
  );
}

export default ProductDetailsPage;