import './SignIn.scss';
import { Link } from 'react-router-dom';
import { CopyrightFooter } from '../../components/Footer/Footer';
import { ButtonPrimary, ButtonSecondary, ButtonGoogle } from '../../components/Button/Button';
import { FormGroupInput } from '../../components/AuthFormComponents/AuthFormComponents';
import { useState } from 'react';
import axios from 'axios';

const SignIn = ({ API_URL, isLoggedIn, setLoggedIn, setProfileData }) => {
    const [signInCredentials, setSignInCredentials] = useState({
        email: '',
        password: ''
    });

    const handleInputChange = (event) => {
        setSignInCredentials({
            ...signInCredentials, [event.target.name]: event.target.value
        })
    }
    const handleFormSubmit = (event) => {
        event.preventDefault();
        axios.post(`${API_URL}/auth/login`, {
            email: signInCredentials.email,
            password: signInCredentials.password
        }).then(() => {
            axios({
                method: 'get',
                url: `${API_URL}/auth/user`
            }).then(response => {
                console.log(response)
            }).catch(err => {
                console.log(err)
            })
        })
        event.target.reset();

    }

    return (

        <div className="login-page">

            <div className="authentication-form-container">
                <p className="authentication-form-container__heading">To continue, sign in to WeTravel</p>
                <ButtonGoogle />
                <p className="divider-or">or</p>
                <form onSubmit={handleFormSubmit} className="authentication-form">
                    <FormGroupInput onChange={handleInputChange} label='Email' type='email' name='email' />
                    <FormGroupInput onChange={handleInputChange} label='Password' type='password' name='password' />

                    <div className="authentication-form__wrapper">
                        <Link className="authentication-form__link">Forget you password?</Link>
                        <div className="authentication-form__group--checkbox">
                            <label htmlFor="" className="authentication-form__label--checkbox">Remember Me</label>
                            <input type="checkbox" className="authentication-form__input--checkbox" />
                        </div>
                    </div>
                    <ButtonPrimary text='Sign In' className='authentication-form__button--primary' type='submit' />


                </form>
                <p className="authentication-form-container__heading">Don’t have an account?</p>
                <ButtonSecondary text='Sign Up' />
            </div>

            <CopyrightFooter />

        </div>
    )
}

export default SignIn;