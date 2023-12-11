import 'HeroFormInput.scss';
import { ButtonHeroFormSubmit } from '../Button/Button';

export const SingleHeroFormSelect = ({ icon, label, options, name }) => {
    return (
        <div className="hero-form-input__group-container">
            <img src={icon} alt="" className="hero-form-input__icon" />
            <div className="hero-form-input__group">
                <label htmlFor={name} className="hero-form-input__label">{label}</label>
                <select type="text" name={name} className="hero-form-input__input hero-form-input__input--select" >
                    {options.map((option) => {
                        return (
                            <option value={option} className="hero-form-input__input hero-form-input__input--option">{option}</option>
                        )
                    })}
                </select>
            </div>
        </div>
    )
}

export const SingleHeroFormSelectSubmit = ({ icon, label, options, name }) => {
    return (
        <div className="hero-form-input__group-container">
            <img src={icon} alt="" className="hero-form-input__icon" />
            <div className="hero-form-input__group">
                <label htmlFor={name} className="hero-form-input__label">{label}</label>
                <select type="text" name={name} className="hero-form-input__input hero-form-input__input--select" >
                    {options.map((option) => {
                        return (
                            <option value={option} className="hero-form-input__input hero-form-input__input--option">{option}</option>
                        )
                    })}
                </select>
            </div>
            <ButtonHeroFormSubmit className='hero-form-input__button' />
        </div>
    )
}


export const DoubleHeroFormSelect = ({ icon1, icon2, label1, label2, name1, name2, options1, options2 }) => {
    return (
        <div className="hero-form-input__wrapper hero-form-input__wrapper--simple">
            <div className="hero-form-input__group-container hero-form-input__group-container--double">
                <img src={icon1} alt="" className="hero-form-input__icon" />
                <div className="hero-form-input__group">
                    <label htmlFor={name1} className="hero-form-input__label">{label1}</label>
                    <select name={name1} type="text" className="hero-form-input__input hero-form-input__input--select" >
                        {options1.map((option) => {
                            return (
                                <option value={option} className="hero-form-input__input hero-form-input__input--option">{option}</option>
                            )
                        })}
                    </select>
                </div>
            </div>
            <div className="hero-form-input__group-container hero-form-input__group-container--double">
                <img src={icon2} alt="" className="hero-form-input__icon" />
                <div className="hero-form-input__group">
                    <label htmlFor={name2} className="hero-form-input__label">{label2}</label>
                    <select name={name2} type="text" className="hero-form-input__input hero-form-input__input--select" >
                        {options2.map((option) => {
                            return (
                                <option value={option} className="hero-form-input__input hero-form-input__input--option">{option}</option>
                            )
                        })}
                    </select>
                </div>
            </div>
        </div>
    )
}


export const DoubleHeroFormSelectSubmit = ({ icon1, icon2, label1, label2, name1, name2, options1, options2 }) => {
    return (
        <div className="hero-form-input__wrapper">
            <div className="hero-form-input__group-container hero-form-input__group-container--double">
                <img src={icon1} alt="" className="hero-form-input__icon" />
                <div className="hero-form-input__group">
                    <label htmlFor={name1} className="hero-form-input__label">{label1}</label>
                    <select name={name1} type="text" className="hero-form-input__input hero-form-input__input--select" >
                        {options1.map((option) => {
                            return (
                                <option value={option} className="hero-form-input__input hero-form-input__input--option">{option}</option>
                            )
                        })}
                    </select>
                </div>
            </div>
            <div className="hero-form-input__group-container hero-form-input__group-container--double hero-form-input__group-container--submit">
                <img src={icon2} alt="" className="hero-form-input__icon" />
                <div className="hero-form-input__group">
                    <label htmlFor={name1} className="hero-form-input__label">{label2}</label>
                    <select name={name2} type="text" className="hero-form-input__input hero-form-input__input--select" >
                        {options2.map((option) => {
                            return (
                                <option value={option} className="hero-form-input__input hero-form-input__input--option">{option}</option>
                            )
                        })}
                    </select>
                </div>
                <ButtonHeroFormSubmit className='hero-form-input__button' />
            </div>
        </div>
    )
}
