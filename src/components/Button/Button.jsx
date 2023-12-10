import './Button.scss';
import { Link } from 'react-router-dom';
import google_logo from '../../assets/icons/google-icon.svg'


export const ButtonPrimary = ({ text, to, className, type, onClick }) => {
    return (
        (to) ? (
            <Link onClick={onClick} className={`button button--primary ${className}`} to={to}>{text}</Link>
        ) : (
            <button type={type} onClick={onClick} className={`button button--primary ${className}`}>{text}</button>
        )
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


export const ButtonHeroFormSubmit = ({ className, onClick }) => {
    return (
        <button type='submit' className={`hero-form-button ${className}`} onClick={onClick}>
            <svg className='hero-form-button__icon' xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 23 23" fill="none">
                <path className='hero-form-button__icon--color' d="M22.5 0.777323C22.7841 1.0614 22.8833 1.4816 22.7562 1.86273L16.0062 22.1127C15.8768 22.5008 15.5357 22.78 15.1296 22.83C14.7235 22.88 14.3248 22.6919 14.1052 22.3467L8.98173 14.2956L0.930611 9.17213C0.585408 8.95246 0.397348 8.55381 0.447342 8.1477C0.497336 7.7416 0.776468 7.40046 1.16464 7.27107L21.4146 0.521094C21.7957 0.394051 22.2159 0.493246 22.5 0.777323ZM11.1016 13.6756L14.6985 19.3278L19.3229 5.45436L11.1016 13.6756ZM17.8229 3.95436L3.94952 8.57884L9.60165 12.1757L17.8229 3.95436Z" fill="white" />
            </svg>
        </button>
    )
}