import './RecommendPage.scss';
import { CopyrightFooter, Footer } from '../../components/Footer/Footer';
import CTA from '../../components/CTA/CTA';
import HeroImage from '../../assets/vector-illustrations/illustration_recommend.png';
import heroLocationIcon from '../../assets/icons/location.svg';
import { ButtonHeroFormSubmit } from '../../components/Button/Button';

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
                  <option value="" className="recommend-form__input recommend-form__input--option">Urban</option>
                  <option value="" className="recommend-form__input recommend-form__input--option">Rural</option>
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
              <ButtonHeroFormSubmit />
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