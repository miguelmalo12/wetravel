import './StatusPage.scss';
import statusPageIllustration from '../../assets/vector-illustrations/illustration_registration.png';
import { ButtonPrimary } from '../../components/Button/Button';


const StatusPage = ({ title, text }) => {
    return (
        <div className="status-page">
            <div className="status-page__image-container">
                <img src={statusPageIllustration} alt="" className="status-page__image" />
            </div>
            <div className="status-page__text-container">
                <h1 className="status-page__heading heading--primary">{title}</h1>
                <p className="status-page__text">{text}</p>
                <ButtonPrimary className='status-page__button' text='Back to Home' to='/' />
            </div>
        </div>
    )
}

export default StatusPage;