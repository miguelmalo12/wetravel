import './CTA.scss';
import ctaImage from '../../assets/vector-illustrations/illustration_cta.png';
import { ButtonPrimary } from '../Button/Button';

function CTA({ title, text, buttonText, to }) {
    return (
        <section className="cta">
            <div className="cta__text">
                <h2>{title}</h2>
                <p>{text}</p>
                <ButtonPrimary text={buttonText} to={to} />
            </div>
            <div className="cta__image">
                <img src={ctaImage} alt="travel illustration" />
            </div>
        </section>
    )
}

export default CTA
