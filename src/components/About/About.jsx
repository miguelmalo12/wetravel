import './About.scss';
import { ButtonPrimary } from '../Button/Button';

import vectorIcon1 from '../../assets/Step1.png';
import vectorIcon2 from '../../assets/Step2.png';
import vectorIcon3 from '../../assets/Step3.png';
import aboutImage from '../../assets/vector-illustrations/illustration_about.png';
import arrowIcon from '../../assets/bg-arrow.png';

import imageRome from '../../assets/real-images/gallery-italy.jpg';
import imageJapan from '../../assets/real-images/gallery-japan.jpg';
import imageNewYork from '../../assets/real-images/gallery-india.jpg';
import imageIndia from '../../assets/real-images/gallery-usa.jpg';
import imagePeru from '../../assets/real-images/gallery-peru.jpg';

function About() {
    return (
        <div>
            {/* <!-- 3 Steps Section --> */}
            <section className="process fadein-up">
                <div className="process__text-container">
                    <h6 className='heading--secondary'>3 steps for the perfect match</h6>
                    <h2 className='heading--primary'>Find Travel Perfection</h2>
                    <p className='process__text'>Discover your ideal vacation with just a few clicks.</p>
                </div>
                <div className="process__step-container">
                    <div className="step">
                        <img className='step__icon' src={vectorIcon1} alt="vector icon 1" />
                        <h5 className='step__heading'>Take The Questionnaire</h5>
                        <p className='step__text'>After a few questions about your travel preferences, we'll recommend cities or countries that match your preferences.</p>
                    </div>
                    <div className="step">
                        <img className='step__icon' src={vectorIcon2} alt="vector icon 2" />
                        <h5 className='step__heading'>Find Your Destination</h5>
                        <p className='step__text'>Use our filters to narrow down destination options by location, type of trip, activities, and more. Swipe through tailored recommendations.</p>
                    </div>
                    <div className="step">
                        <img className='step__icon' src={vectorIcon3} alt="vector icon 3" />
                        <h5 className='step__heading'>Start Planning</h5>
                        <p className='step__text'>Use our Trip Planner to create an itinerary that you can share with friends and family to help you plan your perfect vacation.</p>
                    </div>
                </div>
            </section>

            {/* <!-- About WeTravel --> */}
            <section className="about">
                <div className="about__image-container">
                    <img className="about__image" src={aboutImage} alt="travel illustration" />
                    <img className="about__bg-icon about__bg-icon--bg-arrow" src={arrowIcon} alt="arrow icon" />
                    <div className="about__bg-icon about__bg-icon--bg-dot-yellow"></div>
                    <div className="about__bg-icon about__bg-icon--bg-dot-blue"></div>
                    <div className="about__bg-icon about__bg-icon--bg-dot-red"></div>
                </div>
                <div className="about__text-container">
                    <h6 className='heading--secondary'>The world in numbers</h6>
                    <h2 className='heading--primary'>Why Choose WeTravel?</h2>
                    <p className='paragraph'>WeTravel makes travel easy. Our intuitive platform helps you find the perfect destination from our expert-curated list. Choose from top-rated destinations that cater to your preferences, from food to adventure. Whether it's a city break or an exotic getaway, we've got you covered.</p>
                    <div className="statistic">
                        <div className='statistic__item'>
                            <h3 className='statistic__count'>195</h3>
                            <h6 className='statistic__title'>Countries</h6>
                        </div>
                        <div className='statistic__item'>
                            <h3 className='statistic__count'>17K+</h3>
                            <h6 className='statistic__title'>Cities</h6>
                        </div>
                        <div className='statistic__item'>
                            <h3 className='statistic__count'>1.4B+</h3>
                            <h6 className='statistic__title'>Travelers</h6>
                        </div>
                    </div>
                </div>
            </section>

            {/* <!-- Gallery Section / Travel Planner--> */}
            <section className="gallery">
                <div className="gallery__text-container">
                    <h6 className='heading--secondary'>travel planner</h6>
                    <h2 className='heading--primary'>Your Dream Places</h2>
                    <p className='gallery__text'>Already have a destination in mind? Let our Travel Planner be your trusty guide to map out every detail of your next adventure</p>
                    <ButtonPrimary to='#' text='Travel Planner' />
                </div>

                <div className="gallery__image-container">

                    <img className='gallery__image gallery__image--1' src={imageRome} alt="rome city" />



                    <img className='gallery__image gallery__image--2' src={imageJapan} alt="japan landscape" />
                    <img className='gallery__image gallery__image--3' src={imageNewYork} alt="new york city" />


                    <img className='gallery__image gallery__image--4' src={imageIndia} alt="taj mahal" />
                    <img className='gallery__image gallery__image--5' src={imagePeru} alt="machu pichu" />


                </div>
            </section>
        </div>
    )
}

export default About
