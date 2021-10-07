import React from 'react'
import { Modal } from '../../ReusableUI';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const ModalSignUp = (props) => {
  const {
    visible, onClose, userSignup
  } = props;

  const validationSchema = yup.object().shape({
    firstName: yup.string()
      .max(20, 'First name is too long')
      .required('Email is required'),
    lastName: yup.string()
      .max(20, 'Last name is too long')
      .required('Email is required'),
    email: yup.string()
      .max(60, 'Email is too long')
      .required('Email is required')
      .email('Enter a valid email'),
    password: yup.string()
      .required('Password is required')
      .max(60, 'Password is too long')
  });

  const { register, handleSubmit, formState: { errors } } = useForm({
    mode: 'onChange',
    resolver: yupResolver(validationSchema),
  });

  const onUserSignUp = (data) => {
    userSignup(data);
  }

  return (
    <Modal
      visible={visible}
      onClose={onClose}
    >
      <h2 className="signup-title">Sign up</h2>
      <div className="login-container">
        <div className="row">
          <div className="login-form-style">
            <form
              className='login-form'
              onSubmit={handleSubmit(onUserSignUp)}
              autoComplete='off'
            >
              <div className='login-form-container'>
                <label htmlFor='firstname' className='login-form__label'>First name</label>
                <input
                  className='login-form__input'
                  id='firstname'
                  type='text'
                  name="firstName"
                  {...register("firstName")}
                />
                {errors.firstName && (
                  <p className="err-message">{errors.firstName?.message}</p>
                )}
              </div>
              <div className='login-form-container'>
                <label htmlFor='lastname' className='login-form__label'>Last name</label>
                <input
                  className='login-form__input'
                  id='lastname'
                  type='text'
                  name="lastName"
                  {...register("lastName")}
                />
                {errors.lastName && (
                  <p className="err-message">{errors.lastName?.message}</p>
                )}
              </div>
              <div className='login-form-container'>
                <label htmlFor='email' className='login-form__label'>Email</label>
                <input
                  className='login-form__input'
                  id='email'
                  type='email'
                  name="email"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="err-message">{errors.email?.message}</p>
                )}
              </div>
              <div className='login-form-container'>
                <label htmlFor='password' className='login-form__label'>Password</label>
                <input
                  className='login-form__input'
                  id='password'
                  type='password'
                  name="password"
                  {...register("password")}
                />
                {errors.password && (
                  <p className="err-message">{errors.password?.message}</p>
                )}
              </div>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <button className="signup-btn">Sign up</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Modal>
  )

}

export default ModalSignUp