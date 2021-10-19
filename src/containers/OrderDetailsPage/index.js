import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getOrder } from '../../actions';
import Layout from '../../components/Layout';
import Card from '../../components/UI/Card';
import Price from '../../components/UI/Price';
import { generatePublicUrl } from '../../urlConfig';
import './style.css';

const OrderDetailsPage = (props) => {
  const orderDetails = useSelector((state) => state.user.orderDetails);

  const dispatch = useDispatch();
  useEffect(() => {
    const payload = {
      orderId: props.match.params.orderId,
    };
    dispatch(getOrder(payload));
  }, []);

  const formatDate = (date) => {
    if (date) {
      const d = new Date(date);
      return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
    }
    return "";
  };

  const formatDate2 = (date) => {
    const month = [
      "Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec",
    ];
    if (date) {
      const d = new Date(date);
      return `${month[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
    }
  };

  if (!(orderDetails && orderDetails.address)) {
    return null;
  }

  return (
    <Layout>
      <div className="orderDetailsPage-container">
        <Card style={{ margin: "10px 0" }} >
          <div className="orderDetailsPage-addressContainer">
            <div className="orderDetailsPage-addressDetails">
              <p className="orderDetailsPage-customerName"><span className="customerName-title">Customer name:&nbsp;</span>
                {orderDetails.address.name}
              </p>
              <p className="orderDetailsPage-deliveryAddress"><span className="deliveryAddress-title">Delivery Address:&nbsp;</span>
                {orderDetails.address.address}
              </p>
              <p className="orderDetailsPage-customerPhoneNumber"><span className="customerPhoneNumber-title">Phone number:&nbsp;</span>
                {orderDetails.address.mobileNumber}
              </p>
            </div>
          </div>
        </Card>

        {orderDetails.items.map((item, index) => (
          <Card
            key={index}
            className="deliveryItem-card"
          >
            <div style={{ display: 'flex' }}>
              <div className="deliveryItemImgContainer">
                <img src={generatePublicUrl(item.productId?.productPictures[0]?.img)} alt="" />
              </div>
              <div className="deliveryItemInfo">
                <div className="deliveryItemName">{item.productId?.name}</div>
                <Price value={item.payablePrice * item.purchasedQty} />
              </div>
            </div>
            <div style={{ display: 'flex' }}>
              <div className="deliveryTrack-container">
                <div className="orderTrack">
                  {orderDetails.orderStatus?.map((status, index) => (
                    <div
                      key={index}
                      className={`orderStatus ${status.isCompleted ? "active" : ""}`}>
                      <div className={`point ${status.isCompleted ? "active" : ""}`}>
                      </div>
                      <div className="orderInfo">
                        <div className="status">{status.type}</div>
                        <div className="date">{formatDate(status.date)}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="deliveryDate">
                {orderDetails.orderStatus[3].isCompleted &&
                  `Delivered on ${formatDate2(orderDetails.orderStatus[3]?.date)}`}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </Layout>
  );
}

export default OrderDetailsPage;