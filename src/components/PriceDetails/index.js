import React from 'react'
import Card from '../UI/Card';
import './style.css';

const PriceDetails = (props) => {
  return (
    <Card
      headerleft={"Price details"}
      style={{ width: '23%' }}
    >
      <div style={{
        padding: "20px",
        boxSizing: "border-box"
      }}>
        <div className="flexRow sb" style={{ margin: "10px 0" }}>
          <div>Total Amount</div>
          <div>{props.totalItem}</div>
        </div>
        <div className="flexRow sb" style={{ margin: "10px 0" }}>
          <div>Delivery charges</div>
          <div>FREE</div>
        </div>
        <div className="flexRow sb" style={{ margin: "10px 0" }}>
          <div>Total price ({props.totalItem} items)</div>
          <div>${props.totalPrice}</div>
        </div>
      </div>
    </Card>
  );
}

export default PriceDetails;