import React, { useContext, useEffect, useState } from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets';
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';

const Navbar = ({ setShowLogin }) => {
  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);
  const [menu, setMenu] = useState('home');
  const [sticky, setSticky] = useState(false);
  const navigate = useNavigate();

  const logOut = () => {
    localStorage.removeItem('token');
    setToken('');
    navigate('/');
  };

  useEffect(() => {
    window.addEventListener('scroll', () => {
      window.scrollY > 50 ? setSticky(true) : setSticky(false);
    });
  }, []);

  return (
    <div className={`navbar ${sticky ? 'dark-navbar' : ''}`}>
      <Link onClick={() => setMenu('home')} to='/'>
        <img src={assets.logo} alt='logo' className='logo' />
      </Link>

      <ul className={`navbar-menu ${sticky ? 'dark-navbar-menu' : ''}`}>
        <Link
          to='/'
          onClick={() => {
            setMenu('home');
          }}
          className={menu === 'home' ? 'active' : ''}
        >
          home
        </Link>
        <a
          href='#explore-menu'
          onClick={() => {
            setMenu('menu');
          }}
          className={menu === 'menu' ? 'active' : ''}
        >
          menu
        </a>
        <a
          href='#app-download'
          onClick={() => {
            setMenu('mobile-app');
          }}
          className={menu === 'mobile-app' ? 'active' : ''}
        >
          mobile-app
        </a>
        <a
          href='#footer'
          onClick={() => {
            setMenu('contact-us');
          }}
          className={menu === 'contact-us' ? 'active' : ''}
        >
          contact us
        </a>
      </ul>

      <div className='navbar-right'>
        <img src={assets.search_icon} alt='search icon' />

        <div className='navbar-search-icon'>
          <Link onClick={() => setMenu('')} to='/cart'>
            <img src={assets.basket_icon} alt='basket icon' />
          </Link>

          <div className={getTotalCartAmount() ? 'dot' : ''}></div>
        </div>

        {!token ? (
          <button
            onClick={() => setShowLogin(true)}
            className={`${sticky ? 'dark-navbar-button' : ''}`}
          >
            sign in
          </button>
        ) : (
          <div className='navbar-profile'>
            <img
              className='navbar-profile-icon'
              src={assets.profile_icon}
              alt='profile icon'
            />

            <ul className='navbar-profile-dropdown'>
              <li onClick={() => navigate('/myorders')}>
                <img src={assets.bag_icon} alt='bag icon' />
                <p>Orders</p>
              </li>

              <hr />

              <li onClick={logOut}>
                <img src={assets.logout_icon} alt='log out icon' />
                <p>Log out</p>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
