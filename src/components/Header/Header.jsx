import './Header.scss';
import logo from '../../assets/wetravel-logo-red.png';

function Header() {
  return (
    <header className="header">
        <nav className="navbar">
            <img className="navbar__logo" src={logo} alt="wetravel logo"/>
            <div className="navbar__menu-mobile">
                <img src="./assets/bars-solid.svg" alt="bars menu"/>            
            </div>
            <div className="navbar__menu">
                <ul className="navbar__list">
                    <li className="navbar__item navbar__item--active"><a class="navbar__link">Home</a></li>
                    <li className="navbar__item"><a className="navbar__link">Recommend</a></li>
                    <li className="navbar__item"><a className="navbar__link">Plan</a></li>
                    <li className="navbar__item"><a className="navbar__link primary-button" href="">Login</a></li>
                    <li className="navbar__item"><a className="navbar__link--light" href="">Signup</a></li>
                </ul>
            </div>
        </nav>
    </header>
  )
}

export default Header