import './HeroBgIcons.scss';
import heroBgArrow from '../../assets/bg-arrow.png';
import heroBgDot from '../../assets/bg-dot.png';
import heroBgLocation from '../../assets/bg-location.png';
import heroBgLocationSmall from '../../assets/bg-location.png';

const HeroBgIcons = () => {
    return (
        <>
            <img className="hero-bg-icons__bgicon hero-bg-icons__bgicon--bg-arrow" src={heroBgArrow} alt="arrow icon" />
            <img className="hero-bg-icons__bgicon hero-bg-icons__bgicon--bg-dot" src={heroBgDot} alt="dot icon" />
            <img className="hero-bg-icons__bgicon hero-bg-icons__bgicon--bg-location" src={heroBgLocation} alt="location icon" />
            <img className="hero-bg-icons__bgicon hero-bg-icons__bgicon--bg-location-small" src={heroBgLocationSmall} alt="smaller location icon" />
        </>
    )
}

export default HeroBgIcons;