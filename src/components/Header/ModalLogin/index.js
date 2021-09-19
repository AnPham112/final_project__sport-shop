import React from 'react';
import { Modal, Button } from '../../ReusableUI';

const ModalLogin = (props) => {
  const {
    visible,
    onClose,
    email,
    setEmail,
    password,
    setPassword,
    title,
    textColor,
    onClick
  } = props;


  return (
    <Modal
      visible={visible}
      onClose={onClose}
    >
      <h2 className="login-title">Login</h2>
      <div className="login-container">
        <div className="row">
          <div className="login-form-style">
            <form
              className='login-form'
              onSubmit={{}}
              autoComplete='off'
            >
              <div className='login-form-container'>
                <label htmlFor='email' className='login-form__label'>Email</label>
                <input
                  className='login-form__input'
                  id='email'
                  type='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className='login-form-container'>
                <label htmlFor='password' className='login-form__label'>Password</label>
                <input
                  className='login-form__input'
                  id='password'
                  type='password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </form>
            <Button
              title={title}
              textColor={textColor}
              onClick={onClick}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default ModalLogin;