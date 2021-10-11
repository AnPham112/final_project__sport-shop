import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addOrder, getAddress, getCartItems, login } from '../../actions';
import Layout from '../../components/Layout';
import { Anchor } from '../../components/ReusableUI';
import Card from '../../components/UI/Card';
import CartPage from '../CartPage';
import AddressForm from './AddressForm.js';
import emailjs from 'emailjs-com';
import OnlinePayment from '../OnlinePayment';
import ThankCustomer from '../../components/ThankCustomer';
import './style.css';
import { TextField } from '@material-ui/core';
import { Link } from 'react-router-dom';


const CheckoutStep = (props) => {
  return (
    <div className="checkoutStep">
      <div
        onClick={props.onClick}
        className={`checkoutHeader ${props.active && "active"}`}
      >
        <div>
          <span className="stepNumber">{props.stepNumber}</span>
          <span className="stepTitle">{props.title}</span>
        </div>
      </div>
      {props.body && props.body}
    </div>
  );
}

const Address = ({
  adr,
  selectAddress,
  enableAddressEditForm,
  confirmDeliveryAddress,
  onAddressSubmit
}) => {
  return (
    <div className="addressContainer">
      <div>
        <input
          name="address"
          onClick={() => selectAddress(adr)}
          type="radio" />
      </div>
      <div className="addressinfo">
        {!adr.edit ? (
          <div style={{ width: "100%" }}>
            <div className="addressDetail">
              <div>
                <span className="addressName">{adr.name}</span>
                <span className="addressType">{adr.addressType}</span>
                <span className="addressMobileNumber">{adr.mobileNumber}</span>
              </div>
              {adr.selected && (
                <Anchor
                  name="EDIT"
                  onClick={() => enableAddressEditForm(adr)}
                  style={{
                    fontWeight: "600",
                    color: "#2874f0",
                  }}
                />
              )}
            </div>
            <div className="fullAddress">
              {adr.address} - {adr.pinCode}
            </div>
            {adr.selected && (
              <button className="confirmDeliveryLocation-btn" onClick={() => confirmDeliveryAddress(adr)} >
                Deliver here
              </button>
            )}
          </div>
        ) : (
          <AddressForm
            withoutLayout={true}
            onSubmitForm={onAddressSubmit}
            initialData={adr}
            onCancel={() => { }}
          />
        )}
      </div>
    </div>
  );
}

