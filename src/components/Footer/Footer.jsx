import './Footer.scss';
import logo from '../../assets/wetravel-logo-red.png';
import { Link } from 'react-router-dom';
import { ButtonSecondary } from '../Button/Button';

export const CopyrightFooter = () => {
    const year = new Date().getFullYear();
    return (
        <div className="copyright">
            <p className="copyright__text"><Link className="copyright__link">WeTravel</Link> © {year} All Rights Reserved</p>
        </div>
    )
}

export const Footer = () => {
    return (
        <footer className='footer'>

            <div className="footer__intro-container">
                <img className='footer__logo' src={logo} alt="wetravel logo" />
                <p className='footer__text footer__text--long'>With WeTravel, finding and planning your entire trip is just a few clicks away.</p>
            </div>
            <div className="footer__wrapper">
                <div className="footer__link-container">
                    <h5 className='footer__title'>Menu</h5>
                    <ul className='footer__list'>
                        <li className='footer__item'><Link className='footer__link' to="/">Home</Link></li>
                        <li className='footer__item'><Link className='footer__link' to="/recommend">Recommend</Link></li>
                        <li className='footer__item'><Link className='footer__link' to="/plan">Plan</Link></li>
                        <li className='footer__item'><Link className='footer__link' to="/login">Login</Link></li>
                    </ul>
                </div>
                <div className="footer__sign-up">
                    <h5 className='footer__title'>Not A Member?</h5>
                    <p className='footer__text'>Don't waste the opportunity to make your future vacations a better experience</p>
                    <ButtonSecondary to='/sign-up' text='Sign Up' />
                </div>
            </div>

        </footer>
    )
}

