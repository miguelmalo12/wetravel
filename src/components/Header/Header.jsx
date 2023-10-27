import './Header.scss';
import { Link } from 'react-router-dom';
import WeTravelLogo from '../../assets/wetravel-logo-red.png';

const NavbarList = () => {
  return (
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
        <Link to='/login' className="navbar-list__link navbar-list__link--button-primary">Login</Link>
      </li>
      <li className="navbar-list__item">
        <Link to='/sign-up' className="navbar-list__link navbar-list__link--button-secondary">Signup</Link>
      </li>
    </ul>
  )
}


const Header = () => {

  return (
    <header className="header">

      <Link to='/#' className="header__logo-container">
        <img src={WeTravelLogo} alt="WeTravel Logo" className="header__logo" />
      </Link>




      <div class="navbar-hamburger">
        <input type="checkbox" class="navbar-hamburger__checkbox" id="navi-toggle" />
        <label for="navi-toggle" class="navbar-hamburger__button">
          <span class="navbar-hamburger__icon">&nbsp;</span>
        </label>

        <div class="navbar-hamburger__background">&nbsp;</div>

        <nav class="navbar-hamburger__nav">
          <NavbarList />
        </nav>
      </div>
      <nav className="navbar">
        <NavbarList />
      </nav>
    </header>
  )


}

export default Header;