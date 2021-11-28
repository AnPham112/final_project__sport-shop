import React from 'react';
import Layout from '../../components/Layout';
import ProductStore from './ProductStore';
import getParams from '../../utils/getParams';
import './style.css';

const ProductListPage = (props) => {
  const renderProduct = () => {
    const params = getParams(props.location.search);
    if (params.type == 'store') {
      return (
        <ProductStore {...props} />
      )
    }
  }

  return (
    <Layout>
      {renderProduct()}
    </Layout>
  )
}

export default ProductListPage;