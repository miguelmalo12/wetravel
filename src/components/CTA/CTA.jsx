import './CTA.scss';

import ctaImage from '../../assets/vector-illustrations/illustration_cta.png';

function CTA( { title, text, buttonText  } ) {
  return (
    <div>
       <section className="cta">
            <div className="cta__text">
                <h2>{title}</h2>
                <p>{text}</p>
                <a className="primary-button" href="">{buttonText}</a>
            </div>
            <div className="cta__image">
                <img src={ctaImage} alt="travel illustration"/>
            </div>
        </section> 
    </div>
  )
}

export default CTA
