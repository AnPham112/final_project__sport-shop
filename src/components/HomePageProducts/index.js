import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getHomeProducts, getReviews } from '../../actions';
import Carousel from 'react-elastic-carousel';
import ProductCard from './ProductCard';
import './style.scss';


const HomePageProducts = (props) => {
  const productHomePage = useSelector((state) => state.productHomePage);
  const product = useSelector((state) => state.product);
  const [products, setProducts] = useState([]);
  const [reviews, setReviews] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getHomeProducts());
    setProducts(productHomePage.products);
  }, [products]);

  useEffect(() => {
    dispatch(getReviews());
    setReviews(product.reviews);
  }, [reviews]);

  return (
    <div className="commonContainer">
      <h3>Products</h3>
      <Carousel itemsToShow={2}>
        {productHomePage.products?.map((prod, index) => (
          <ProductCard
            key={index}
            prod={prod}
            reviews={product.reviews}
          />
        ))}
      </Carousel>
    </div>
  );
}

export default HomePageProducts;