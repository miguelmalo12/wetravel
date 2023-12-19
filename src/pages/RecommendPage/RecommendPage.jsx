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
import { useState } from 'react';
import { ButtonDropDown } from '../../components/Button/Button';
import RecommendCard from '../../components/RecommendCard/RecommendCard';

function RecommendPage() {

  const destinationType = ['City', 'Area', 'Region']
  const destinationScope = ['Within Country', 'International']
  const companionPreference = ['Friend', 'Family', 'Partner', 'Solo']
  const lengthOfTrip = Array.from({ length: 30 }, (_, index) => `${index + 1} ${(index + 1 === 1) ? 'day' : 'days'} `);
  const preferredMonth = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const [recommendInput, setRecommendInput] = useState({
    destination_type: "",
    destination_scope: "",
    companionship_preference: "",
    trip_length: "",
    travel_month: ""
  });

  const handleInputChange = (event) => {
    setRecommendInput({
      ...recommendInput, [event.target.name]: event.target.value
    })
  }

  const [dropDown, setDropDown] = useState(false)



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
              <SingleHeroFormSelect name='destination_type' onChange={handleInputChange} label='Destination Type' icon={heroLocationIcon} options={destinationType} />
              <SingleHeroFormSelect name='destination_scope' onChange={handleInputChange} label='Destination Scope' icon={heroLocationIcon} options={destinationScope} />
              <SingleHeroFormSelect name='companionship_preference' onChange={handleInputChange} label='Companionship Preference' icon={companionIcon} options={companionPreference} />
              <SingleHeroFormSelect name='trip_length' onChange={handleInputChange} label='Length of Journey' icon={timerIcon} options={lengthOfTrip} />
              <SingleHeroFormSelectSubmit name='travel_month' onChange={handleInputChange} label='Preferred Travel Month' icon={dateIcon} options={preferredMonth} />
            </form>

            {/* Tablet Design */}
            <form className="recommend-form recommend-form--tablet">
              <SingleHeroFormSelect name='destination_type' onChange={handleInputChange} label='Destination Type' icon={heroLocationIcon} options={destinationType} />
              <DoubleHeroFormSelect name1='destination_scope' name2='companionship_preference' onChange={handleInputChange} label1='Destination Scope' icon1={heroLocationIcon} label2='Companionship Preference' icon2={companionIcon} options1={destinationScope} options2={companionPreference} />
              <DoubleHeroFormSelectSubmit name1='trip_length' name2='travel_month' onChange={handleInputChange} label1='Length of Journey' icon1={timerIcon} label2='Preferred Travel Month' icon2={dateIcon} options1={lengthOfTrip} options2={preferredMonth} />
            </form>
          </div>
          <div className="recommend-page__image-container slidein-right">
            <img src={HeroImage} alt="" className="recommend-page__image" />
          </div>

        </section>
        <RecommendCard />
        <section className="dropdown">
          <div className="dropdown__header">
            <div className="dropdown__heading-container">
              <h6 className="heading--tertiary">RECOMMENDATION USING AI</h6>
              <h2 >
                How Does It Work?
              </h2>
            </div>

            <ButtonDropDown className='dropdown__button' dropDown={dropDown} setDropDown={setDropDown} />

          </div>
          {dropDown ? (
            <div className="dropdown__text-container">
              <p className="dropdown__text">
                As you may recall from your initial sign-up, we gathered your core travel preferences through a detailed questionnaire. These are your 'immutable likings' - the aspects of travel that define your unique style and don't change often.
              </p>
              <p className="dropdown__text">
                Using the inputs above, you will be able to specify your mutable likings each time you seek recommendations. This flexibility allows us to tailor your recommendations for every new journey, making each trip recommendation unique.
              </p>
              <p className="dropdown__text">
                With both your immutable and mutable preferences at hand, we turn to our AI system and generate the perfect match for you. This way, we combine your personal likes and current desires with our AI's expertise to suggest destinations that promise to align with your ideal vacation.
              </p>
              <p className="dropdown__text">
                Your perfect travel spot is now just a click away!
              </p>
            </div>
          ) : (<></>)}
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