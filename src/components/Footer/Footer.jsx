import React, { useState } from 'react';
import './Footer.css';
import { assets } from '../../assets/assets';
import { Link } from 'react-router-dom';

const Footer = () => {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  return (
    <div className='footer' id='footer'>
      <div className='footer-content'>
        <div className='footer-content-left'>
          <img src={assets.logo} alt='logo' />

          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Explicabo
            libero cum quasi provident ducimus quidem assumenda, aliquid et
            laudantium error aspernatur. Minima, sapiente ex? Necessitatibus in
            labore numquam molestiae ducimus.
          </p>

          <div className='footer-social-icons'>
            <img src={assets.facebook_icon} alt='facebook icon' />
            <img src={assets.twitter_icon} alt='twitter icon' />
            <img src={assets.linkedin_icon} alt='linkedin icon' />
          </div>
        </div>

        <div className='footer-content-center'>
          <h2>COMPANY</h2>

          <ul>
            <Link to={'/'}>
              <li>Home</li>
            </Link>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy policy</li>
          </ul>
        </div>

        <div className='footer-content-right'>
          <h2>GET IN TOUCH</h2>

          <ul>
            <li>+1-235-506-7910</li>
            <li>justpracticing@tomato.com</li>
          </ul>
        </div>
      </div>

      <hr />

      <p className='footer-copyright'>
        Copyright {currentYear} &copy; Tomato.com - All Right Reserved.
      </p>
    </div>
  );
};

export default Footer;
