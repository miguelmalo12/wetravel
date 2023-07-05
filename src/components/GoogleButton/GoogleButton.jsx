import google_logo from '../../assets/icons/google-icon.svg'
import './GoogleButton.scss';
const GoogleButton = () =>{
    <div>
        {console.log('hellp')}
    <button className="btn btn--google">
        <img className='btn__logo' src={google_logo} alt="" />
        <p className="btn__text">Sign In with Google</p>
    </button>
    </div>
}

export default GoogleButton;