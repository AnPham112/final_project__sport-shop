import React from 'react';
import './style.css';
import Adidas from '../../images/adidas.jpg';
import Reebook from '../../images/reebok.png';
import Bitis from '../../images/bitis.png';
import Jordan from '../../images/jordan.jpg';
import Puma from '../../images/puma.jpg';
import Apple from '../../images/apple.png';
import Realme from '../../images/realme.png';
import Samsung from '../../images/samsung.jpg';

const Brand = (props) => {
  return (
    <>
      <div className="grid">
        <h3>Our brands</h3>
        <div className="images">
          <div className="image-item">
            <img src={Adidas} alt="" />
          </div>
          <div className="image-item">
            <img src={Reebook} alt="" />
          </div>
          <div className="image-item">
            <img src={Bitis} alt="" />
          </div>
          <div className="image-item">
            <img src={Jordan} alt="" />
          </div>
          <div className="image-item">
            <img src={Puma} alt="" />
          </div>
          <div className="image-item">
            <img src={Apple} alt="" />
          </div>
          <div className="image-item">
            <img src={Realme} alt="" />
          </div>
          <div className="image-item">
            <img src={Samsung} alt="" />
          </div>
        </div>
      </div>

    </>
  );
}

export default Brand;