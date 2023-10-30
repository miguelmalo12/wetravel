import './Button.scss';
import { Link } from 'react-router-dom';


export const ButtonPrimary = ({ text, to }) => {
    return (
        <Link className="button button--primary" to={to}>{text}</Link>
    )
}
