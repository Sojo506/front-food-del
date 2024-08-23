import React, { useContext, useState } from 'react';
import './LoginPopup.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';

const LoginPopup = ({ setShowLogin }) => {
  const { url, setToken } = useContext(StoreContext);
  const [currentState, setCurrentState] = useState('Sign Up');
  const [showPass, setShowPass] = useState(false);
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const onLogIn = async (e) => {
    e.preventDefault();
    let newUrl = url;

    if (currentState === 'Sign Up') {
      newUrl += '/api/user/signup';
    } else {
      newUrl += '/api/user/login';
    }
    try {
      const response = await axios.post(newUrl, data);
      if (response.data.success) {
        const token = response.data.token;
        setData({
          name: '',
          email: '',
          password: '',
        });

        setToken(token);
        localStorage.setItem('token', token);

        setShowLogin(false);
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      alert(error.response?.data?.message);
    }
  };

  return (
    <div className='login-popup'>
      <form onSubmit={onLogIn} className='login-popup-container'>
        <div className='login-popup-title'>
          <h2>{currentState}</h2>

          <img
            onClick={() => setShowLogin(false)}
            src={assets.cross_icon}
            alt='cross icon'
          />
        </div>

        <div className='login-popup-inputs'>
          {currentState === 'Log In' ? (
            <></>
          ) : (
            <input
              onChange={onChangeHandler}
              value={data.name}
              type='text'
              name='name'
              placeholder='Your name'
              required
            />
          )}

          <input
            onChange={onChangeHandler}
            value={data.email}
            type='email'
            name='email'
            placeholder='Your email'
            required
          />

          <div className='login-popup-input'>
            <input
              onChange={onChangeHandler}
              value={data.password}
              type={`${!showPass ? 'password' : 'text'}`}
              name='password'
              placeholder='Password'
              required
            />
            {!showPass ? (
              <img
                onClick={() => setShowPass((prev) => !prev)}
                src={assets.hide_view}
                alt='hide view icon'
              />
            ) : (
              <img
                onClick={() => setShowPass((prev) => !prev)}
                src={assets.show_view}
                alt='show view icon'
              />
            )}
          </div>
        </div>

        <button type='submit'>
          {currentState === 'Sign Up' ? 'Create account' : 'Log In'}
        </button>

        <div className='login-popup-condition'>
          <input type='checkbox' required />

          <p>By continuing, I agree to the terms of use & privacy policy</p>
        </div>

        {currentState === 'Log In' ? (
          <p>
            Create a new account?{' '}
            <span
              onClick={() => setCurrentState('Sign Up')}
              className='link-text'
            >
              Click here
            </span>
          </p>
        ) : (
          <p>
            Already have an account?{' '}
            <span
              onClick={() => setCurrentState('Log In')}
              className='link-text'
            >
              Log In here
            </span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPopup;
