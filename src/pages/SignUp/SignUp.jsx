import './SignUp.scss';
import { CopyrightFooter } from '../../components/Footer/Footer';
import { Link } from 'react-router-dom';
import { ButtonGoogle, ButtonPrimary, ButtonSecondary } from '../../components/Button/Button';
import { FormGroupInput, FormGroupSelect, FormGroupCheckbox } from '../../components/AuthFormComponents/AuthFormComponents';
import QuestionnaireLogo from '../../assets/Questionnaire.png';
import { country_list } from '../../utilities';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';




const SignUp = ({ API_URL }) => {
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('Invalid email address. Please enter a valid email.')
    const emailRef = useRef(null);
    const confirmEmailRef = useRef(null);

    const [signUpCredentials, setSignUpCredentials] = useState({
        user_name: '',
        email: '',
        password: ''
    })


    const handleEmailValidation = (event) => {
        const { name, value } = event.target;

        if ((name === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) ||
            (name === 'c-email' && value !== signUpCredentials.email)) {
            setError(true);

            if (name === 'c-email' && value !== signUpCredentials.email) {
                setErrorMessage('Email addresses do not match.');
            } else {
                setErrorMessage('Invalid email address. Please enter a valid email.');
            }
        } else {
            setError(false);
            setErrorMessage('');
        }
    };



    const handleInputChange = (event) => {
        setSignUpCredentials({
            ...signUpCredentials, [event.target.name]: event.target.value
        });
    }

    const handleFormSubmit = (event) => {
        event.preventDefault();

        axios.post(`${API_URL}/user/sign-up`, {
            user_name: signUpCredentials.user_name,
            email: signUpCredentials.email,
            password: signUpCredentials.password
        })
    }


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
            <div className="authentication-form-container">
                <p className="authentication-form-container__heading">Register for free and start planning</p>
                <ButtonGoogle />
                <p className="divider-or">or</p>
                <form onSubmit={handleFormSubmit} className="authentication-form">
                    <FormGroupInput label='What is your email?' type='email' onChange={handleInputChange} name='email' customRef={emailRef} handleEmailValidation={handleEmailValidation} />
                    <FormGroupInput label='Confirm your email' type='email' onChange={handleInputChange} name='c-email' customRef={confirmEmailRef} handleEmailValidation={handleEmailValidation} />
                    {(error) ? (<p className='error-message'>{errorMessage}</p>) : (<></>)}
                    <FormGroupInput label='Create a password' type='password' onChange={handleInputChange} name='password' />
                    <FormGroupInput label='How do you want us to call you?' onChange={handleInputChange} type='text' name='user_name' />

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
                    <ButtonPrimary text='Sign Up' className='authentication-form__button--primary' type='submit' onClick={handleFormSubmit} />
                </form>
                <p className="authentication-form-container__heading">Already have an account?</p>
                <ButtonSecondary text='Sign In' />
            </div>
            <CopyrightFooter />

        </div>
    )
}

export default SignUp;