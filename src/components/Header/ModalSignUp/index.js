import React from 'react'
import { Modal, Button } from '../../ReusableUI';

const ModalSignUp = (props) => {
  const {
    visible,
    onClose,
    firstName,
    setFirstName,
    lastName,
    setLastName,
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
      <h2 className="signup-title">Signup</h2>
      <div className="login-container">
        <div className="row">
          <div className="login-form-style">
            <form
              className='login-form'
              onSubmit={{}}
              autoComplete='off'
            >
              <div className='login-form-container'>
                <label htmlFor='firstname' className='login-form__label'>First name</label>
                <input
                  className='login-form__input'
                  id='firstname'
                  type='text'
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className='login-form-container'>
                <label htmlFor='lastname' className='login-form__label'>Last name</label>
                <input
                  className='login-form__input'
                  id='lastname'
                  type='text'
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
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
  )

}

export default ModalSignUp