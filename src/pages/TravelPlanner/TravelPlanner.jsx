import './TravelPlanner.scss';

import heroImage from '../../assets/vector-illustrations/illustration_travel-planner.png'
import heroBgArrow from '../../assets/bg-arrow.png';
import heroBgDot from '../../assets/bg-dot.png';
import heroBgLocation from '../../assets/bg-location.png';
import heroLocationIcon from '../../assets/icons/location.svg';
import heroDateIcon from '../../assets/icons/date.svg';
import heroSubmitIcon from '../../assets/icons/Icon.svg';

function TravelPlanner() {
  return (
    <main>
        <section className="hero">
            <div className="hero__gradient"></div> 
            <div className="hero__text slidein-left">
                <h6>Easily Plan Your Next Trip</h6>
                <h1>Travel Planner</h1>
                <div className="hero__location-container">
                <div className="hero__location">
                    <img src={heroLocationIcon} alt="" class="hero__icon"/>
                    <div className="hero__input-group">
                        <label for="location" class="hero__label">Going to</label>
                        <input type="text" placeholder="Enter City/Country" class="hero__input"/>
                    </div>
                </div>
                
            </div>
            <div className="hero__date-container">
                <div className="hero__date">
                    <img src={heroDateIcon} alt="" class="hero__icon"/>
                    <div className="hero__input-group">
                        <label for="date" class="hero__label">From</label>
                        <input type="text" placeholder="Select Date" class="hero__input"/>
                    </div>
                </div>
                <div class="hero__date">
                    <img src={heroDateIcon} alt="" class="hero__icon"/>
                    <div class="hero__input-group">
                        <label for="date" class="hero__label">To</label>
                        <input type="text" placeholder="Select Date" class="hero__input"/>
                    </div>
                </div>
                <div class="hero__cta">
                    <img className="hero__cta-icon" src={heroSubmitIcon} alt=""/>
                </div>

                
            </div>
            </div>
            <div class="hero__image slidein-right">
                <img src={heroImage} alt="travel illustration"/>
            </div>
             {/* <!-- Background image --> */}
            <img className="hero__bgicon bg-arrow" src={heroBgArrow} alt="arrow icon"/>
            <img className="hero__bgicon bg-dot" src={heroBgDot} alt="dot icon"/>
            <img className="hero__bgicon bg-location" src={heroBgLocation} alt="location icon"/>
            <img className="hero__bgicon bg-location-small" src={heroBgLocation} alt="smaller location icon"/>
        </section>
    </main>
  )
}

export default TravelPlanner