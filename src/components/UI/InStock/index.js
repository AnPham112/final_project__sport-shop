import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOrderPublic } from '../../../actions';
import './style.css';

const InStock = ({ inStock, product }) => {
  const orderPublic = useSelector((state) => state.orderPublic);
  const [items, setItems] = useState([]);
  const [ordered, setOrdered] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrderPublic());
  }, []);

  useEffect(() => {
    orderPublic.orders?.map((order) => {
      const itemOrdered = order.items;
      setItems(itemOrdered);
    })
  }, [orderPublic.orders]);

  useEffect(() => {
    const filterItem = items.filter((item) => {
      return item.productId?._id === product.productId
    });
    setOrdered(filterItem);
  }, [items]);

  const totalOrdered = ordered.reduce((total, order) => {
    return total + order.purchasedQty;
  }, 0);

  const productLeft = inStock - totalOrdered;

  return (
    <p className="productInStock">In stock:&nbsp;
      {productLeft === 0 ? <span>Sold out</span> : <span>{productLeft}</span>}
    </p>
  );
}

export default InStock;