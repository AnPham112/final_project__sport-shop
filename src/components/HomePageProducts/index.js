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

  const breakPoints = [
    { width: 1, itemsToShow: 1, pagination: false },
    { width: 550, itemsToShow: 1, pagination: false },
    { width: 800, itemsToShow: 2, pagination: false },
    { width: 1150, itemsToShow: 3, pagination: false },
  ]

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
      <Carousel breakPoints={breakPoints}>
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