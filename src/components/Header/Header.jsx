import "./Header.scss";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/wetravel-logo-red.png";

function Header() {
  const location = useLocation();

  return (
    <header className="header">
      <nav className="navbar">
        <img className="navbar__logo" src={logo} alt="wetravel logo" />
        <div className="navbar__menu-mobile">
          <img src="./assets/bars-solid.svg" alt="bars menu" />
        </div>
        <div className="navbar__menu">
          <ul className="navbar__list">
            <li
              className={`navbar__item ${
                location.pathname === "/" ? "navbar__item--active" : ""
              }`}
            >
              <Link to="/" className="navbar__link">
                Home
              </Link>
            </li>
            <li
              className={`navbar__item ${
                location.pathname === "/recommend" ? "navbar__item--active" : ""
              }`}
            >
              <Link to="/recommend" className="navbar__link">
                Recommend
              </Link>
            </li>
            <li
              className={`navbar__item ${
                location.pathname === "/plan" ? "navbar__item--active" : ""
              }`}
            >
              <Link to="/plan" className="navbar__link">
                Plan
              </Link>
            </li>
            <li
              className={`navbar__item ${
                location.pathname === "/login" ? "navbar__item--active" : ""
              }`}
            >
              <Link to="/login" className="navbar__link primary-button">
                Login
              </Link>
            </li>
            <li
              className={`navbar__item ${
                location.pathname === "/signup" ? "navbar__item--active" : ""
              }`}
            >
              <Link to="/signup" className="navbar__link--light">
                Signup
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Header;
