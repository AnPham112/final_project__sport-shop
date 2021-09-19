import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProductDetailsById, addToCart, getCartItems } from '../../actions';
import Layout from '../../components/Layout';
import { generatePublicUrl } from '../../urlConfig';
import { IoIosArrowForward, IoMdCart } from 'react-icons/io';
import { AiFillThunderbolt } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import './style.css';
import InStock from '../../components/UI/InStock';
import Review from '../../components/Review';

const ProductDetailsPage = (props) => {
  const product = useSelector((state) => state.product);
  const [activeThumb, setActiveThumb] = useState(0);
  const dispatch = useDispatch();
  useEffect(() => {
    const { productId } = props.match.params;
    const payload = {
      params: { productId }
    }
    dispatch(getProductDetailsById(payload));
  }, []);

  if (Object.keys(product.productDetails).length === 0) {
    return null;
  }

  return (
    <Layout>
      <div className="grid">
        <div className="productDescriptionContainer">
          <div className="flexRow">
            <div className="verticalImageStack">
              {product.productDetails.productPictures.map((thumb, index) => (
                <div
                  key={index}
                  onClick={() => { setActiveThumb(index) }}
                  className={`thumbnail ${index == activeThumb ? 'active' : ''}`}>
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
                    // props.history.push(`/cart`);
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
          {/*Breed*/}
          <div>
            <div className="breed">
              <ul>
                <li><Link to="/">Home</Link><IoIosArrowForward /></li>
                <li><a href="#">{product.productDetails?.name}</a></li>
              </ul>
            </div>
            {/* product description */}
            <div className="productDetails">
              <div className="productDetails-title">
                <p className="productTitle">{product.productDetails?.name}</p>
                <InStock InStock={product.productDetails?.quantity} />
                {/* <p className="productInStock">In stock: {product.productDetails?.quantity}</p> */}
              </div>
              <div className="priceContainer">
                <span className="price">
                  ${product.productDetails.price}
                </span>
              </div>
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
            </div>
          </div>
        </div>
        <Review prod={props.match.params} />
      </div>
    </Layout>
  );
}

export default ProductDetailsPage;