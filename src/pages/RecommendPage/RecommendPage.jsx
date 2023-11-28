import './RecommendPage.scss';
import { CopyrightFooter, Footer } from '../../components/Footer/Footer';
import CTA from '../../components/CTA/CTA';
import HeroImage from '../../assets/vector-illustrations/illustration_recommend.png';
import heroLocationIcon from '../../assets/icons/location.svg';

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
                <select placeholder='Enter City / Country' type="text" className="recommend-form__input" >
                  <option value="" className="recommend-form__input--option">Urban</option>
                  <option value="" className="recommend-form__input--option">Rural</option>
                </select>
              </div>
            </div>
            <div className="recommend-form__group-container">
              <img src={heroLocationIcon} alt="" className="recommend-form__icon" />
              <div className="recommend-form__group">
                <label htmlFor="" className="recommend-form__label">Destination Scope</label>
                <input placeholder='International or Within Country' type="text" className="recommend-form__input" />
              </div>
            </div>
            <div className="recommend-form__group-container">
              <img src={heroLocationIcon} alt="" className="recommend-form__icon" />
              <div className="recommend-form__group">
                <label htmlFor="" className="recommend-form__label">Companionship Preference</label>
                <input placeholder='Family / Friend / Partner / Solo' type="text" className="recommend-form__input" />
              </div>
            </div>
            <div className="recommend-form__group-container">
              <img src={heroLocationIcon} alt="" className="recommend-form__icon" />
              <div className="recommend-form__group">
                <label htmlFor="" className="recommend-form__label">Length of Journey</label>
                <input placeholder='Number of days' type="number" className="recommend-form__input" />
              </div>
            </div>
            <div className="recommend-form__group-container">
              <img src={heroLocationIcon} alt="" className="recommend-form__icon" />
              <div className="recommend-form__group">
                <label htmlFor="" className="recommend-form__label">Preferred Travel Month</label>
                <input placeholder='Select the Month for Your Trip' type="text" className="recommend-form__input" />
              </div>
              <button className="recommend-form__submit">
                <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 23 23" fill="none">
                  <path d="M22.5 0.777323C22.7841 1.0614 22.8833 1.4816 22.7562 1.86273L16.0062 22.1127C15.8768 22.5008 15.5357 22.78 15.1296 22.83C14.7235 22.88 14.3248 22.6919 14.1052 22.3467L8.98173 14.2956L0.930611 9.17213C0.585408 8.95246 0.397348 8.55381 0.447342 8.1477C0.497336 7.7416 0.776468 7.40046 1.16464 7.27107L21.4146 0.521094C21.7957 0.394051 22.2159 0.493246 22.5 0.777323ZM11.1016 13.6756L14.6985 19.3278L19.3229 5.45436L11.1016 13.6756ZM17.8229 3.95436L3.94952 8.57884L9.60165 12.1757L17.8229 3.95436Z" fill="white" />
                </svg>
              </button>
            </div>
          </form>
        </div>
        <div className="recommend-page__image-container">
          <img src={HeroImage} alt="" className="recommend-page__image" />
        </div>
      </section>
      <div className="recommend-page__main">
        <CTA />
      </div>
      <Footer />
      <CopyrightFooter />
    </div>
  )
}

export default RecommendPage