import React from 'react';
import Background from '../../components/Background';
import Layout from '../../components/Layout';
import HomePageProducts from '../../components/HomePageProducts';

const HomePage = (props) => {
  return (
    <Layout
      MenuHeader
      Footer
    >
      <Background />
      <HomePageProducts />
    </Layout>
  );
}

export default HomePage;