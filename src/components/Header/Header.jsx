import './Header.scss';
import { Link } from 'react-router-dom';
import WeTravelLogo from '../../assets/wetravel-logo-red.png';


const Header = () => {

  return (
    <header className="header">

      <Link className="header__logo-container">
        <img src={WeTravelLogo} alt="WeTravel Logo" className="header__logo" />
      </Link>

      <nav className="navbar">
        <ul className="navbar__list">
          <li className="navbar__item">
            <Link className="navbar__link navbar__link--active">Home</Link>
          </li>
          <li className="navbar__item">
            <Link className="navbar__link">Recommend</Link>
          </li>
          <li className="navbar__item">
            <Link className="navbar__link">Plan</Link>
          </li>
          <li className="navbar__item">
            <Link className="navbar__link navbar__link--button-primary">Login</Link>
          </li>
          <li className="navbar__item">
            <Link className="navbar__link navbar__link--button-secondary">Signup</Link>
          </li>
        </ul>
      </nav>
    </header>
  )


}

export default Header;