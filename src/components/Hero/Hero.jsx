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
                <p className='paragraph'>WeTravel is your ultimate travel companion, offering both an AI-powered destination finder and a comprehensive travel planner to accommodate all your trip needs. Discover your destination match according to your preferences, then use our travel planner tool to assist in organizing every detail of your journey. With WeTravel, finding and planning your entire trip is just a few clicks away.</p>
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