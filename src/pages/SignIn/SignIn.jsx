import './SignIn.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

// recoil state
import { useSetRecoilState } from 'recoil';
import { userState } from '../../state/userState';

//components
import { CopyrightFooter } from '../../components/Footer/Footer';
import { ButtonPrimary, ButtonSecondary, ButtonGoogle } from '../../components/Button/Button';
import { FormGroupInput } from '../../components/AuthFormComponents/AuthFormComponents';
import { useRecoilState } from 'recoil';
import { loginState } from '../../state/loginState';
import Modal from '../../components/Modal/Modal';


const SignIn = ({ API_URL }) => {
    const [isLoggedIn, setLoggedIn] = useRecoilState(loginState)
    const setUser = useSetRecoilState(userState);
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const [signInCredentials, setSignInCredentials] = useState({
        email: '',
        password: ''
    });

    const navigate = useNavigate();

    const handleInputChange = (event) => {
        setSignInCredentials({
            ...signInCredentials, [event.target.name]: event.target.value
        })
    }
    const handleFormSubmit = (event) => {
        event.preventDefault();
        axios
            .post(`${API_URL}/auth/login`, {
                email: signInCredentials.email,
                password: signInCredentials.password,
            })
            .then((response) => {
                const { user } = response.data;
                localStorage.setItem("userData", JSON.stringify(user));
                setUser(user);
                setLoggedIn(true);
                navigate('/')
            })
            .catch(() => {
                setError(true)
                setErrorMessage('Email or password is invalid. Please try again.')
            });
    };

    return (

        <div className="login-page">
            {!isLoggedIn ? (
                <div className="authentication-form-container">
                    <p className="authentication-form-container__heading">To continue, sign in to WeTravel</p>
                    {/* <ButtonGoogle /> */}
                    <p className="divider-or">or</p>
                    {(error) ? (
                        <p className="error-message">{errorMessage}</p>
                    ) : <></>}

                    <form onSubmit={handleFormSubmit} className="authentication-form">
                        <FormGroupInput onChange={handleInputChange} label='Email' type='email' name='email' />
                        <FormGroupInput onChange={handleInputChange} label='Password' type='password' name='password' />

                        <div className="authentication-form__wrapper">
                            <Link className="authentication-form__link">Forget you password?</Link>
                            <div className="authentication-form__group--checkbox">
                                <label htmlFor="remember_me" className="authentication-form__label--checkbox">Remember Me</label>
                                <input name='remember_me' id='remember_me' type="checkbox" className="authentication-form__input--checkbox" />
                            </div>
                        </div>
                        <ButtonPrimary text='Sign In' className='authentication-form__button--primary' type='submit' />


                    </form>
                    <p className="authentication-form-container__heading">Don’t have an account?</p>
                    <ButtonSecondary to='/sign-up' text='Sign Up' />
                </div>
            ) : (
                <div className="empty-page">
                    <Modal
                        textContent='You have already Logged In'
                        buttonText='Home'
                        onButtonClick={(e) => {
                            e.preventDefault();
                            navigate('/')
                        }}
                        onCloseClick={(e) => {
                            e.preventDefault();
                            navigate('/')
                        }}
                    />
                </div>
            )}
            <CopyrightFooter />

        </div>
    )
}

export default SignIn;