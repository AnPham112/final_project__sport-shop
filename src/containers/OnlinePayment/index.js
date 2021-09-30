import React, { useEffect, useRef, useState } from 'react';
import Layout from '../../components/Layout';
import ThankCustomer from '../../components/ThankCustomer';
import './style.css';

const OnlinePayment = ({ totalPrice }) => {
  const [paidFor, setPaidFor] = useState(false);
  const [error, setError] = useState(null);
  const paypalRef = useRef();

  useEffect(() => {
    window.paypal
      .Buttons({
        createOrder: (data, actions) => {
          return actions.order.create({
            intent: 'CAPTURE',
            purchase_units: [{
              description: 'Sport shop checkout',
              amount: {
                currency_code: 'USD',
                value: totalPrice
              }
            }]
          })
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture();
          setPaidFor(true);
          console.log(order);
        },
        onError: err => {
          setError(err)
        }
      }).render(paypalRef.current)
  }, []);

  if (paidFor) {
    return (
      <Layout>
        <ThankCustomer />
      </Layout>
    );
  }

  if (error) {
    return (
      <div className="onlinePayment-wrapper">
        Error in processing payment
      </div>
    )
  }

  return (
    <div className="onlinePayment-wrapper">
      <div>Total: ${totalPrice}</div>
      <div className="payWithPaypal-btn" ref={paypalRef}
      />
    </div>
  );
}

export default OnlinePayment;