import './CTA.scss';
import ctaImage from '../../assets/vector-illustrations/illustration_cta.png';
import { ButtonPrimary } from '../Button/Button';

function CTA({ title, text, buttonText, to }) {
    return (
        <section className="cta">
            <div className="cta__text-container">
                <h2 className='cta__heading'>{title}</h2>
                <p className='cta__text'>{text}</p>
                <ButtonPrimary text={buttonText} to={to} />
            </div>
            <div className="cta__image-container">
                <img className='cta__image' src={ctaImage} alt="travel illustration" />
            </div>
        </section>
    )
}

export default CTA
