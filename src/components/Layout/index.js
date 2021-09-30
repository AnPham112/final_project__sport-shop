import React from 'react'
import MenuHeader from '../MenuHeader'
import Header from '../Header';
import './style.scss';
import Footer from '../Footer';

const Layout = (props) => {
  return (
    <div className="sport-shop__layout">
      <Header />
      {props.MenuHeader ? <MenuHeader /> : <></>}
      {props.children}
      {props.Footer ? <Footer /> : <></>}
    </div>
  )
}

export default Layout;