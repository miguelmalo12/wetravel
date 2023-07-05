import logo from '../../assets/wetravel-logo-red.png';
import './HeaderLogo.scss'
const HeaderLogo = () => {
    return(
        <header className="header-simple">
            <img src={logo} alt="" className='header-simple__logo'/>
        </header>
    )
}

export default HeaderLogo;