import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getOrders } from '../../actions';
import Layout from '../../components/Layout';
import Card from '../../components/UI/Card';
import './style.css';
import { Link } from 'react-router-dom';

const OrderPage = (props) => {
  const auth = useSelector((state) => state.auth);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (auth.authenticate) {
      dispatch(getOrders());
    }
  }, [auth.authenticate]);

  console.log(user.orders);

  return (
    <Layout MenuHeader>
      <div className="orderPage-container">
        <div className="orderItems-container">
          <Card
            style={{ margin: '5px auto', width: '1100px' }}
            headerleft={`My orders`} style={{ width: '100%', backgroundColor: 'rgba(20, 45, 52, 0.9)', color: '#fff' }}
          >
            {user.orders?.map((order) => {
              return order.items?.map((item, index) => (
                <div key={index} className="orderItem-container">
                  <div className="orderItemContent">
                    <div className="totalItems">Total items: {order.items.length}</div>
                    <div className="paymentType">Payment type: {order.paymentType}</div>
                    <div className="paymentStatus">Payment status: {order.paymentStatus}</div>
                  </div>
                  <Link
                    className="viewItemStatus-btn"
                    to={`/order_details/${order._id}`}
                  >
                    View item status
                  </Link>
                </div>
              ));
            })}
          </Card>
        </div>
      </div>
    </Layout>
  );
}

export default OrderPage;



