import './SignUp.scss';
import logo from '../../assets/wetravel-logo-red.png';
import google_logo from '../../assets/icons/google-icon.svg'
import questionnaire_image from '../../assets/Questionnaire.png';
import Checkbox from '../../components/Checkbox/Checkbox';

const SignUp = () =>{
    const travelerType = ['Adventurous', 'Relaxed' ,'Cultural', 'Beach-lover', 'Nature-lover', 'Romantic',
                                'Family-friendly', 'Luxury', 'Backpacker', 'Road tripper' , 'Eco-tourist', 'Volunteer'
                        ]

    return (
        <div>
            <header className="header-simple">
                <img src={logo} alt="" className='header-simple__logo'/>
            </header>

            <main className='signup'>
                <h1 className="signup__heading">Register for free and start planning</h1>
                <button className="btn btn--google">
                    <img className='btn__logo' src={google_logo} alt="" />
                    <p className="btn__text">Sign In with Google</p>
                </button>

                <p className="signup__or">or</p>
                <form action="" className="form">
                    <div className="form__group">
                        <label htmlFor="username" className="form__label">Email</label>
                        <input type="text" className="form__input" placeholder='Enter email' name='username'/>
                    </div>
                    <div className="form__group">
                        <label htmlFor="c-username" className="form__label">Confirm your email</label>
                        <input type="text" className="form__input" placeholder='Enter email again' name='c-username'/>
                    </div>
                    <div className="form__group">
                        <label htmlFor="password" className="form__label">Create a password</label>
                        <input type="password" className="form__input" placeholder='Enter password' name='password'/>
                    </div>
                    <div className="form__group margin-bottom">
                        <label htmlFor="profile-name" className="form__label">How do you want us to call you?</label>
                        <input type="text" className="form__input" placeholder='Enter profile name' name='profile-name'/>
                    </div>
                    
                

                <div className="questionnaire">
                    <article className="questionnaire__info-container">
                        <img src={questionnaire_image} alt="" className="questionnaire__img" />
                        <p className="questionnaire__info">We'll use your answers to create tailored recommendations that match your travel preferences. Find your perfect match with our personalized approach. Let's begin!</p>
                    </article>
                </div>

                    <div className="form__group">
                        <label htmlFor="profile-name" className="form__label">Which country are you are you currently residing in?</label>
                        <select className="form__input" placeholder='Enter profile name' name='profile-name'>
                            <option value="" disabled selected>Select Country</option>
                            <option value="Canada">Canada</option>
                        </select>
                    </div>

                    <div className="form__group">
                        <label htmlFor="password" className="form__label">What type of traveler best describes you? Select all that apply</label>
                        <div className="form__input-container">
                            {
                            travelerType.map(traveler=>{
                                return(
                                    <Checkbox text={traveler}/>
                                )
                            })
                            }
                            
                        </div>
                    </div>    

                </form>
            </main>
            
        </div>
    )
}

export default SignUp;