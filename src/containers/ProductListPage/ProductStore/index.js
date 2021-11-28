import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getProductsBySlug } from '../../../actions';
import { generatePublicUrl } from '../../../urlConfig';
import Card from '../../../components/UI/Card';
import Price from '../../../components/UI/Price';
import Carousel from 'react-elastic-carousel';
import '../style.css';

const ProductStore = (props) => {
  const product = useSelector(state => state.product);
  const priceRange = product.priceRange;
  const dispatch = useDispatch();

  const breakPoints = [
    { width: 1, itemsToShow: 1, pagination: false },
    { width: 550, itemsToShow: 2, pagination: false },
    { width: 800, itemsToShow: 3, pagination: false },
    { width: 1150, itemsToShow: 4, pagination: false },
  ]

  useEffect(() => {
    const { match } = props;
    dispatch(getProductsBySlug(match.params.slug));
  }, []);

  return (
    <div style={{ height: '100%' }}>
      {Object.keys(product.productsByPrice).map((key, index) => {
        return (
          <Card
            key={index}
            headerleft={`${props.match.params.slug} under ${priceRange[key]}$`}
            cardheaderstyle={{ backgroundColor: 'rgba(20, 45, 52, 0.9)', margin: 0, padding: '10px', color: '#fff' }}
            style={{ width: 'calc(100%-40px)', margin: '20px' }}
          >
            {product.productsByPrice[key].length > 0 ? (
              <Carousel breakPoints={breakPoints} pagination={false} >
                {
                  product.productsByPrice[key].map((product, index) => (
                    <Link
                      key={index}
                      to={`/${product.slug}/${product._id}/p`}
                      className="product-container">
                      <div className="product__img-container">
                        <img
                          className="product__img"
                          src={generatePublicUrl(product.productPictures[0].img)}
                          alt=""
                        />
                      </div>
                      <div className="product-info">
                        <div className="product-info__name">{product.name}</div>
                        <Price value={product.price} />
                      </div>
                    </Link>
                  ))
                }
              </Carousel>
            )
              : <></>
            }
          </Card>
        );
      })}
    </div>
  );
}

export default ProductStore;