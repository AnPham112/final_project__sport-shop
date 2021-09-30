import React from 'react';
import emailjs from 'emailjs-com';
import {
  IoLogoFacebook,
  IoLogoTwitter,
  IoLogoYoutube,
  IoLogoInstagram
} from "react-icons/io";
import {
  BiCurrentLocation,
  BiPhone,
  BiEnvelope,
} from "react-icons/bi";
import './style.css';

const Footer = (props) => {

  const sendMail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_fwlvcut', 'template_pxbd8uy', e.target, 'user_ZkmCi9KjgIdLAOUcf6BDB')
      .then((result) => {
        console.log('SUCCESS!', result.text);
      }, (error) => {
        console.log('FAILED...', error.text);
      });
    e.target.reset();
  }

  return (
    <div className="footer">
      <div className="commonContainer">
        <div className="main-content">
          <div className="left box">
            <h2>About us</h2>
            <div className="content">
              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown</p>
              <div className="social">
                <span><IoLogoFacebook className="social-icon" /></span>
                <span><IoLogoTwitter className="social-icon" /></span>
                <span><IoLogoInstagram className="social-icon" /></span>
                <span><IoLogoYoutube className="social-icon" /></span>
              </div>
            </div>
          </div>
          <div className="center box">
            <h2>Address</h2>
            <div className="content">
              <div className="location">
                <span><BiCurrentLocation /></span>
                <span className="text">162/88 Nguyen Van Luong</span>
              </div>
              <div className="phone">
                <span className="phone-icon"><BiPhone /></span>
                <span className="text">1593578520</span>
              </div>
              <div className="email">
                <span><BiEnvelope /></span>
                <span className="text">anpham1122000@gmail.com</span>
              </div>
            </div>
          </div>
          <div className="right box">
            <h2>Contact us</h2>
            <div className="content">
              <form onSubmit={sendMail}>
                <label className="email-label">Email</label>
                <input
                  className="email-input"
                  name="user_email"
                  type="email" />
                <label className="message-label">Message</label>
                <textarea
                  className="message-input"
                  name="message"
                  type="text"
                  rows="2"
                  cols="25" />
                <input
                  className="messageSubmit-btn"
                  type="submit"
                  value="Send"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="copyright">&copy; 2021 firesportshop.com</div>
    </div>
  )

}

export default Footer;