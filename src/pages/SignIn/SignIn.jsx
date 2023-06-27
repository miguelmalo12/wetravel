import './SignIn.scss';
import logo from '../../assets/wetravel-logo-red.png';
import google_logo from '../../assets/icons/google-icon.svg'

const SignIn = () =>{

    return (
        <div>
            <header className="header-simple">
                <img src={logo} alt="" className='header-simple__logo'/>
            </header>

            <main className='login'>
                <h1 className="login__heading">To continue, sign in to WeTravel</h1>
                <button className="btn btn--google">
                    <img className='btn__logo' src={google_logo} alt="" />
                    <p className="btn__text">Sign In with Google</p>
                </button>

                <p className="login__or">or</p>
                <form action="" className="form">
                    <div className="form__group">
                        <label htmlFor="username" className="form__label">Email</label>
                        <input type="text" className="form__input" placeholder='Enter email or username' name='username'/>
                    </div>
                    <div className="form__group">
                        <label htmlFor="password" className="form__label">Password</label>
                        <input type="password" className="form__input" placeholder='Enter password' name='password'/>
                    </div>
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
                <button className="btn btn--sign-up">Sign Up</button>
            </main>
            
        </div>
    )
}

export default SignIn;