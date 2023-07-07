import './SignUp.scss';
import HeaderSecondary from '../../components/HeaderSecondary/HeaderSecondary';
import google_logo from '../../assets/icons/google-icon.svg'
import questionnaire_image from '../../assets/Questionnaire.png';
import Checkbox from '../../components/Checkbox/Checkbox';
import { Link } from 'react-router-dom';

const SignUp = () =>{

    const country_list = ["Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua and Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia and Herzegovina","Botswana","Brazil","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Cape Verde","Cayman Islands","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica","Cote D Ivoire","Croatia","Cruise Ship","Cuba","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kuwait","Kyrgyz Republic","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Mauritania","Mauritius","Mexico","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Namibia","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","Norway","Oman","Pakistan","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre and Miquelon","Samoa","San Marino","Satellite","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","South Africa","South Korea","Spain","Sri Lanka","St Kitts and Nevis","St Lucia","St Vincent","St. Lucia","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad and Tobago","Tunisia","Turkey","Turkmenistan","Turks and Caicos","Uganda","Ukraine","United Arab Emirates","United Kingdom","Uruguay","Uzbekistan","Venezuela","Vietnam","Virgin Islands (US)","Yemen","Zambia","Zimbabwe"];


    const travelerType = ['Adventurous', 'Relaxed' ,'Cultural', 'Beach-lover', 'Nature-lover', 'Romantic',
    'Family-friendly', 'Luxury', 'Backpacker', 'Road tripper' , 'Eco-tourist', 'Volunteer']

    const foodType = ['Street food', 'Local Cuisine', 'High-end cuisine','Fast Food']

    const importanceLevels = ['Very important', 'Somewhat important', 'Not very important', 'Not important at all']

    const activities = ['Hiking', 'Sightseeing', 'Shopping', 'Museums', 'Theme parks', 'Nightlife', 'Beach activities', 'Water sports', 'Adventure', 'Spa and relaxation', 'Nature', 'History']

    const climateType = ['Hot and sunny' , 'Warm and humid', 'Mild and sunny', 'Cool and rainy', 'Snowy and cold', 'Not important']

    const hobbies = ['Wine tasting', 'History', 'Relaxation', 'Winter activities', 'Summer activities', 'Gastronomy', 'Music', 'Art', 'Photography', 'Wildlife', 'City Exploring', 'Partying','Architecture', 'Outdoor Activities', 'None']

    const cultureImmerse = ['Very important', 'Somewhat important', 'Not very important', 'Not important at all']

    return (
        <div>
           <HeaderSecondary/>

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
                            {country_list.map(country=>{
                                return(
                                    <option value={country} >{country}</option>
                                )
                            })}
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

                    <div className="form__group">
                        <label htmlFor="password" className="form__label">Which type of food do you prefer? Select all that apply</label>
                            
                        <div className="form__input-container grid-2">
                            {
                            foodType.map(food=>{
                                return(
                                    <Checkbox text={food}/>
                                )
                            })
                            }
                            
                        </div>
                    </div>

                    <div className="form__group">
                        <label htmlFor="password" className="form__label">How important is food and gastronomy to you when you travel?</label>
                            
                        <div className="form__input-container grid-2">
                            {
                            importanceLevels.map(level=>{
                                return(
                                    <Checkbox text={level}/>
                                )
                            })
                            }
                            
                        </div>
                    </div>

                    <div className="form__group">
                        <label htmlFor="password" className="form__label">What activities do you enjoy when traveling? Select all that apply</label>
                            
                        <div className="form__input-container">
                            {
                            activities.map(activity=>{
                                return(
                                    <Checkbox text={activity}/>
                                )
                            })
                            }
                            
                        </div>
                    </div>

                    <div className="form__group">
                        <label htmlFor="password" className="form__label">What is your preferred climate when traveling?</label>
                            
                        <div className="form__input-container">
                            {
                            climateType.map(climate=>{
                                return(
                                    <Checkbox text={climate}/>
                                )
                            })
                            }
                            
                        </div>
                    </div>

                    <div className="form__group">
                        <label htmlFor="password" className="form__label">What are your specific travel interests or hobbies? Select all that apply</label>
                            
                        <div className="form__input-container">
                            {
                            hobbies.map(hobby=>{
                                return(
                                    <Checkbox text={hobby}/>
                                )
                            })
                            }
                            
                        </div>
                    </div>   

                    <div className="form__group">
                        <label htmlFor="password" className="form__label">How important is it for you to immerse yourself in local culture when traveling?</label>
                            
                        <div className="form__input-container grid-2">
                            {
                            cultureImmerse.map(level=>{
                                return(
                                    <Checkbox text={level}/>
                                )
                            })
                            }
                            
                        </div>
                    </div>

                    <div className="term">
                        <input type='checkbox' name='terms' className='term__input'/>
                        <label htmlFor="terms" className='term__label'>I accept the <span className='term__highlight'>Terms and Conditions</span></label>
                    </div>  

                    <button className="btn form__submit">Sign Up</button>
                    <h1 className="signup__heading signup__heading--sign-in">Already have an account</h1>
                <Link className="btn btn--sign-in" to='/login'>Sign In</Link>
                </form>
            </main>
            
        </div>
    )
}

export default SignUp;