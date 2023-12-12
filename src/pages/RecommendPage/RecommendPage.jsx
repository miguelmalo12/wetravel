import './RecommendPage.scss';
import { CopyrightFooter, Footer } from '../../components/Footer/Footer';
import CTA from '../../components/CTA/CTA';
import HeroImage from '../../assets/vector-illustrations/illustration_recommend.png';
import heroLocationIcon from '../../assets/icons/location.svg';
import timerIcon from '../../assets/icons/timerIcon.svg';
import companionIcon from '../../assets/icons/companionIcon.svg';
import dateIcon from '../../assets/icons/dateIcon.svg';
import heroBgArrow from '../../assets/bg-arrow.png';
import heroBgDot from '../../assets/bg-dot.png';
import heroBgLocation from '../../assets/bg-location.png';
import heroBgLocationSmall from '../../assets/bg-location.png';
import { SingleHeroFormSelect, SingleHeroFormSelectSubmit, DoubleHeroFormSelect, DoubleHeroFormSelectSubmit } from '../../components/HeroFormInput/HeroFormInput';


function RecommendPage() {

  const destinationType = ['City', 'Area', 'Region']
  const destinationScope = ['Within Country', 'International']



  return (
    <div className="recommend-page">
      <main>
        <div className="recommend-page__gradient"></div>
        <section className="recommend-page__hero">
          <img className="recommend-page__bgicon recommend-page__bgicon--bg-arrow" src={heroBgArrow} alt="arrow icon" />
          <img className="recommend-page__bgicon recommend-page__bgicon--bg-dot" src={heroBgDot} alt="dot icon" />
          <img className="recommend-page__bgicon recommend-page__bgicon--bg-location" src={heroBgLocation} alt="location icon" />
          <img className="recommend-page__bgicon recommend-page__bgicon--bg-location-small" src={heroBgLocationSmall} alt="smaller location icon" />

          <div className="recommend-page__text-container slidein-left">
            <h6>Get your perfect Destination match</h6>
            <h1>Recommend Me!</h1>
            <form className="recommend-form recommend-form--mobile">
              <SingleHeroFormSelect label='Destination Type' icon={heroLocationIcon} options={destinationType} />
              <SingleHeroFormSelect label='Destination Scope' icon={heroLocationIcon} options={destinationScope} />
              <SingleHeroFormSelect label='Companionship Preference' icon={companionIcon} options={destinationScope} />
              <SingleHeroFormSelect label='Length of Journey' icon={timerIcon} options={destinationScope} />
              <SingleHeroFormSelectSubmit label='Preferred Travel Month' icon={dateIcon} options={destinationScope} />
            </form>

            {/* Tablet Design */}
            <form className="recommend-form recommend-form--tablet">
              <SingleHeroFormSelect label='Destination Type' icon={heroLocationIcon} options={destinationType} />
              <DoubleHeroFormSelect label1='Destination Scope' icon1={heroLocationIcon} label2='Companionship Preference' icon2={companionIcon} options1={destinationType} options2={destinationType} />
              <DoubleHeroFormSelectSubmit label1='Length of Journey' icon1={timerIcon} label2='Preferred Travel Month' icon2={dateIcon} options1={destinationType} options2={destinationType} />
            </form>
          </div>
          <div className="recommend-page__image-container slidein-right">
            <img src={HeroImage} alt="" className="recommend-page__image" />
          </div>

        </section>
      </main>
      <div className="recommend-page__main">
        <CTA title='Need To Plan Your Trip?' text='Your perfect planning tool. One click away' buttonText='Go To Travel Planner' to='/plan' />
      </div>
      <Footer />
      <CopyrightFooter />

    </div>
  )
}

export default RecommendPage