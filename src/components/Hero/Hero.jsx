import './Hero.scss';
import heroImage from '../../assets/vector-illustrations/illustration_main-hero.png'
import { ButtonPrimary } from '../Button/Button';
import HeroBgIcons from '../HeroBgIcons/HeroBgIcons';


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
            <HeroBgIcons />
        </section>
    )
}

export default Hero