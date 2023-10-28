import './Hero.scss';
import { Link } from 'react-router-dom';
import heroImage from '../../assets/vector-illustrations/illustration_main-hero.png'
import heroBgArrow from '../../assets/bg-arrow.png';
import heroBgDot from '../../assets/bg-dot.png';
import heroBgLocation from '../../assets/bg-location.png';
import heroBgLocationSmall from '../../assets/bg-location.png';


function Hero() {
    return (
        <section className="hero">
            <div className="hero__text-container slidein-left">
                <h6 className='hero__heading--secondary'>Explore The World</h6>
                <h1 className='hero__heading--primary'>Travel planning made simple</h1>
                <p className='hero__paragraph'>WeTravel is the ultimate travel destination finder that helps you discover amazing places based on your preferences. Whether you're a solo traveler or traveling with family and friends, we've got you covered. Our easy-to-use platform lets you find the perfect destination for your next trip with just a few clicks.</p>
                <Link className="hero__button" href="">Start</Link>
            </div>
            <div className="hero__image slidein-right">
                <img src={heroImage} alt="travel illustration" />
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