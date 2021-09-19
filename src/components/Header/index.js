import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Logo from '../../images/logo.png';
import './style.scss';
import { Link } from 'react-router-dom';
import { DropdownMenu } from '../ReusableUI';
import { login, signout, signup } from '../../actions/auth.action';
import ModalLogin from './ModalLogin';
import ModalSignUp from './ModalSignUp';
import { BsFileCheck } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import { IoIosLogIn, IoIosLogOut } from 'react-icons/io';
import Cart from '../UI/Cart';
import WishList from '../UI/WishList';

const Header = (props) => {
  const [loginModal, setLoginModal] = useState(false);
  const [signupModal, setSignupModal] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const auth = useSelector((state) => state.auth);
  const cart = useSelector((state) => state.cart);
  const wishList = useSelector((state) => state.wishList);
  const dispatch = useDispatch();

  const userLogin = () => {
    const user = { email, password }
    dispatch(login(user));
  }

  const userSignup = () => {
    const user = { firstName, lastName, email, password };
    if (
      firstName === "" ||
      lastName === "" ||
      email === "" ||
      password === ""
    ) {
      return;
    }
    dispatch(signup(user));
    setSignupModal(false);
  };

  const logout = () => {
    dispatch(signout());
  }

  useEffect(() => {
    if (auth.authenticate) {
      setLoginModal(false);
    }
  }, [auth.authenticate]);

  const renderLoggedInMenu = () => {
    return (
      <li className="option-item">
        <DropdownMenu
          menu={
            <a className="option-item__link">{auth.user?.fullName}</a>
          }
          menus={[
            {
              label: "Orders",
              to: '/account/orders',
              icon: <BsFileCheck />
            },
            {
              label: "Logout",
              to: ``,
              icon: <IoIosLogOut />,
              onClick: logout
            },
          ]}
        />
      </li>
    );
  }

  const renderNonLoggedInMenu = () => {
    return (
      <li className="option-item">
        <DropdownMenu
          menu={
            <a className="option-item__link">
              <span><FaUser /></span>
            </a>
          }
          firstMenu={
            <div className="firstmenu">
              <span>New Customer?</span>
              <a
                onClick={() => {
                  setSignupModal(true);
                }}
                style={{ color: '#2874f0', cursor: 'pointer' }}>Sign Up</a>
            </div>
          }
          menus={[
            {
              label: "Login",
              to: `/login`,
              icon: < IoIosLogIn />,
              onClick: () => {
                setLoginModal(true);
              },
            },
          ]}
        />
      </li>
    )
  }

  return (
    <div className="header">
      <div className="grid">
        <div className="header-navbar">
          <ModalLogin
            visible={loginModal}
            onClose={() => setLoginModal(false)}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            title={"Login"}
            textColor={"#ffffff"}
            onClick={userLogin}
          />
          <ModalSignUp
            visible={signupModal}
            onClose={() => setSignupModal(false)}
            firstName={firstName}
            setFirstName={setFirstName}
            lastName={lastName}
            setLastName={setLastName}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            title={"Sign up"}
            textColor={"#ffffff"}
            onClick={userSignup}
          />

          {/*Logo*/}
          <Link to='/' className="logo">
            <img src={Logo} alt='' />
          </Link>
          {/*Logo ends here*/}

          {/*Right side menu*/}
          <ul className="option">
            <li className="option-item">
              <Link to={'/wishlist'} className="option-item__link">
                <WishList count={Object.keys(wishList.wishListItems).length} />
              </Link>
            </li>
            {
              auth.authenticate
                ? renderLoggedInMenu()
                : renderNonLoggedInMenu()
            }
            <li className="option-item">
              <Link to={`/cart`} className="option-item__link">
                <Cart count={Object.keys(cart.cartItems).length} />
              </Link>
            </li>
          </ul>
          {/* right side menu ends here */}
        </div>
      </div>
    </div>
  );
}

export default Header;