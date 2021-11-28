import React from 'react';
import { Link } from 'react-router-dom';
import { generatePublicUrl } from '../../urlConfig';
import './style.scss';

const ProductCard = ({ prod }) => {
  return (
    <div className="homePage-card">
      <img src={generatePublicUrl(prod?.productPictures[0]?.img)} />
      <div className="homePage-product__content">
        <span className="homePage-productName">{prod.name}</span>
        <span className="homePage-productPrice">${prod.price}</span>
      </div>
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