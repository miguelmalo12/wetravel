import './Header.scss';
import { NavLink, useNavigate } from 'react-router-dom';
import WeTravelLogo from '../../assets/wetravel-logo-red.png';
import axios from 'axios';
import { userState } from '../../state/userState';
import Modal from '../Modal/Modal';
import { useRecoilState, useSetRecoilState } from "recoil";
import { modalState } from "../../state/modalState";
import { loginState } from '../../state/loginState';

const NavbarList = ({ isLoggedIn, setModalOpen }) => {

  const linkClass = ({ isActive }) => (
    `navbar-list__link ${isActive ? 'navbar-list__link--active' : ""}`
  )

  return (

    (!isLoggedIn) ? (
      <ul className="navbar-list" >
        <li className="navbar-list__item">
          <NavLink to='/#' className={linkClass}>Home</NavLink>
        </li>
        <li className="navbar-list__item">
          <NavLink to='/login' className="navbar-list__link navbar-list__link--button-primary">Login</NavLink>
        </li>
        <li className="navbar-list__item">
          <NavLink to='/sign-up' className="navbar-list__link navbar-list__link--button-secondary">Signup</NavLink>
        </li>
      </ul >
    ) : (
      <ul className="navbar-list">
        <li className="navbar-list__item">
          <NavLink to='/#' className={linkClass}>Home</NavLink>
        </li>
        <li className="navbar-list__item">
          <NavLink to='/recommend' className={linkClass}>Recommend</NavLink>
        </li>
        <li className="navbar-list__item">
          <NavLink to='/plan' className={linkClass}>Plan</NavLink>
        </li>
        <li className="navbar-list__item">
          <NavLink className="navbar-list__link navbar-list__link--button-primary" onClick={(e) => {
            e.preventDefault()
            setModalOpen(true)
          }}>Logout</NavLink>
        </li>
      </ul>
    )
  )
}


const Header = () => {
  const setUser = useSetRecoilState(userState);
  const API_URL = process.env.REACT_APP_BACKEND_URL;
  const [isModalOpen, setModalOpen] = useRecoilState(modalState);
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(loginState);
  const navigate = useNavigate();

  const handleLogout = () => {
    axios.post(`${API_URL}/auth/logout`).then(response => {
      if (response.status === 200) {
        localStorage.removeItem('userData')
        setUser(null)
      }
    }).then(() => {
      setIsLoggedIn(false)
      setModalOpen(false)
      navigate('/')
    })
  }


  return (
    <header className="header">
      <NavLink to='/#' className="header__logo-container">
        <img src={WeTravelLogo} alt="WeTravel Logo" className="header__logo" />
      </NavLink>
      <div className="navbar-hamburger">
        <input type="checkbox" className="navbar-hamburger__checkbox" id="navi-toggle" />
        <label htmlFor="navi-toggle" className="navbar-hamburger__button">
          <span className="navbar-hamburger__icon">&nbsp;</span>
        </label>
        <div className="navbar-hamburger__background">&nbsp;</div>
        <nav className="navbar-hamburger__nav">
          <NavbarList isLoggedIn={isLoggedIn} setModalOpen={setModalOpen} />
        </nav>
      </div>
      <nav className="navbar">
        <NavbarList isLoggedIn={isLoggedIn} setModalOpen={setModalOpen} />
      </nav>
      {isModalOpen && (
        <Modal
          textContent={`Are you sure you want to logout?`}
          buttonText="Logout"
          onButtonClick={handleLogout}
          onCloseClick={() => setModalOpen(false)} />
      )}
    </header>
  )


}

export default Header;