import './Button.scss';
import { Link } from 'react-router-dom';
import google_logo from '../../assets/icons/google-icon.svg'


export const ButtonPrimary = ({ text, to, className }) => {
    return (
        <Link className={`button button--primary ${className}`} to={to}>{text}</Link>
    )
}

export const ButtonSecondary = ({ text, to }) => {
    return (
        <Link className="button button--secondary" to={to}>{text}</Link>
    )
}

export const ButtonGoogle = () => {
    return (
        <Link className="button button--google">
            <img className='button__icon' src={google_logo} alt="" />
            Sign In with Google
        </Link>
    )
}
