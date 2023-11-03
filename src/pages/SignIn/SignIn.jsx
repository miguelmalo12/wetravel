import './SignIn.scss';
import google_logo from '../../assets/icons/google-icon.svg'
import { Link } from 'react-router-dom';
import FormInput from '../../components/FormInputText/FormInput';
import { CopyrightFooter } from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import { ButtonPrimary, ButtonSecondary } from '../../components/Button/Button';

const SignIn = () => {

    return (

        <div className="login-page">
            <Header />
            {/* <div className="login-container"> */}
            {/* <div className='login'>
                    <h1 className="login__heading">To continue, sign in to WeTravel</h1>
                    <button className="btn btn--google">
                        <img className='btn__logo' src={google_logo} alt="" />
                        <p className="btn__text">Sign In with Google</p>
                    </button>

                    <p className="login__or">or</p>
                    <form action="" className="form">
                        <FormInput name='username' text='Email' placeholder='Enter email or username' type='text' />
                        <FormInput name='password' text='Password' placeholder='Enter password' type='password' />

                        <div className="form__group">
                            <a href='#' className="form__forget-password">Forget your password?</a>
                        </div>
                        <div className="form__wrapper">
                            <div className="form__group form__group--checkbox">
                                <input type="checkbox" name="remember" id="remember" className='form__input form__input--checkbox' />
                                <label htmlFor="remember" className='form__label form__label--checkbox'>Remember me</label>
                            </div>
                            <ButtonPrimary text='Sign In' />
                        </div>
                    </form>
                    <h1 className="login__heading login__heading--sign-up">Don't have an account?</h1>
                    <Link className="btn btn--sign-up" to='/signup'>Sign Up</Link>
                </div> */}

            {/* </div> */}

            <div className="authentication-form-container">
                <p className="authentication-form-container__heading">To continue, sign in to WeTravel</p>
                <Link className="button button--google">
                    <img className='button__icon' src={google_logo} alt="" />
                    Sign In with Google
                </Link>
                <p className="divider-or">or</p>
                <form action="" className="authentication-form">
                    <div className="authentication-form__group">
                        <label htmlFor="" className="authentication-form__label">Email</label>
                        <input type="text" className="authentication-form__input" />
                    </div>
                    <div className="authentication-form__group">
                        <label htmlFor="" className="authentication-form__label">Password</label>
                        <input type="text" className="authentication-form__input" />
                    </div>

                    <div className="authentication-form__wrapper">
                        <Link className="authentication-form__link">Forget you password?</Link>
                        <div className="authentication-form__group--checkbox">
                            <label htmlFor="" className="authentication-form__label--checkbox">Remember Me</label>
                            <input type="checkbox" className="authentication-form__input--checkbox" />
                        </div>
                    </div>
                    <ButtonPrimary text='Sign In' className='authentication-form__button--primary' />


                </form>
                <p className="authentication-form-container__heading">Don’t have an account?</p>
                <ButtonSecondary text='Sign Up' />
            </div>

            <CopyrightFooter />

        </div>

        // <div>
        //     <Header />

        //     <CopyrightFooter />
        // </div>
    )
}

export default SignIn;