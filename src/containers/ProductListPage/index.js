import React from 'react';
import Layout from '../../components/Layout';
import ProductStore from './ProductStore';
import ProductPage from './ProductPage';
import getParams from '../../utils/getParams';
import './style.scss';
// import ClothingAndEquipments from './ClothingAndEquipments';

const ProductListPage = (props) => {
  const renderProduct = () => {
    const params = getParams(props.location.search);
    let content = null;
    switch (params.type) {
      case 'store':
        content = <ProductStore {...props} />;
        break;
      case 'page':
        content = <ProductPage {...props} />
        break;
    }
    return content;
  }

  return (
    <Layout>
      {renderProduct()}
    </Layout>
  )
}

export default ProductListPage