import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';

const ThankCustomer = (props) => {
  return (
    <div>
      <div className="thankYou-container">
        <div className="thankYou-content">Thank you for your order</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Link className="thankYou-viewOrders" to={props.to}>{props.btnTitle}</Link>
      </div>
    </div>
  );
}

export default ThankCustomer;