import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getHomeProducts } from '../../actions';
import Carousel from 'react-elastic-carousel';
import ProductCard from './ProductCard';
import './style.scss';

const HomePageProducts = (props) => {
  const productHomePage = useSelector((state) => state.productHomePage);
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();

  const breakPoints = [
    { width: 1, itemsToShow: 1, pagination: false },
    { width: 360, itemsToShow: 1, pagination: false },
    { width: 600, itemsToShow: 2, pagination: false },
    { width: 800, itemsToShow: 2, pagination: false },
    { width: 1150, itemsToShow: 3, pagination: false },
  ]

  useEffect(() => {
    dispatch(getHomeProducts());
    setProducts(productHomePage.products);
  }, [productHomePage.products]);

  return (
    <div className="commonContainer">
      <h3>All products</h3>
      <Carousel breakPoints={breakPoints}>
        {products?.map((prod, index) => (
          <ProductCard
            key={index}
            prod={prod}
          />
        ))}
      </Carousel>
    </div>
  );
}

export default HomePageProducts;