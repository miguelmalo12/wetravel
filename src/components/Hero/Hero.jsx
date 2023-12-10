import './Hero.scss';
import heroImage from '../../assets/vector-illustrations/illustration_main-hero.png'
import heroBgArrow from '../../assets/bg-arrow.png';
import heroBgDot from '../../assets/bg-dot.png';
import heroBgLocation from '../../assets/bg-location.png';
import heroBgLocationSmall from '../../assets/bg-location.png';
import { ButtonPrimary } from '../Button/Button';


const Hero = () => {
    return (
        <section className="hero">
            <div className="hero__text-container slidein-left">
                <h6 className='heading--secondary'>Explore The World</h6>
                <h1 className='heading--primary'>Travel planning made simple</h1>
                <p className='paragraph'>WeTravel is the ultimate travel destination finder that helps you discover amazing places based on your preferences. Whether you're a solo traveler or traveling with family and friends, we've got you covered. Our easy-to-use platform lets you find the perfect destination for your next trip with just a few clicks.</p>
                <ButtonPrimary to='#' text='Start' />
            </div>
            <div className="hero__image-container slidein-right">
                <img className='hero__image' src={heroImage} alt="travel illustration" />
            </div>
            <div className="hero__map"></div>
            <img className="hero__bgicon bg-arrow" src={heroBgArrow} alt="arrow icon" />
            <img className="hero__bgicon bg-dot" src={heroBgDot} alt="dot icon" />
            <img className="hero__bgicon bg-location" src={heroBgLocation} alt="location icon" />
            <img className="hero__bgicon bg-location-small" src={heroBgLocationSmall} alt="smaller location icon" />
        </section>
    )
}

export default Hero