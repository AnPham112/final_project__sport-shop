import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getWishListItems, removeWishListItem } from '../../actions';
import Layout from '../../components/Layout';
import Card from '../../components/UI/Card';
import './style.css';
import WishListItem from './WishListItem';
import { Alert } from 'react-bootstrap';

const WishListPage = (props) => {
  const auth = useSelector((state) => state.auth);
  const wishList = useSelector((state) => state.wishList);
  const [wishListItems, setWishListItems] = useState(wishList.wishListItems);
  const dispatch = useDispatch();
  const [show, setShow] = useState(true);

  useEffect(() => {
    setWishListItems(wishList.wishListItems);
  }, [wishList.wishListItems]);

  useEffect(() => {
    if (auth.authenticate) {
      dispatch(getWishListItems());
    }
    if (!auth.authenticate) {
      alert('You have to login to view your wishlist')
    }
  }, [auth.authenticate]);

  const onRemoveWishListItem = (_id) => {
    dispatch(removeWishListItem({ productId: _id }));
  }

  return (
    <Layout MenuHeader>
      <div className="wishListContainer">
        <Card headerleft={`My wish list`} style={{ width: '100%', backgroundColor: 'rgba(20, 45, 52, 0.9)', color: '#fff' }}>
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