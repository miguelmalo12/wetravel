import logo from '../../assets/wetravel-logo-red.png';
import './HeaderSecondary.scss';
import { Link } from 'react-router-dom';
const HeaderSecondary = () =>{
    return(
        <header className="header-secondary">
            <Link to='/'>
            <   img src={logo} alt="" className='header-secondary__logo'/> 
            </Link>
            
        </header>

    )
}

export default HeaderSecondary;