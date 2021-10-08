import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { IoIosArrowForward } from 'react-icons/io';
import { getOrders } from '../../actions';
import Layout from '../../components/Layout';
import { Breed } from '../../components/ReusableUI';
import Card from '../../components/UI/Card';
import { generatePublicUrl } from '../../urlConfig';
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

  return (
    <Layout MenuHeader>
      <div className="orderPage-container">
        <Breed
          breed={[
            { name: "Home", to: "/" },
            { name: "My Orders", to: "/account/orders" }
          ]}
          breedIcon={<IoIosArrowForward />}
        />
        <div className="orderItems-container">
          <Card
            style={{ margin: '5px auto', width: '1100px' }}
            headerleft={`My orders`} style={{ width: '100%', backgroundColor: 'rgba(20, 45, 52, 0.9)', color: '#fff' }}
          >
            {user.orders?.map((order) => {
              return order.items?.map((item, index) => (
                <div key={index} className="orderItem-container">
                  <div className="orderImg-container">
                    <img
                      className="orderImg"
                      src={generatePublicUrl(item.productId?.productPictures[0]?.img)}
                    />
                  </div>
                  <div className="orderItemContent">
                    <div className="orderName">{item.productId?.name}</div>
                    <div className="orderPrice">Price: ${item.payablePrice}</div>
                    <div className="orderQty">Quantity: {item.purchasedQty}</div>
                    <div className="orderTotalPrice">Total: ${item.payablePrice * item.purchasedQty}</div>
                    <div className="paymentStatus">Payment status: {order.paymentStatus}</div>
                  </div>
                  <Link
                    style={{ alignSelf: 'center' }}
                    to={`/order_details/${order._id}`}
                  >
                    <button className="viewItemStatus-btn">View item status</button>
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



