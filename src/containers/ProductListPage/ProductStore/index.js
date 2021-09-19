import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getProductsBySlug } from '../../../actions';
import { generatePublicUrl } from '../../../urlConfig';
import Card from '../../../components/UI/Card';
import Price from '../../../components/UI/Price';

const ProductStore = (props) => {
  const product = useSelector(state => state.product);
  const priceRange = product.priceRange;
  const dispatch = useDispatch();

  useEffect(() => {
    const { match } = props;
    dispatch(getProductsBySlug(match.params.slug));
  }, []);

  return (
    <>
      {Object.keys(product.productsByPrice).map((key, index) => {
        return (
          <Card
            key={index}
            headerleft={`${props.match.params.slug} under ${priceRange[key]}$`}
            style={{
              width: 'calc(100%-40px)',
              margin: '20px'
            }}
          >
            <div style={{ display: 'flex' }}>
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
            </div>
          </Card>
        );
      })}
    </>
  );
}

export default ProductStore;