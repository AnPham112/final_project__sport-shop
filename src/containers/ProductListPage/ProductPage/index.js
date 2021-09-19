import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './style.css';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import getParams from '../../../utils/getParams';
import { getAllCategory, getProductPage, getProductsBySlug } from '../../../actions';
import Card from '../../../components/UI/Card';
import { Link } from 'react-router-dom';

const ProductPage = (props) => {
  const product = useSelector(state => state.product);
  const category = useSelector(state => state.category);
  const dispatch = useDispatch();
  const { page } = product;

  useEffect(() => {
    const { match } = props;
    dispatch(getProductsBySlug(match.params.slug));
  }, []);

  console.log('slug', props.match.params.slug);

  useEffect(() => {
    const params = getParams(props.location.search);
    const payload = { params }
    dispatch(getProductPage(payload));
  }, []);

  useEffect(() => {
    dispatch(getAllCategory());
  }, []);

  console.log('category ne', category);

  console.log(page);

  return (
    <div className="container-carousel">
      <h3>{page.title}</h3>
      <Carousel
        renderThumbs={() => { }}
      >
        {page.banners && page.banners.map((banner, index) =>
          <a
            key={index}
            style={{ display: 'block' }}
          >
            <img src={banner.img} alt="banner" />
          </a>
        )}
      </Carousel>
      <div className="productPage-productContainer">
        {
          page.products && page.products.map((product, index) =>
            <a href={`/${props.match.params.slug}?cid=${page.category}&type=store`}>
              <Card
                key={index}
                style={{
                  width: '400px',
                  height: '200px',
                  margin: '0 5px',
                  position: 'relative'
                }}
              >
                <img
                  className="product-page__img"
                  src={product.img}
                  alt=""
                />
              </Card>
            </a>
          )
        }
      </div>
    </div>
  );
}

export default ProductPage;