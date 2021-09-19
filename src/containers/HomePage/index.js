import React from 'react';
import Background from '../../components/Background';
import Layout from '../../components/Layout';
import HomePageProducts from '../../components/HomePageProducts';
// import Brand from '../../components/Brand';

const HomePage = (props) => {
  return (
    <Layout>
      <Background />
      <HomePageProducts />
      {/* <Brand /> */}
    </Layout>
  );
}

export default HomePage;