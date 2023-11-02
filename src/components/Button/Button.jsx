import './Button.scss';
import { Link } from 'react-router-dom';


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
