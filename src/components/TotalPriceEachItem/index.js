import React, { useState, useEffect } from 'react'


const TotalPriceEachItem = ({ cartItem }) => {
  const { price, qty } = cartItem;
  const [totalPriceEachItem, setTotalPriceEachItem] = useState(price);

  useEffect(() => {
    setTotalPriceEachItem(price * qty);
  }, [price, qty]);

  return (
    <>
      ${totalPriceEachItem}
    </>
  );
}
export default TotalPriceEachItem;