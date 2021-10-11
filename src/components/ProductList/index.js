import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAllCategory } from '../../actions';
import Layout from '../Layout';

const ProductList = () => {
  const category = useSelector(state => state.category);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllCategory());
  }, []);

  const renderProductList = (categories) => {
    let myProducts = [];
    categories.map((category) => {
      category.children?.map((child) => {
        myProducts.push(
          child.children.length > 0
            ? child.children.map((prod, index) => (
              <div key={index}>{prod.name}</div>
            ))
            : <></>
        );
      })
    })
    return myProducts;
  }

  // <Carousel itemsToShow={2}>
  //   {category.children.length > 0
  //     ? category.children.map((child, index) => (
  //       <Item>
  //         <ProductCard
  //           key={index}
  //           child={child}
  //         />
  //       </Item>
  //     ))
  //     : null}
  // </Carousel>

  return (
    <Layout>
      <div>{renderProductList(category.categories)}</div>
    </Layout>
  );
}
export default ProductList;