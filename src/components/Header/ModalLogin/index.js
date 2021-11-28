import React from 'react';
import { Modal } from '../../ReusableUI';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const ModalLogin = (props) => {
  const { visible, onClose, userLogin } = props;

  const validationSchema = yup.object().shape({
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


  const onUserLogin = (data) => {
    userLogin(data);
  }

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
              onSubmit={handleSubmit(onUserLogin)}
              autoComplete='off'
            >
              <div className='login-form-container'>
                <label htmlFor='email' className='login-form__label'>Email</label>
                <input
                  className='login-form__input'
                  id='email'
                  type='email'
                  name='email'
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
                  name='password'
                  {...register("password")}
                />
              </div>
              {errors.password && (
                <p className="err-message">{errors.password?.message}</p>
              )}
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <button className="login-btn">Login</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default ModalLogin;