const CheckoutPage = (props) => {
  const user = useSelector((state) => state.user);
  const auth = useSelector((state) => state.auth);
  const cart = useSelector((state) => state.cart);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newAddress, setNewAddress] = useState(false);
  const [address, setAddress] = useState([]);
  const [confirmAddress, setConfirmAddress] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [orderSummary, setOrderSummary] = useState(false);
  const [orderConfirmation, setOrderConfirmation] = useState(false);
  const [paymentOption, setPaymentOption] = useState(false);
  const [confirmOrder, setConfirmOrder] = useState(false);
  const [onlinePayment, setOnlinePayment] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (auth.authenticate) {
      dispatch(getCartItems());
    }
  }, [auth.authenticate]);

  const onAddressSubmit = (addr) => {
    setSelectedAddress(addr);
    setConfirmAddress(true);
    setOrderSummary(true);
  }

  const selectAddress = (addr) => {
    const updatedAddress = address.map((adr) =>
      adr._id === addr._id
        ? { ...adr, selected: true }
        : { ...adr, selected: false }
    );
    setAddress(updatedAddress);
  }

  const confirmDeliveryAddress = (addr) => {
    setSelectedAddress(addr);
    setConfirmAddress(true);
    setOrderSummary(true);
  }

  const enableAddressEditForm = (addr) => {
    const updatedAddress = address.map((adr) =>
      adr._id === addr._id
        ? { ...adr, edit: true }
        : { ...adr, edit: false }
    );
    setAddress(updatedAddress);
  }

  const userOrderConfirmation = () => {
    setOrderConfirmation(true);
    setOrderSummary(false);
    setPaymentOption(true);
  };

  const sendMail = (e) => {
    e.preventDefault();
    emailjs.sendForm('service_1v430gb', 'template_478wbf5', e.target, 'user_ZkmCi9KjgIdLAOUcf6BDB')
      .then((result) => {
        console.log('SUCCESS!', result.text);
      }, (error) => {
        console.log('FAILED...', error.text);
      });
    e.target.reset();
  }

  const onConfirmOrder = () => {
    const totalAmount = Object.keys(cart.cartItems).reduce((totalPrice, key) => {
      const { price, qty } = cart.cartItems[key];
      return totalPrice + price * qty;
    }, 0);
    const items = Object.keys(cart.cartItems).map((key) => ({
      productId: key,
      payablePrice: cart.cartItems[key].price,
      purchasedQty: cart.cartItems[key].qty,
    }));
    const payload = {
      addressId: selectedAddress._id,
      totalAmount,
      items,
      paymentStatus: "pending",
      paymentType: "cod",
    };
    dispatch(addOrder(payload));
    setConfirmOrder(true);
  };

  const onConfirmPayment = () => {
    setOnlinePayment(true);
    const totalAmount = Object.keys(cart.cartItems).reduce((totalPrice, key) => {
      const { price, qty } = cart.cartItems[key];
      return totalPrice + price * qty;
    }, 0);
    const items = Object.keys(cart.cartItems).map((key) => ({
      productId: key,
      payablePrice: cart.cartItems[key].price,
      purchasedQty: cart.cartItems[key].qty,
    }));
    const payload = {
      addressId: selectedAddress._id,
      totalAmount,
      items,
      paymentStatus: "completed",
      paymentType: "card",
    };
    dispatch(addOrder(payload));
  }

  useEffect(() => {
    auth.authenticate && dispatch(getAddress());
    auth.authenticate && dispatch(getCartItems());
  }, [auth.authenticate]);

  useEffect(() => {
    const address = user.address.map((adr) => ({
      ...adr,
      selected: false,
      edit: false,
    }));
    setAddress(address);
  }, [user.address]);

  const userLogin = () => {
    const user = { email, password }
    dispatch(login(user));
  }

  if (confirmOrder) {
    return (
      <Layout>
        <ThankCustomer
          to='/account/orders'
          btnTitle='View your orders' />
      </Layout>
    );
  }

  if (onlinePayment) {
    return (
      <Layout>
        <OnlinePayment
          totalPrice={Object.keys(cart.cartItems).reduce((totalPrice, key) => {
            const { price, qty } = cart.cartItems[key];
            return totalPrice + price * qty;
          }, 0)}
        />
      </Layout>
    );
  }

  return (
    <Layout MenuHeader>
      <div className="cartContainer">
        <div className="checkoutContainer">
          {/* check if user logged in or not */}
          <CheckoutStep
            stepNumber={"1"}
            title={"LOGIN"}
            active={!auth.authenticate}
            body={
              auth.authenticate ? (
                <div className="loggedInId">
                  <span className="checkoutPage-fullName-title">Full name: <p className="checkoutPage-fullName">{auth.user.fullName}</p></span>
                  <span className="checkoutPage-userEmail-title">User email: <p className="checkoutPage-userEmail">{auth.user.email}</p></span>
                </div>
              ) :
                (
                  <>
                    <div style={{ display: 'flex' }}>
                      <div className="textField-container">
                        <TextField
                          className="input-textField"
                          label="Email"
                          value={email}
                          inputProps={{ style: { fontSize: 13 } }}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                      <div className="textField-container">
                        <TextField
                          className="input-textField"
                          type="password"
                          label="Password"
                          value={password}
                          inputProps={{ style: { fontSize: 13 } }}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="checkoutLogin-btn-container">
                      <input
                        onClick={userLogin}
                        className="checkoutLogin-btn"
                        type="submit"
                        value="Login" />
                    </div>
                  </>
                )
            }
          />
          <CheckoutStep
            stepNumber={"2"}
            title={"DELIVERY ADDRESS"}
            active={!confirmAddress && auth.authenticate}
            body={
              <>
                {confirmAddress ? (
                  <div className="stepCompleted">
                    {`${selectedAddress.name} - ${selectedAddress.address} - ${selectedAddress.pinCode}`}
                  </div>
                ) : (
                  address.map((adr, index) => (
                    <Address
                      key={index}
                      selectAddress={selectAddress}
                      enableAddressEditForm={enableAddressEditForm}
                      confirmDeliveryAddress={confirmDeliveryAddress}
                      onAddressSubmit={onAddressSubmit}
                      adr={adr}
                    />
                  ))
                )}
              </>
            }
          />
          {/* AddressForm */}
          {confirmAddress ? null : newAddress ?
            (
              <AddressForm
                onSubmitForm={onAddressSubmit}
                onCancel={() => { }} />
            ) : auth.authenticate ?
              (
                <CheckoutStep
                  stepNumber={"+"}
                  title={"ADD NEW ADDRESS"}
                  active={false}
                  onClick={() => setNewAddress(true)}
                />
              )
              : null}
          <CheckoutStep
            stepNumber={"3"}
            title={"ORDER SUMMARY"}
            active={orderSummary}
            body={
              orderSummary ? (
                <CartPage onlyCartItems={true} />
              ) : orderConfirmation ? (
                <div className="stepCompleted">
                  {Object.keys(cart.cartItems).length} items
                </div>
              ) : null
            }
          />
          {orderSummary && (
            <Card style={{ margin: "10px 0" }}>
              <div className="orderConfirmationEmail-container">
                <p>Order confirmation email will be sent to</p>
                <form className="customerConfirmForm" onSubmit={sendMail}>
                  <input
                    name="customer_email"
                    type="text"
                    value={auth.user?.email}
                    className="customerConfirmInput"
                  />
                  <input
                    type="submit"
                    value="Send"
                    className="customerConfirmSubmit-btn"
                  />
                </form>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <button
                    className="confirmOrderSummary-btn"
                    onClick={userOrderConfirmation}
                  >
                    Continue
                  </button>
                </div>
              </div>
            </Card>
          )}
          <CheckoutStep
            stepNumber={"4"}
            title={"PAYMENT OPTIONS"}
            active={paymentOption}
            body={
              paymentOption && (
                <div className="paymentOption-container">
                  <button className="cod-btn" onClick={onConfirmOrder}>Cash on delivery</button>
                  <button className="cia-btn" onClick={onConfirmPayment}>Cash in advance</button>
                </div>
              )
            }
          />
        </div>
      </div>
    </Layout >
  );
}

export default CheckoutPage;