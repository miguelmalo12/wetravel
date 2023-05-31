import './TravelPlanner.scss';

import HeroForm from '../../components/HeroForm/HeroForm';
import CTA from '../../components/CTA/CTA';

import heroImage from '../../assets/vector-illustrations/illustration_travel-planner.png';

function TravelPlanner() {
  return (
    <main>
        <HeroForm subtitle={"Easily Plan Your Next Trip"} title={"Travel Planner"} image={heroImage} />
        <CTA title={"Need A Recommendation?"} text={"Your perfect destination, one click away"} buttonText={"Recommend Me"} />
    </main>
  )
}

export default TravelPlanner