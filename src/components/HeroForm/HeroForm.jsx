import './HeroForm.scss';

import heroBgArrow from '../../assets/bg-arrow.png';
import heroBgDot from '../../assets/bg-dot.png';
import heroBgLocation from '../../assets/bg-location.png';
import heroLocationIcon from '../../assets/icons/location.svg';
import heroDateIcon from '../../assets/icons/date.svg';
import heroSubmitIcon from '../../assets/icons/Icon.svg';

function HeroForm( { subtitle, title, image}) {
  return (
    <section className="hero">
      <div className="hero__gradient"></div>
      <div className="hero__text slidein-left">
        <h6>{subtitle}</h6>
        <h1>{title}</h1>
        <div className="hero__location-container">
          <div className="hero__location">
            <img src={heroLocationIcon} alt="" class="hero__icon" />
            <div className="hero__input-group">
              <label for="location" class="hero__label">
                Going to
              </label>
              <input
                type="text"
                placeholder="Enter City/Country"
                class="hero__input"
              />
            </div>
          </div>
        </div>
        <div className="hero__date-container">
          <div className="hero__date">
            <img src={heroDateIcon} alt="" class="hero__icon" />
            <div className="hero__input-group">
              <label htmlFor="dateFrom" className="hero__label">
                From
              </label>
              <input
                type="text"
                id="dateFrom"
                placeholder="Select Date"
                className="hero__input"
                onFocus={(e) => (e.currentTarget.type = "date")}
                onBlur={(e) =>
                  e.currentTarget.value === "" &&
                  (e.currentTarget.type = "text")
                }
              />
            </div>
          </div>
          <div class="hero__date">
            <img src={heroDateIcon} alt="" class="hero__icon" />
            <div className="hero__input-group">
              <label htmlFor="dateFrom" className="hero__label">
                To
              </label>
              <input
                type="text"
                id="dateFrom"
                placeholder="Select Date"
                className="hero__input"
                onFocus={(e) => (e.currentTarget.type = "date")}
                onBlur={(e) =>
                  e.currentTarget.value === "" &&
                  (e.currentTarget.type = "text")
                }
              />
            </div>
          </div>
          <div class="hero__cta">
            <img className="hero__cta-icon" src={heroSubmitIcon} alt="" />
          </div>
        </div>
      </div>
      <div class="hero__image slidein-right">
        <img src={image} alt="travel illustration" />
      </div>
      {/* <!-- Background image --> */}
      <img
        className="hero__bgicon bg-arrow"
        src={heroBgArrow}
        alt="arrow icon"
      />
      <img className="hero__bgicon bg-dot" src={heroBgDot} alt="dot icon" />
      <img
        className="hero__bgicon bg-location"
        src={heroBgLocation}
        alt="location icon"
      />
      <img
        className="hero__bgicon bg-location-small"
        src={heroBgLocation}
        alt="smaller location icon"
      />
    </section>
  );
}

export default HeroForm