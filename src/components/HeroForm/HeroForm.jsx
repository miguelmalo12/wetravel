import './HeroForm.scss';
import { useState } from 'react';

// recoil state
import { useRecoilState } from 'recoil';
import { tripInfoState } from '../../state/tripState';

// icons
import heroBgArrow from '../../assets/bg-arrow.png';
import heroBgDot from '../../assets/bg-dot.png';
import heroBgLocation from '../../assets/bg-location.png';
import heroLocationIcon from '../../assets/icons/location.svg';
import { ReactComponent as HeroDateIcon } from '../../assets/icons/date.svg';
import heroSubmitIcon from '../../assets/icons/Icon.svg';

function HeroForm( { subtitle, title, image, onFormSubmit }) {
  const [formError, setFormError] = useState("");
  const [localLocation, setLocalLocation] = useState("");
  const [localStartDate, setLocalStartDate] = useState("");
  const [localEndDate, setLocalEndDate] = useState("");
  const [tripInfo, setTripInfo] = useRecoilState(tripInfoState);

  const validate = () => {    
    if (!localLocation || !localStartDate || !localEndDate) {
      setFormError("Please enter all the fields");
      return false;
    }

    setFormError("");
    return true;
  };

  const handleSubmit = () => {
    if (validate()) {
      setTripInfo({
        ...tripInfo,
        location: localLocation,
        startDate: localStartDate,
        endDate: localEndDate,
      });
      if (onFormSubmit) {
        onFormSubmit();
      }
    }
  };
  
  return (
    <>
    <div className="heroform__gradient"></div>
    <section className="heroform">
      <div className="heroform__text slidein-left">
        <h6>{subtitle}</h6>
        <h1>{title}</h1>
        <div className="heroform__location-container">
          <div className="heroform__location">
            <img src={heroLocationIcon} alt="" className="heroform__icon" />
            <div className="heroform__input-group">
              <label htmlFor="location" className="heroform__label">
                Going to
              </label>
              <input
                type="text"
                placeholder="Enter City/Country"
                className="heroform__input"
                value={localLocation}
                onChange={(e) => setLocalLocation(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="heroform__date-container">
          <div className="heroform__date">
            <HeroDateIcon className="heroform__icon" />
            <div className="heroform__input-group">
              <label htmlFor="dateFrom" className="heroform__label">
                From
              </label>
              <input
                type="date"
                id="dateFrom"
                placeholder="Select Date"
                className="heroform__input"
                onFocus={(e) => (e.currentTarget.type = "date")}
                onBlur={(e) =>
                  e.currentTarget.value === "" &&
                  (e.currentTarget.type = "text")
                }
                value={localStartDate}
                onChange={(e) => setLocalStartDate(e.target.value)}
              />
            </div>
          </div>
          <div className="heroform__date">
            <HeroDateIcon className="heroform__icon" />
            <div className="heroform__input-group">
              <label htmlFor="dateFrom" className="heroform__label">
                To
              </label>
              <input
                type="date"
                id="dateTo"
                placeholder="Select Date"
                className="heroform__input"
                onFocus={(e) => (e.currentTarget.type = "date")}
                onBlur={(e) =>
                  e.currentTarget.value === "" &&
                  (e.currentTarget.type = "text")
                }
                value={localEndDate}
                onChange={(e) => setLocalEndDate(e.target.value)}
              />
            </div>
          </div>
          <div onClick={handleSubmit} className="heroform__cta">
            <img className="heroform__cta-icon" src={heroSubmitIcon} alt="submit icon" />
          </div>
        </div>
        {formError && <p className="error-message">{formError}</p>}
      </div>
      <div className="heroform__image slidein-right">
        <img src={image} alt="travel illustration" />
      </div>
      {/* <!-- Background image --> */}
      <img
        className="heroform__bgicon bg-arrow"
        src={heroBgArrow}
        alt="arrow icon"
      />
      <img className="heroform__bgicon bg-dot" src={heroBgDot} alt="dot icon" />
      <img
        className="heroform__bgicon bg-location"
        src={heroBgLocation}
        alt="location icon"
      />
      <img
        className="heroform__bgicon bg-location-small"
        src={heroBgLocation}
        alt="smaller location icon"
      />
    </section>
    </>
  );
}

export default HeroForm