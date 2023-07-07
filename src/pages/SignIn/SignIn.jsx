import './SignIn.scss';
import google_logo from '../../assets/icons/google-icon.svg'
import { Link } from 'react-router-dom';
import HeaderSecondary from '../../components/HeaderSecondary/HeaderSecondary';
import FormInput from '../../components/FormInputText/FormInput';


const SignIn = () =>{

    return (
        <div>
            <HeaderSecondary />
            <main className='login'>
                <h1 className="login__heading">To continue, sign in to WeTravel</h1>
                <button className="btn btn--google">
                    <img className='btn__logo' src={google_logo} alt="" />
                    <p className="btn__text">Sign In with Google</p>
                </button>

                <p className="login__or">or</p>
                <form action="" className="form">
                    <FormInput name='username' text='Email' placeholder='Enter email or username' type='text'/>
                    <FormInput name='password' text='Password' placeholder='Enter password' type='password'/>
                    
                    <div className="form__group">
                        <a href='#' className="form__forget-password">Forget your password?</a>
                    </div>
                    <div className="form__wrapper">
                    <div className="form__group form__group--checkbox">
                        <input type="checkbox" name="remember" id="remember" className='form__input form__input--checkbox' />
                        <label htmlFor="remember" className='form__label form__label--checkbox'>Remember me</label>
                    </div>
                    <button className="form__submit">Sign In</button>
                    </div>
                </form>
                <h1 className="login__heading login__heading--sign-up">Don't have an account?</h1>
                <Link className="btn btn--sign-up" to='/signup'>Sign Up</Link>
            </main>
            
        </div>
    )
}

export default SignIn;