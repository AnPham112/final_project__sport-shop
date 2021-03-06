import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getWishListItems, removeWishListItem } from '../../actions';
import Layout from '../../components/Layout';
import Card from '../../components/UI/Card';
import './style.css';
import WishListItem from './WishListItem';

const WishListPage = (props) => {
  const auth = useSelector((state) => state.auth);
  const wishList = useSelector((state) => state.wishList);
  const [wishListItems, setWishListItems] = useState(wishList.wishListItems);
  const dispatch = useDispatch();

  useEffect(() => {
    setWishListItems(wishList.wishListItems);
  }, [wishList.wishListItems]);

  useEffect(() => {
    if (auth.authenticate) {
      dispatch(getWishListItems());
    }
  }, [auth.authenticate]);

  const onRemoveWishListItem = (_id) => {
    dispatch(removeWishListItem({ productId: _id }));
  }

  return (
    <Layout MenuHeader>
      <div className="wishListContainer">
        <Card headerleft={`My wish list`} style={{ width: '100%', backgroundColor: 'rgba(20, 45, 52, 0.9)', color: '#fff', margin: '0 0.5rem' }}>
          {Object.keys(wishListItems).map((key, index) => (
            <WishListItem
              key={index}
              wishListItem={wishListItems[key]}
              onRemoveWishListItem={onRemoveWishListItem}
            />
          ))}
        </Card>
      </div>
    </Layout>
  );
}

export default WishListPage;