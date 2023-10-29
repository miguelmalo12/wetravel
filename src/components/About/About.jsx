import './About.scss';

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
                <div className="about__image">
                    <img className="about__image--illustration" src={aboutImage} alt="travel illustration" />
                    <img className="about__bgicon bg-arrow" src={arrowIcon} alt="arrow icon" />
                    <div className="about__bgicon bg-dot-yellow"></div>
                    <div className="about__bgicon bg-dot-blue"></div>
                    <div className="about__bgicon bg-dot-red"></div>
                </div>
                <div className="about__text">
                    <h6>The world in numbers</h6>
                    <h2>Why Choose WeTravel?</h2>
                    <p>WeTravel makes travel easy. Our intuitive platform helps you find the perfect destination from our expert-curated list. Choose from top-rated destinations that cater to your preferences, from food to adventure. Whether it's a city break or an exotic getaway, we've got you covered.</p>
                    <div className="about__text__numbers">
                        <div>
                            <h3>195</h3>
                            <h6>Countries</h6>
                        </div>
                        <div>
                            <h3>17K+</h3>
                            <h6>Cities</h6>
                        </div>
                        <div>
                            <h3>1.4B+</h3>
                            <h6>Travelers</h6>
                        </div>
                    </div>
                </div>
            </section>

            {/* <!-- Gallery Section / Travel Planner--> */}
            <section className="gallery">
                <div className="gallery__intro">
                    <h6>travel planner</h6>
                    <h2>Your Dream Places</h2>
                    <p>Already have a destination in mind? Let our Travel Planner be your trusty guide to map out every detail of your next adventure</p>
                    <a className="primary-button" href="">Travel Planner</a>
                </div>

                {/* <!-- This shows in phone view only--> */}
                <div className="gallery__images">
                    <img src={imageRome} alt="rome city" />
                    <img src={imageJapan} alt="japan landscape" />
                    <img src={imageIndia} alt="taj mahal" />
                    <img src={imageNewYork} alt="new york city" />
                    <img src={imagePeru} alt="machu pichu" />
                </div>
                {/* <!-- End--> */}

                {/* <!-- This shows in desktop view only--> */}
                <div className="gallery__images-desktop">
                    <div className="gallery__images-desktop--left">
                        <img src={imageRome} alt="rome city" />
                    </div>
                    <div className="gallery__images-desktop--right">
                        <div><img src={imageJapan} alt="japan landscape" /></div>
                        <div><img src={imageIndia} alt="taj mahal" /></div>
                        <div><img src={imageNewYork} alt="new york city" /></div>
                        <div><img src={imagePeru} alt="machu pichu" /></div>
                    </div>
                </div>
                {/* <!-- End--> */}

            </section>
        </div>
    )
}

export default About
