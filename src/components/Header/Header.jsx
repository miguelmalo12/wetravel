import './Header.scss';
import { Link } from 'react-router-dom';
import WeTravelLogo from '../../assets/wetravel-logo-red.png';
import { useState } from 'react';

const NavbarList = ({ isLoggedIn }) => {
  return (

    (!isLoggedIn) ? (
      <ul className="navbar-list" >
        <li className="navbar-list__item">
          <Link to='/#' className="navbar-list__link navbar-list__link--active">Home</Link>
        </li>
        {/* <li className="navbar-list__item">
          <Link to='/recommend' className="navbar-list__link">Recommend</Link>
        </li>
        <li className="navbar-list__item">
          <Link to='/plan' className="navbar-list__link">Plan</Link>
        </li> */}
        <li className="navbar-list__item">
          <Link to='/login' className="navbar-list__link navbar-list__link--button-primary">Login</Link>
        </li>
        <li className="navbar-list__item">
          <Link to='/sign-up' className="navbar-list__link navbar-list__link--button-secondary">Signup</Link>
        </li>
      </ul >
    ) : (
      <ul className="navbar-list">
        <li className="navbar-list__item">
          <Link to='/#' className="navbar-list__link navbar-list__link--active">Home</Link>
        </li>
        <li className="navbar-list__item">
          <Link to='/recommend' className="navbar-list__link">Recommend</Link>
        </li>
        <li className="navbar-list__item">
          <Link to='/plan' className="navbar-list__link">Plan</Link>
        </li>
        <li className="navbar-list__item">
          <Link to='/login' className="navbar-list__link navbar-list__link--button-primary">Profile</Link>
        </li>
        <li className="navbar-list__item">
          <Link to='/sign-up' className="navbar-list__link navbar-list__link--button-secondary">Logout</Link>
        </li>
      </ul>
    )
  )
}


const Header = ({ isLoggedIn }) => {

  return (
    <header className="header">

      <Link to='/#' className="header__logo-container">
        <img src={WeTravelLogo} alt="WeTravel Logo" className="header__logo" />
      </Link>




      <div className="navbar-hamburger">
        <input type="checkbox" className="navbar-hamburger__checkbox" id="navi-toggle" />
        <label htmlFor="navi-toggle" className="navbar-hamburger__button">
          <span className="navbar-hamburger__icon">&nbsp;</span>
        </label>

        <div className="navbar-hamburger__background">&nbsp;</div>

        <nav className="navbar-hamburger__nav">
          <NavbarList isLoggedIn={isLoggedIn} />
        </nav>
      </div>
      <nav className="navbar">
        <NavbarList isLoggedIn={isLoggedIn} />
      </nav>
    </header>
  )


}

export default Header;