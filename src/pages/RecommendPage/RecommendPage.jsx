import './RecommendPage.scss';
import { CopyrightFooter, Footer } from '../../components/Footer/Footer';
import CTA from '../../components/CTA/CTA';
import HeroImage from '../../assets/vector-illustrations/illustration_recommend.png';
import heroLocationIcon from '../../assets/icons/location.svg';
import timerIcon from '../../assets/icons/timerIcon.svg';
import companionIcon from '../../assets/icons/companionIcon.svg';
import dateIcon from '../../assets/icons/dateIcon.svg';
import { ButtonHeroFormSubmit } from '../../components/Button/Button';
import heroBgArrow from '../../assets/bg-arrow.png';
import heroBgDot from '../../assets/bg-dot.png';
import heroBgLocation from '../../assets/bg-location.png';
import heroBgLocationSmall from '../../assets/bg-location.png';

function RecommendPage() {
  return (
    <div className="recommend-page">
      <section className="recommend-page__hero">
        <div className="recommend-page__text-container">
          <h6 className='heading--secondary'>Explore The World</h6>
          <h1 className='heading--primary'>Travel planning made simple</h1>
          <form className="recommend-form">
            <div className="recommend-form__group-container">
              <img src={heroLocationIcon} alt="" className="recommend-form__icon" />
              <div className="recommend-form__group">
                <label htmlFor="" className="recommend-form__label">Destination Type</label>
                <select placeholder='Enter City / Country' type="text" className="recommend-form__input recommend-form__input--select" >
                  <option value="" className="recommend-form__input recommend-form__input--option">City</option>
                  <option value="" className="recommend-form__input recommend-form__input--option">Area</option>
                  <option value="" className="recommend-form__input recommend-form__input--option">Region</option>
                </select>
              </div>
            </div>
            <div className="recommend-form__group-container">
              <img src={heroLocationIcon} alt="" className="recommend-form__icon" />
              <div className="recommend-form__group">
                <label htmlFor="" className="recommend-form__label">Destination Scope</label>
                <select placeholder='Enter City / Country' type="text" className="recommend-form__input recommend-form__input--select" >
                  <option value="" className="recommend-form__input recommend-form__input--option">International</option>
                  <option value="" className="recommend-form__input recommend-form__input--option">Within Country</option>
                </select>
              </div>
            </div>
            <div className="recommend-form__group-container">
              <img src={companionIcon} alt="" className="recommend-form__icon" />
              <div className="recommend-form__group">
                <label htmlFor="" className="recommend-form__label">Companionship Preference</label>
                <select placeholder='Enter City / Country' type="text" className="recommend-form__input recommend-form__input--select" >
                  <option value="" className="recommend-form__input recommend-form__input--option">Family</option>
                  <option value="" className="recommend-form__input recommend-form__input--option">Friend</option>
                  <option value="" className="recommend-form__input recommend-form__input--option">Partner</option>
                  <option value="" className="recommend-form__input recommend-form__input--option">Solo</option>
                </select>
              </div>
            </div>
            <div className="recommend-form__group-container">
              <img src={timerIcon} alt="" className="recommend-form__icon" />
              <div className="recommend-form__group">
                <label htmlFor="" className="recommend-form__label">Length of Journey</label>
                <select placeholder='Enter City / Country' type="text" className="recommend-form__input recommend-form__input--select" >
                  {Array.from({ length: 31 }, (_, index) => (
                    <option key={index + 1} value={index + 1} className="recommend-form__input recommend-form__input--option">
                      {index + 1} {(index + 1 === 1 ? 'day' : 'days')}
                    </option>
                  ))}

                </select>
              </div>
            </div>
            <div className="recommend-form__group-container">
              <img src={dateIcon} alt="" className="recommend-form__icon" />
              <div className="recommend-form__group">
                <label htmlFor="" className="recommend-form__label">Preferred Travel Month</label>
                <select placeholder='Enter City / Country' type="text" className="recommend-form__input recommend-form__input--select" >
                  <option value="" className="recommend-form__input recommend-form__input--option">Urban</option>
                  <option value="" className="recommend-form__input recommend-form__input--option">Rural</option>
                </select>
              </div>
              <ButtonHeroFormSubmit className='recommend-form__button' />
            </div>
          </form>
        </div>
        <div className="recommend-page__image-container">
          <img src={HeroImage} alt="" className="recommend-page__image" />
        </div>
        <img className="recommend-page__bgicon recommend-page__bgicon--bg-arrow" src={heroBgArrow} alt="arrow icon" />
        <img className="recommend-page__bgicon recommend-page__bgicon--bg-dot" src={heroBgDot} alt="dot icon" />
        <img className="recommend-page__bgicon recommend-page__bgicon--bg-location" src={heroBgLocation} alt="location icon" />
        <img className="recommend-page__bgicon recommend-page__bgicon--bg-location-small" src={heroBgLocationSmall} alt="smaller location icon" />
      </section>
      <div className="recommend-page__main">
        <CTA title='Need To Plan Your Trip?' text='Your perfect planning tool. One click away' buttonText='Go To Travel Planner' to='/plan' />
      </div>
      <Footer />
      <CopyrightFooter />
    </div>
  )
}

export default RecommendPage