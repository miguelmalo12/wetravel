import './Recommend.scss';
import Header from '../../components/Header/Header';
import { CopyrightFooter, Footer } from '../../components/Footer/Footer';
import HeroForm from '../../components/HeroForm/HeroForm';
import CTA from '../../components/CTA/CTA';

import heroImage from '../../assets/vector-illustrations/illustration_recommend.png';
import heroBgArrow from '../../assets/bg-arrow.png';
import heroBgDot from '../../assets/bg-dot.png';
import heroBgLocation from '../../assets/bg-location.png';
import heroBgLocationSmall from '../../assets/bg-location.png';

function Recommend() {
  return (
    <div className="recommend-page">
      <section className="hero-recommend-section">
        <div className="hero-recommend">
          <div className="hero-recommend__form-container">
            <h6 className='heading--secondary'>Get Your Perfect Destination Match</h6>
            <h1 className='heading--primary'>Recommend Me!</h1>
            <form action="" className="recommend-form">
              <div className="recommend-form__group-container">
                <div className="recommend-form__group">
                  <label htmlFor="" className="recommend-form__label">
                    From
                  </label>
                  <input type="text" className="recommend-form__input" />
                </div>

                <div className="recommend-form__group">
                  <label htmlFor="" className="recommend-form__label">
                    To
                  </label>
                  <input type="text" className="recommend-form__input" />
                </div>
                <button className="recommend-form__button">
                  <img src="" alt="" className="recommend-form__button-icon" />
                </button>
              </div>
            </form>
          </div>
          <div className="hero-recommend__image-container">
            <img className='hero-recommend__image' src={heroImage} alt="travel illustration" />
          </div>
          <img className="hero-recommend__bg-icon hero-recommend__bg-icon--bg-arrow" src={heroBgArrow} alt="arrow icon" />
          <img className="hero-recommend__bg-icon hero-recommend__bg-icon--bg-dot" src={heroBgDot} alt="dot icon" />
          <img className="hero-recommend__bg-icon hero-recommend__bg-icon--bg-location" src={heroBgLocation} alt="location icon" />
          <img className="hero-recommend__bg-icon hero-recommend__bg-icon--bg-location-small" src={heroBgLocationSmall} alt="smaller location icon" />
        </div>
      </section>
      <CTA />
      <Footer />
      <CopyrightFooter />
    </div>
  )
}

export default Recommend