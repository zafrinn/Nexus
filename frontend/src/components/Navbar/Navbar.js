import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import navStyle from './navbar.css';
import { FaBars, FaTimes, FaSearch } from 'react-icons/fa';
import { IconContext } from 'react-icons/lib';
import logo from './icon.png';
import search from './search.png';

function Navbar() {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 960) {
        setClick(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <nav className='navbar'>
          <div className='navbar-container container'>
            <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
              <img src={logo} alt="Logo" className="navbar-brand" />
            </Link>
            <div className='menu-icon' onClick={handleClick}>
              {click ? <FaTimes /> : <FaBars />}
            </div>
            <ul className={click ? 'nav-menu active' : 'nav-menu'}>
              <li className='nav-item'>
                <Link to='/home' className='nav-links' onClick={closeMobileMenu}>
                  Home
                </Link>
              </li>
              <li className='nav-item'>
                <Link to='/dashboard' className='nav-links' onClick={closeMobileMenu}>
                  Dashboard
                </Link>
              </li>
              <li className='nav-item'>
                <Link to='/post' className='nav-links' onClick={closeMobileMenu}>
                  Post Ads
                </Link>
              </li>
              <li className='nav-item'>
                <Link to='/services' className='nav-links' onClick={closeMobileMenu}>
                  Academic Services
                </Link>
              </li>
              <li className='nav-item'>
                <Link to='/messages' className='nav-links' onClick={closeMobileMenu}>
                  Messages
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default Navbar;
