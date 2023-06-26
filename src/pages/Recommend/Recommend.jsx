import './Recommend.scss';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import HeroForm from '../../components/HeroForm/HeroForm';
import CTA from '../../components/CTA/CTA';

import heroImage from '../../assets/vector-illustrations/illustration_recommend.png';

function Recommend() {
  return (
    <div>
    <Header/>
    <main>
        <HeroForm subtitle={"Get Your Perfect Destination Match"} title={"Recommend Me!"} image={heroImage} />
        <CTA title={"Need A Recommendation?"} text={"Your perfect destination, one click away"} buttonText={"Recommend Me"} />
    </main> 
    <Footer/>
    </div>
  )
}

export default Recommend