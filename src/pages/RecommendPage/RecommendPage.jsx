import './RecommendPage.scss';
import { CopyrightFooter, Footer } from '../../components/Footer/Footer';
import CTA from '../../components/CTA/CTA';
import HeroImage from '../../assets/vector-illustrations/illustration_recommend.png';
import heroLocationIcon from '../../assets/icons/location.svg';
import timerIcon from '../../assets/icons/timerIcon.svg';
import companionIcon from '../../assets/icons/companionIcon.svg';
import dateIcon from '../../assets/icons/dateIcon.svg';
import { SingleHeroFormSelect, SingleHeroFormSelectSubmit, DoubleHeroFormSelect, DoubleHeroFormSelectSubmit } from '../../components/HeroFormInput/HeroFormInput';
import HeroBgIcons from '../../components/HeroBgIcons/HeroBgIcons';

function RecommendPage() {

  const destinationType = ['City', 'Area', 'Region']
  const destinationScope = ['Within Country', 'International']
  const companionPreference = ['Friend', 'Family', 'Partner', 'Solo']
  const lengthOfTrip = Array.from({ length: 30 }, (_, index) => `${index + 1} ${(index + 1 === 1) ? 'day' : 'days'} `);
  const preferredMonth = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];




  return (
    <div className="recommend-page">
      <main>
        <div className="recommend-page__gradient"></div>
        <section className="recommend-page__hero">
          <HeroBgIcons />

          <div className="recommend-page__text-container slidein-left">
            <h6>Get your perfect Destination match</h6>
            <h1>Recommend Me!</h1>
            <form className="recommend-form recommend-form--mobile">
              <SingleHeroFormSelect label='Destination Type' icon={heroLocationIcon} options={destinationType} />
              <SingleHeroFormSelect label='Destination Scope' icon={heroLocationIcon} options={destinationScope} />
              <SingleHeroFormSelect label='Companionship Preference' icon={companionIcon} options={companionPreference} />
              <SingleHeroFormSelect label='Length of Journey' icon={timerIcon} options={lengthOfTrip} />
              <SingleHeroFormSelectSubmit label='Preferred Travel Month' icon={dateIcon} options={preferredMonth} />
            </form>

            {/* Tablet Design */}
            <form className="recommend-form recommend-form--tablet">
              <SingleHeroFormSelect label='Destination Type' icon={heroLocationIcon} options={destinationType} />
              <DoubleHeroFormSelect label1='Destination Scope' icon1={heroLocationIcon} label2='Companionship Preference' icon2={companionIcon} options1={destinationScope} options2={companionPreference} />
              <DoubleHeroFormSelectSubmit label1='Length of Journey' icon1={timerIcon} label2='Preferred Travel Month' icon2={dateIcon} options1={lengthOfTrip} options2={preferredMonth} />
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