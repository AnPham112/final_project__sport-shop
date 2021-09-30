import React from 'react';
import Layout from '../Layout';
import './style.css';

const ThankCustomer = (props) => {
  return (
    <Layout>
      <div className="thankYou-container">
        <div className="thankYou-content">Thank you for your order</div>
      </div>
    </Layout>
  );
}

export default ThankCustomer;