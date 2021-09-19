import React from 'react';
import './style.scss';
import logo from '../../images/logo.png'

/**
* @author
* @function Background
**/

const Background = (props) => {
  return (
    <div className="background">
      <div className="background__container">
        <div className="background__box">
          <img src={logo} alt="" />
          <span>Sport shop</span>
          <div className="background__box-content">
            <p>keep health at home - against pandemic</p>
          </div>
        </div>
      </div>
    </div>
  )

}

export default Background