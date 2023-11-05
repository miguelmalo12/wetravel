import './SignUp.scss';
import Header from '../../components/Header/Header';
import { CopyrightFooter } from '../../components/Footer/Footer';
import { Link } from 'react-router-dom';
import { ButtonGoogle, ButtonPrimary, ButtonSecondary } from '../../components/Button/Button';
import { FormGroupInput, FormGroupSelect, FormGroupCheckbox, FormGroupRadioButton } from '../../components/AuthFormComponents/AuthFormComponents';
import QuestionnaireLogo from '../../assets/Questionnaire.png';
import { country_list } from '../../utilities';




const SignUp = () => {

    const travelerType = ['Adventurous', 'Relaxed', 'Cultural', 'Beach-lover', 'Nature-lover', 'Romantic',
        'Family-friendly', 'Luxury', 'Backpacker', 'Road tripper', 'Eco-tourist', 'Volunteer']

    const foodType = ['Street food', 'Local Cuisine', 'High-end cuisine', 'Fast Food']

    const importanceLevels = ['Very important', 'Somewhat important', 'Not very important', 'Not important at all']

    const activities = ['Hiking', 'Sightseeing', 'Shopping', 'Museums', 'Theme parks', 'Nightlife', 'Beach activities', 'Water sports', 'Adventure', 'Spa and relaxation', 'Nature', 'History']

    const climateType = ['Hot and sunny', 'Warm and humid', 'Mild and sunny', 'Cool and rainy', 'Snowy and cold', 'Not important']

    const hobbies = ['Wine tasting', 'History', 'Relaxation', 'Winter activities', 'Summer activities', 'Gastronomy', 'Music', 'Art', 'Photography', 'Wildlife', 'City Exploring', 'Partying', 'Architecture', 'Outdoor Activities', 'None']

    const cultureImmerse = ['Very important', 'Somewhat important', 'Not very important', 'Not important at all']


    return (
        <div className="sign-up-page">
            <Header />
            <div className="authentication-form-container">
                <p className="authentication-form-container__heading">Register for free and start planning</p>
                <ButtonGoogle />
                <p className="divider-or">or</p>
                <form action="" className="authentication-form">
                    <FormGroupInput label='What is your email?' type='text' name='email' />
                    <FormGroupInput label='Confirm your email' type='text' name='c-email' />
                    <FormGroupInput label='Create a password' type='password' name='password' />
                    <FormGroupInput label='How do you want us to call you?' type='' name='username' />

                    <section className="questionnaire">
                        <div className="questionnaire__header-container">
                            <img src={QuestionnaireLogo} alt="" className="questionnaire__logo" />
                            <div className="questionnaire__text-container">
                                <h4 className="questionnaire__heading">Questionnaire</h4>
                                <p className="questionnaire__text">
                                    We'll use your answers to create tailored recommendations that match your travel preferences.
                                    Find your perfect match with our personalized approach. Let's begin!
                                </p>
                            </div>
                        </div>
                        <div className="questionnaire__content">
                            <FormGroupSelect label='Which country are you are you currently residing in?' optionArray={country_list} defaultOption='Select Country' name='country' />
                            <FormGroupCheckbox type='checkbox' label='What type of traveler best describes you? Select all that apply' optionArray={travelerType} />
                            <FormGroupCheckbox type='checkbox' label='Which type of food do you prefer? Select all that apply' optionArray={foodType} />
                            <FormGroupCheckbox type='radio' label='How important is food and gastronomy to you when you travel?' optionArray={importanceLevels} name='importanceLevels' />
                            <FormGroupCheckbox type='checkbox' label='What activities do you enjoy when traveling? Select all that apply' optionArray={activities} />
                            <FormGroupCheckbox type='radio' label='What is your preferred climate when traveling?' optionArray={climateType} name='climateType' />
                            <FormGroupCheckbox type='checkbox' label='What are your specific travel interests or hobbies? Select all that apply' optionArray={hobbies} />
                            <FormGroupCheckbox type='radio' label='How important is it for you to immerse yourself in local culture when traveling?' optionArray={cultureImmerse} name='cultureImmerse' />
                        </div>

                        <div className="term-condition">
                            <input type="checkbox" className="term-condition__input" />
                            <p className="term-condition__text">I accept the <Link className='term-condition__link'>Terms and Conditions</Link></p>
                        </div>
                    </section>
                    <ButtonPrimary text='Sign In' className='authentication-form__button--primary' />
                </form>
                <p className="authentication-form-container__heading">Already have an account?</p>
                <ButtonSecondary text='Sign In' />
            </div>
            <CopyrightFooter />

        </div>
    )
}

export default SignUp;