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
import axios from 'axios';
import { userState } from '../../state/userState';
import { useRecoilValue } from 'recoil';
import { ring } from 'ldrs';
ring.register()

function RecommendPage({ API_URL }) {

  const destinationScope = ['Within Country', 'International']
  const companionPreference = ['Friend', 'Family', 'Partner', 'Solo']
  const lengthOfTrip = Array.from({ length: 30 }, (_, index) => `${index + 1} ${(index + 1 === 1) ? 'day' : 'days'} `);
  const preferredMonth = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const [recommendInput, setRecommendInput] = useState({
    destination_type: "city",
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

  const [dropDown, setDropDown] = useState(true)
  const user = useRecoilValue(userState);
  const [recommendation, setRecommendation] = useState({})
  const [loaderTrigger, setLoaderTrigger] = useState(false)

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setLoaderTrigger(true)
    try {
      const response = await axios.post(`${API_URL}/recommend`, {
        user_id: user.user_id,
        destination_type: recommendInput.destination_type,
        destination_scope: recommendInput.destination_scope,
        companionship_preference: recommendInput.companionship_preference,
        trip_length: recommendInput.trip_length,
        travel_month: recommendInput.travel_month
      });
      setTimeout(() => {
        if (response.data.length !== 0) {
          setRecommendation(response.data[0])
          localStorage.setItem('recommendationList', JSON.stringify(response.data))
        }

      }, 2000)
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="recommend-page">
      <main>
        <div className="recommend-page__gradient"></div>
        <section className="recommend-page__hero">
          <HeroBgIcons />

          <div className="recommend-page__text-container slidein-left">
            <h6>Get your perfect Destination match</h6>
            <h1>AI Recommends</h1>
            <form onSubmit={handleFormSubmit} className="recommend-form recommend-form--mobile">
              <SingleHeroFormSelect name='destination_scope' onChange={handleInputChange} label='Destination Scope' icon={heroLocationIcon} options={destinationScope} />
              <SingleHeroFormSelect name='companionship_preference' onChange={handleInputChange} label='Companionship Preference' icon={companionIcon} options={companionPreference} />
              <SingleHeroFormSelect name='trip_length' onChange={handleInputChange} label='Length of Journey' icon={timerIcon} options={lengthOfTrip} />
              <SingleHeroFormSelectSubmit onSubmit={handleFormSubmit} name='travel_month' onChange={handleInputChange} label='Preferred Travel Month' icon={dateIcon} options={preferredMonth} />
            </form>

            {/* Tablet Design */}
            <form onSubmit={handleFormSubmit} className="recommend-form recommend-form--tablet">
              <DoubleHeroFormSelect name1='destination_scope' name2='companionship_preference' onChange={handleInputChange} label1='Destination Scope' icon1={heroLocationIcon} label2='Companionship Preference' icon2={companionIcon} options1={destinationScope} options2={companionPreference} />
              <DoubleHeroFormSelectSubmit onSubmit={handleFormSubmit} name1='trip_length' name2='travel_month' onChange={handleInputChange} label1='Length of Journey' icon1={timerIcon} label2='Preferred Travel Month' icon2={dateIcon} options1={lengthOfTrip} options2={preferredMonth} />
            </form>
          </div>
          <div className="recommend-page__image-container slidein-right">
            <img src={HeroImage} alt="" className="recommend-page__image" />
          </div>

        </section>
        {
          (loaderTrigger) ? (Object.keys(recommendation).length ? (
            <RecommendCard cityName={recommendation.city} setRecommendation={setRecommendation} countryName={recommendation.country} imageURL={recommendation.photo_url} imageALT={recommendation.photo_description} />
          ) : (<div className="loader-container">
            <l-ring color='#FD5056' size='100'></l-ring>
          </div>)
          ) : (<></>)


        }

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
                <strong>With both your immutable and mutable preferences at hand, we turn to our AI system and generate the perfect match for you.</strong> This way, we combine your personal likes and current desires with our AI's expertise to suggest destinations that promise to align with your ideal vacation.
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