import './Header.scss';
import { Link, useNavigate } from 'react-router-dom';
import WeTravelLogo from '../../assets/wetravel-logo-red.png';
import axios from 'axios';
import { userState } from '../../state/userState';
import Modal from '../Modal/Modal';
import { useRecoilState, useSetRecoilState } from "recoil";
import { modalState } from "../../state/modalState";
import { loginState } from '../../state/loginState';

const NavbarList = () => {
  const [isModalOpen, setModalOpen] = useRecoilState(modalState);
  const [isLoggedIn, setLoggedIn] = useRecoilState(loginState)

  return (

    (!isLoggedIn) ? (
      <ul className="navbar-list" >
        <li className="navbar-list__item">
          <Link to='/#' className="navbar-list__link navbar-list__link--active">Home</Link>
        </li>
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
          <Link className="navbar-list__link navbar-list__link--button-secondary" onClick={(e) => {
            e.preventDefault()
            setModalOpen(true)
          }}>Logout</Link>
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