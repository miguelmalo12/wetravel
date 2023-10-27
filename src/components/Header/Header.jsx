import './Header.scss';
import { Link } from 'react-router-dom';
import WeTravelLogo from '../../assets/wetravel-logo-red.png';


const Header = () => {

  return (
    <header className="header">

      <Link className="header__logo-container">
        <img src={WeTravelLogo} alt="WeTravel Logo" className="header__logo" />
      </Link>




      <div class="navigation">
        <input type="checkbox" class="navigation__checkbox" id="navi-toggle" />
        <label for="navi-toggle" class="navigation__button">
          <span class="navigation__icon">&nbsp;</span>
        </label>

        <div class="navigation__background">&nbsp;</div>

        <nav class="navigation__nav">
          <ul class="navigation__list">
            <li class="navigation__item"><a href="#" class="navbar-desktop__link">Home</a></li>
            <li class="navigation__item"><a href="#" class="navbar-desktop__link">Recommend</a></li>
            <li class="navigation__item"><a href="#" class="navbar-desktop__link">Plan</a></li>
            <li class="navigation__item"><a href="#" class="navbar-desktop__link navbar-desktop__link--button-primary">Login</a></li>
            <li class="navigation__item"><a href="#" class="navbar-desktop__link navbar-desktop__link--button-secondary">Signup</a></li>
          </ul>
        </nav>
      </div>










      <nav className="navbar-desktop">
        <ul className="navbar-desktop__list">
          <li className="navbar-desktop__item">
            <Link className="navbar-desktop__link navbar-desktop__link--active">Home</Link>
          </li>
          <li className="navbar-desktop__item">
            <Link className="navbar-desktop__link">Recommend</Link>
          </li>
          <li className="navbar-desktop__item">
            <Link className="navbar-desktop__link">Plan</Link>
          </li>
          <li className="navbar-desktop__item">
            <Link className="navbar-desktop__link navbar-desktop__link--button-primary">Login</Link>
          </li>
          <li className="navbar-desktop__item">
            <Link className="navbar-desktop__link navbar-desktop__link--button-secondary">Signup</Link>
          </li>
        </ul>
      </nav>
    </header>
  )


}

export default Header;