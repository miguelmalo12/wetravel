import './Footer.scss';
import logo from '../../assets/wetravel-logo-red.png';

function Footer() {
  return (
    <>
    <footer>
        <div className="footer-container">
            <div className="footer-container__intro">
                <img src={logo} alt="wetravel logo"/>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi dictum rhoncus vulputate.</p>
            </div>
            <div className="footer-container__links">
                <div className="footer-container__links--menu">
                    <h5>Menu</h5>
                    <ul>
                        <li><a>Home</a></li>
                        <li><a>Recommend</a></li>
                        <li><a>Plan</a></li>
                        <li><a>Login</a></li>
                    </ul>
                </div>
                <div className="footer-container__links--signup">
                    <h5>Not A Member?</h5>
                    <p>Don't waste the opportunity to make your future vacations a better experience</p>
                    <a className="primary-button">Signup</a>
                </div>
            </div>
        </div>
    </footer>
    <div className="footer-copyright">
        <p><span>WeTravel</span> © 2023 All Rights Reserved</p>
    </div>
    </>
  )
}

export default Footer