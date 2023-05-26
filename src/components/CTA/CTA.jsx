import './CTA.scss';

import ctaImage from '../../assets/vector-illustrations/illustration_cta.png';

function CTA() {
  return (
    <div>
       {/* <!-- CTA --> */}
       <section className="cta">
            <div className="cta__text">
                <h2>Let's Explore The Beauty Of the World</h2>
                <p>Your perfect destination, one click away.</p>
                <a className="primary-button" href="">Get Started</a>
            </div>
            <div className="cta__image">
                <img src={ctaImage} alt="travel illustration"/>
            </div>
        </section> 
    </div>
  )
}

export default CTA
