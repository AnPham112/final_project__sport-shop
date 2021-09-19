import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAllCategory } from '../../actions';
import { Link } from 'react-router-dom';
import './style.css';

const HomePageProducts = (props) => {
  const category = useSelector(state => state.category);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCategory());
  }, []);

  console.log(category);

  const renderCategories = (categories) => {
    let myCategories = [];
    categories.map((category) => {
      myCategories.push(
        <div
          className="homePage-card-container"
          key={category.name}>
          {
            category.children.length > 0
              ? category.children.map((child, index) => (
                <div key={index} className="homePage-card">
                  <div className="overlay"></div>
                  <div className="homePage-card-img-container">
                    <img src={child.categoryImage} alt="" />

                    <div className="homePage-card-content">
                      <p className="homePage-card-name">
                        {child.name}
                      </p>
                      <div className="homePage-card-btn-style">
                        <span>
                          <button className="homePage-card-btn">
                            {
                              child.parentId
                                ? <Link
                                  className="homePage-card-btn-link"
                                  to={`/${child.slug}?cid=${child._id}&type=${child.type}`}>
                                  SHOP NOW
                                </Link>
                                : <span>SHOP NOW</span>
                            }
                          </button>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
              : null
          }
        </div>
      );
    })
    return myCategories;
  }


  return (
    <div className="grid">
      <h3>Categories</h3>
      {renderCategories(category.categories)}
    </div>
  );
}

export default HomePageProducts;