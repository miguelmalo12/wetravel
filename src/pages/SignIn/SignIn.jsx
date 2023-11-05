import './SignIn.scss';
import { Link } from 'react-router-dom';
import { CopyrightFooter } from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import { ButtonPrimary, ButtonSecondary, ButtonGoogle } from '../../components/Button/Button';
import { FormGroupInput } from '../../components/AuthFormComponents/AuthFormComponents';

const SignIn = () => {

    return (

        <div className="login-page">
            <Header />

            <div className="authentication-form-container">
                <p className="authentication-form-container__heading">To continue, sign in to WeTravel</p>
                <ButtonGoogle />
                <p className="divider-or">or</p>
                <form action="" className="authentication-form">
                    <FormGroupInput label='Email' type='text' name='email' />
                    <FormGroupInput label='Password' type='password' name='password' />

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