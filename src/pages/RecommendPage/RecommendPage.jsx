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
                <label htmlFor="" className="recommend-form__label">Type of Destination</label>
                <input placeholder='Enter City / Country' type="text" className="recommend-form__input" />
              </div>
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